const { addressModel } = require("../../models/addressModel");

// Get all addresses for a user
const getUserAddresses = async (req, res) => {
    try {
        const userId = String(req.body.userId || req.body.id || '');
        if (!userId || userId === 'undefined' || userId === 'null') {
            return res.status(400).json({ 
                success: false, 
                message: "userId is required" 
            });
        }

        const addresses = await addressModel.find({ userId })
            .sort({ isDefault: -1, createdAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            addresses: addresses,
            message: "Addresses fetched successfully"
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching addresses", 
            error: err.message 
        });
    }
};

// Get default address by type
const getDefaultAddress = async (req, res) => {
    try {
        const userId = String(req.body.userId || req.body.id || '');
        if (!userId || userId === 'undefined' || userId === 'null') {
            return res.status(400).json({ 
                success: false, 
                message: "userId is required" 
            });
        }

        const addressType = req.params.type || req.body.addressType || 'billing';
        
        if (!['billing', 'shipping'].includes(addressType)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid address type. Must be 'billing' or 'shipping'" 
            });
        }

        const address = await addressModel.findOne({ 
            userId, 
            addressType,
            isDefault: true 
        }).select('-__v');

        res.status(200).json({
            success: true,
            address: address,
            message: address ? "Default address fetched successfully" : "No default address found"
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching default address", 
            error: err.message 
        });
    }
};

// Create a new address
const createAddress = async (req, res) => {
    try {
        const userId = String(req.body.userId || req.body.id || '');
        if (!userId || userId === 'undefined' || userId === 'null') {
            return res.status(400).json({ 
                success: false, 
                message: "userId is required" 
            });
        }

        const { 
            addressType, 
            name, 
            email, 
            mobile, 
            address, 
            country, 
            state, 
            city,
            isDefault 
        } = req.body;

        // Validate required fields
        if (!addressType || !name || !email || !mobile || !address || !country || !state || !city) {
            return res.status(400).json({ 
                success: false, 
                message: "All address fields are required" 
            });
        }

        if (!['billing', 'shipping'].includes(addressType)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid address type. Must be 'billing' or 'shipping'" 
            });
        }

        // If setting as default, unset other defaults of the same type
        if (isDefault === true) {
            await addressModel.updateMany(
                { userId, addressType, isDefault: true },
                { $set: { isDefault: false } }
            );
        }

        const newAddress = new addressModel({
            userId,
            addressType,
            name: String(name),
            email: String(email).toLowerCase(),
            mobile: String(mobile),
            address: String(address),
            country: String(country),
            state: String(state),
            city: String(city),
            isDefault: isDefault === true
        });

        await newAddress.save();

        res.status(201).json({
            success: true,
            message: "Address created successfully",
            address: newAddress
        });
    } catch (err) {
        // Handle unique index violation (multiple defaults)
        if (err.code === 11000) {
            return res.status(400).json({ 
                success: false, 
                message: "Only one default address allowed per type" 
            });
        }
        res.status(500).json({ 
            success: false, 
            message: "Error creating address", 
            error: err.message 
        });
    }
};

// Update an address
const updateAddress = async (req, res) => {
    try {
        const userId = String(req.body.userId || req.body.id || '');
        if (!userId || userId === 'undefined' || userId === 'null') {
            return res.status(400).json({ 
                success: false, 
                message: "userId is required" 
            });
        }

        const addressId = req.params.addressId || req.body.addressId;
        if (!addressId) {
            return res.status(400).json({ 
                success: false, 
                message: "addressId is required" 
            });
        }

        const { 
            name, 
            email, 
            mobile, 
            address, 
            country, 
            state, 
            city,
            isDefault 
        } = req.body;

        // Check if address exists and belongs to user
        const existingAddress = await addressModel.findOne({ 
            _id: addressId, 
            userId 
        });

        if (!existingAddress) {
            return res.status(404).json({ 
                success: false, 
                message: "Address not found" 
            });
        }

        // If setting as default, unset other defaults of the same type
        if (isDefault === true && !existingAddress.isDefault) {
            await addressModel.updateMany(
                { userId, addressType: existingAddress.addressType, isDefault: true },
                { $set: { isDefault: false } }
            );
        }

        // Update address
        const updateData = {};
        if (name !== undefined) updateData.name = String(name);
        if (email !== undefined) updateData.email = String(email).toLowerCase();
        if (mobile !== undefined) updateData.mobile = String(mobile);
        if (address !== undefined) updateData.address = String(address);
        if (country !== undefined) updateData.country = String(country);
        if (state !== undefined) updateData.state = String(state);
        if (city !== undefined) updateData.city = String(city);
        if (isDefault !== undefined) updateData.isDefault = isDefault === true;

        const updatedAddress = await addressModel.findByIdAndUpdate(
            addressId,
            { $set: updateData },
            { new: true }
        ).select('-__v');

        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            address: updatedAddress
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ 
                success: false, 
                message: "Only one default address allowed per type" 
            });
        }
        res.status(500).json({ 
            success: false, 
            message: "Error updating address", 
            error: err.message 
        });
    }
};

// Delete an address
const deleteAddress = async (req, res) => {
    try {
        const userId = String(req.body.userId || req.body.id || '');
        if (!userId || userId === 'undefined' || userId === 'null') {
            return res.status(400).json({ 
                success: false, 
                message: "userId is required" 
            });
        }

        const addressId = req.params.addressId || req.body.addressId;
        if (!addressId) {
            return res.status(400).json({ 
                success: false, 
                message: "addressId is required" 
            });
        }

        const address = await addressModel.findOneAndDelete({ 
            _id: addressId, 
            userId 
        });

        if (!address) {
            return res.status(404).json({ 
                success: false, 
                message: "Address not found" 
            });
        }

        res.status(200).json({
            success: true,
            message: "Address deleted successfully"
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error deleting address", 
            error: err.message 
        });
    }
};

// Set address as default
const setDefaultAddress = async (req, res) => {
    try {
        const userId = String(req.body.userId || req.body.id || '');
        if (!userId || userId === 'undefined' || userId === 'null') {
            return res.status(400).json({ 
                success: false, 
                message: "userId is required" 
            });
        }

        const addressId = req.params.addressId || req.body.addressId;
        if (!addressId) {
            return res.status(400).json({ 
                success: false, 
                message: "addressId is required" 
            });
        }

        // Get the address to find its type
        const address = await addressModel.findOne({ 
            _id: addressId, 
            userId 
        });

        if (!address) {
            return res.status(404).json({ 
                success: false, 
                message: "Address not found" 
            });
        }

        // Unset other defaults of the same type
        await addressModel.updateMany(
            { userId, addressType: address.addressType, isDefault: true },
            { $set: { isDefault: false } }
        );

        // Set this address as default
        const updatedAddress = await addressModel.findByIdAndUpdate(
            addressId,
            { $set: { isDefault: true } },
            { new: true }
        ).select('-__v');

        res.status(200).json({
            success: true,
            message: "Default address updated successfully",
            address: updatedAddress
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error setting default address", 
            error: err.message 
        });
    }
};

module.exports = {
    getUserAddresses,
    getDefaultAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
};

