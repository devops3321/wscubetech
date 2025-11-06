"use client";
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ProductFilter({ 
  initialCategories = [], 
  initialMaterials = [], 
  initialColors = [],
  initialFilters = {}
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [categories, setCategories] = useState(initialCategories);
  const [materials, setMaterials] = useState(initialMaterials);
  const [colors, setColors] = useState(initialColors);
  
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialFilters.subcategory || '');
  const [selectedSubsubcategory, setSelectedSubsubcategory] = useState(initialFilters.subsubcategory || '');
  const [selectedMaterials, setSelectedMaterials] = useState(initialFilters.material || []);
  const [selectedColors, setSelectedColors] = useState(initialFilters.color || []);
  const [priceRange, setPriceRange] = useState({
    min: initialFilters.minPrice || '0',
    max: initialFilters.maxPrice || '200000'
  });

  // Sync state with URL changes (e.g., browser back/forward)
  useEffect(() => {
    const category = searchParams.get('category') || '';
    const subcategory = searchParams.get('subcategory') || '';
    const subsubcategory = searchParams.get('subsubcategory') || '';
    const materials = searchParams.getAll('material').filter(id => id);
    const colors = searchParams.getAll('color').filter(id => id);
    const minPrice = searchParams.get('minPrice') || '0';
    const maxPrice = searchParams.get('maxPrice') || '200000';

    // Update state from URL - React will batch these updates
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setSelectedSubsubcategory(subsubcategory);
    setSelectedMaterials(materials);
    setSelectedColors(colors);
    setPriceRange({ min: minPrice, max: maxPrice });
  }, [searchParams]);

  const updateURL = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Reset page when filters change
    params.set('page', '1');
    
    // Clear dependent filters when parent changes
    if (updates.category !== undefined) {
      params.delete('subcategory');
      params.delete('subsubcategory');
    }
    if (updates.subcategory !== undefined) {
      params.delete('subsubcategory');
    }
    
    // Update filters
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.delete(key);
        value.forEach(v => params.append(key, v));
      } else {
        params.set(key, value);
      }
    });

    router.push(`/online-store?${params.toString()}`);
  };

  const handleCategoryChange = (categoryId) => {
    const categoryIdStr = String(categoryId);
    // Read current category from URL to avoid stale state
    const currentCategory = searchParams.get('category') || '';
    const newCategory = currentCategory === categoryIdStr ? '' : categoryIdStr;
    updateURL({ category: newCategory });
  };

  const handleSubcategoryChange = (subcategoryId) => {
    const subcategoryIdStr = String(subcategoryId);
    // Read current subcategory from URL to avoid stale state
    const currentSubcategory = searchParams.get('subcategory') || '';
    const newSubcategory = currentSubcategory === subcategoryIdStr ? '' : subcategoryIdStr;
    // Clear parent category when selecting subcategory (hierarchical: only one level at a time)
    const updates = { subcategory: newSubcategory };
    const currentCategory = searchParams.get('category') || '';
    if (newSubcategory && currentCategory) {
      updates.category = '';
    }
    updateURL(updates);
  };

  const handleSubsubcategoryChange = (subsubcategoryId) => {
    const subsubcategoryIdStr = String(subsubcategoryId);
    // Read current subsubcategory from URL to avoid stale state
    const currentSubsubcategory = searchParams.get('subsubcategory') || '';
    const newSubsubcategory = currentSubsubcategory === subsubcategoryIdStr ? '' : subsubcategoryIdStr;
    // Clear parent category and subcategory when selecting subsubcategory (hierarchical: only one level at a time)
    const updates = { subsubcategory: newSubsubcategory };
    if (newSubsubcategory) {
      const currentCategory = searchParams.get('category') || '';
      const currentSubcategory = searchParams.get('subcategory') || '';
      if (currentCategory) updates.category = '';
      if (currentSubcategory) updates.subcategory = '';
    }
    updateURL(updates);
  };

  const handleMaterialChange = (materialId) => {
    const materialIdStr = String(materialId);
    // Read current materials from URL to avoid stale state
    const currentMaterials = searchParams.getAll('material').filter(id => id);
    const newMaterials = currentMaterials.includes(materialIdStr)
      ? currentMaterials.filter(id => String(id) !== materialIdStr)
      : [...currentMaterials, materialIdStr];
    updateURL({ material: newMaterials });
  };

  const handleColorChange = (colorId) => {
    const colorIdStr = String(colorId);
    // Read current colors from URL to avoid stale state
    const currentColors = searchParams.getAll('color').filter(id => id);
    const newColors = currentColors.includes(colorIdStr)
      ? currentColors.filter(id => String(id) !== colorIdStr)
      : [...currentColors, colorIdStr];
    updateURL({ color: newColors });
  };

  const handlePriceFilter = () => {
    updateURL({
      minPrice: priceRange.min,
      maxPrice: priceRange.max
    });
  };

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    setPriceRange(prev => ({ ...prev, max: value }));
  };

  const handleClearAllFilters = () => {
    const params = new URLSearchParams();
    params.set('page', '1');
    router.push(`/online-store?${params.toString()}`);
  };

  // Check if any filters are active
  const hasActiveFilters = 
    searchParams.get('category') || 
    searchParams.get('subcategory') || 
    searchParams.get('subsubcategory') || 
    searchParams.getAll('material').length > 0 || 
    searchParams.getAll('color').length > 0 || 
    searchParams.get('minPrice') || 
    searchParams.get('maxPrice') || 
    searchParams.get('search');

  return (
    <aside className="bg-white rounded-lg p-4 md:p-6 border w-full md:w-auto">
      {/* Clear All Filters Button */}
      {hasActiveFilters && (
        <div className="mb-4 pb-4 border-b-2 border-gray-200 animate-fade-in-slide-down">
          <button
            onClick={handleClearAllFilters}
            className="w-full bg-[#C09578] hover:bg-[#A07A5A] text-white font-bold px-4 py-2 rounded transition-colors duration-300 cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}
      
      <div className='overflow-y-auto max-h-96 mb-4 pb-4 border-b-2 border-gray-200'>
        <h2 className="font-bold font-playfair text-lg mb-3 text-black">Categories</h2>
        
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories available</p>
        ) : (
          categories.map(cat => (
            <div key={cat._id} className="mb-6">
              {/* Category Level */}
              <label className="flex items-center cursor-pointer mb-2">
                <input 
                  type="checkbox" 
                  className="accent-blue-600 mr-2" 
                  checked={String(selectedCategory) === String(cat._id)}
                  onChange={() => handleCategoryChange(cat._id)}
                />
                <span className="text-gray-700">{cat.categoryName || cat.name}</span>
              </label>
              
              {/* Subcategories - Always visible if they exist */}
              {cat.subcategories && cat.subcategories.length > 0 && (
                <ul className="ml-6 mt-2 mb-2 space-y-2">
                  {cat.subcategories.map(subcat => (
                    <li key={subcat._id}>
                      <label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="accent-blue-600 mr-2" 
                          checked={String(selectedSubcategory) === String(subcat._id)}
                          onChange={() => handleSubcategoryChange(subcat._id)}
                        />
                        <span className="text-gray-700">{subcat.subcategoryName || subcat.name}</span>
                      </label>
                      
                      {/* Subsubcategories - Always visible if they exist */}
                      {subcat.subsubcategories && subcat.subsubcategories.length > 0 && (
                        <ul className="ml-6 mt-2 space-y-2">
                          {subcat.subsubcategories.map(subsubcat => (
                            <li key={subsubcat._id}>
                              <label className="flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="accent-blue-600 mr-2" 
                                  checked={String(selectedSubsubcategory) === String(subsubcat._id)}
                                  onChange={() => handleSubsubcategoryChange(subsubcat._id)}
                                />
                                <span className="text-gray-700">{subsubcat.subsubcategoryName || subsubcat.name}</span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>

      {/* Material */}
      {materials.length > 0 && (
        <div className="mb-4 pb-4 border-b-2 border-gray-200">
          <h3 className="font-bold font-playfair text-lg mb-3 text-black">Material</h3>
          <ul className="space-y-3">
            {materials.map(material => (
              <li key={material._id}>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="accent-blue-600 mr-2" 
                    checked={selectedMaterials.some(id => String(id) === String(material._id))}
                    onChange={() => handleMaterialChange(material._id)}
                  />
                  <span className="text-gray-700">{material.categoryName}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Color */}
      {colors.length > 0 && (
        <div className="mb-6">
          <h3 className="font-bold font-playfair text-lg mb-3 text-black">Color</h3>
          <ul className="space-y-3">
            {colors.map(color => (
              <li key={color._id}>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="accent-blue-600 mr-2" 
                    checked={selectedColors.some(id => String(id) === String(color._id))}
                    onChange={() => handleColorChange(color._id)}
                  />
                  <span className="text-gray-700">{color.colorName}</span>
                  {color.colorCode && (
                    <span 
                      className="ml-2 w-4 h-4 rounded border border-gray-300 inline-block"
                      style={{ backgroundColor: color.colorCode }}
                      title={color.colorName}
                    />
                  )}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Filter By Price */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-3 text-black font-playfair">Filter By Price</h3>
        <div className="flex items-center mb-2">
          <input
            type="range"
            min="0"
            max="200000"
            value={priceRange.max}
            onChange={handlePriceRangeChange}
            className="w-full accent-[#C09578]"
          />
        </div>
        <div className="mb-2 text-black font-semibold">
          Rs. {parseInt(priceRange.min).toLocaleString()} - Rs. {parseInt(priceRange.max).toLocaleString()}
        </div>
        <button 
          onClick={handlePriceFilter}
          className="bg-black text-white font-bold px-4 py-2 rounded hover:bg-[#C09578] cursor-pointer"
        >
          Filter
        </button>
      </div>
    </aside>
  )
}
