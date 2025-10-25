import React from 'react'
import Breadcrumb from '../common/Breadcrumb'

export default function PrivacyPolicy() {
    return (
        <section>
            <Breadcrumb pageName={"Privacy Policy"} />
            <div className="max-w-4xl mx-auto px-4 text-black">
                <h2 className="text-2xl font-bold mb-6 font-playfair">Who We Are</h2>
                <p className="mb-6">
                    Welcome to Monsta, your trusted furniture destination. Our website address is: <a href="http://localhost/furniture" className="text-[#C09578] underline cursor-pointer">http://localhost/furniture</a>
                </p>

                <h2 className="text-2xl font-bold mb-4 font-playfair">Personal Data We Collect and Why</h2>

                <h3 className="text-xl font-semibold mb-2 mt-6 font-playfair">Comments</h3>
                <p className="mb-4">
                    When visitors leave comments on our site, we collect the data shown in the comments form, along with the visitor’s IP address and browser user agent string to help detect spam. An anonymized string (hash) from your email may be shared with the Gravatar service to check your profile picture. Your profile picture appears publicly after comment approval.
                </p>

                <h3 className="text-xl font-semibold mb-2 mt-6 font-playfair">Media</h3>
                <p className="mb-4">
                    If you upload images, avoid files with embedded location data (EXIF GPS), as visitors may extract this.
                </p>

                <h3 className="text-xl font-semibold mb-2 mt-6 font-playfair">Cookies</h3>
                <p className="mb-4">
                    We use cookies to save your comment details for convenience for up to one year.
                </p>
                <p className="mb-4">
                    Registered users receive cookies to manage login sessions and display preferences, lasting from two days up to two weeks depending on “Remember Me” selection.
                </p>
                <p className="mb-4">
                    Editing or publishing content sets a cookie with a post ID, expiring in one day.
                </p>
                <p className="mb-4">
                    Temporary cookies test if your browser accepts cookies and disappear after closing the browser.
                </p>

                <h3 className="text-xl font-semibold mb-2 mt-6 font-playfair">Embedded Content</h3>
                <p className="mb-4">
                    We may embed content from third-party websites, which collect data and track your interactions according to their own privacy policies.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8 font-playfair">How We Use Your Data</h2>
                <p className="mb-4">
                    Your data is used to:
                </p>
                <ul className="list-disc pl-6 mb-6">
                    <li>Manage and moderate comments and user profiles</li>
                    <li>Prevent and detect spam and security issues</li>
                    <li>Improve and personalize your website experience</li>
                    <li>Comply with legal obligations and resolve disputes</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 mt-8 font-playfair">Retention of Data</h2>
                <p className="mb-4">
                    Comments and associated metadata are retained indefinitely for automatic moderation.
                </p>
                <p className="mb-4">
                    Registered user data is retained until profile deletion or update. Administrators have access to edit data.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8 font-playfair">Your Data Protection Rights (GDPR)</h2>
                <p className="mb-4">
                    If you are located in the European Economic Area (EEA), you have rights including but not limited to:
                </p>
                <ul className="list-disc pl-6 mb-6">
                    <li>Right to access your personal data</li>
                    <li>Right to rectify inaccurate or incomplete data</li>
                    <li>Right to erasure (“right to be forgotten”) under certain conditions</li>
                    <li>Right to restrict or object to processing</li>
                    <li>Right to data portability</li>
                    <li>Right to withdraw consent at any time where applicable</li>
                    <li>Right to lodge a complaint with a supervisory authority</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 mt-8 font-playfair">Your California Privacy Rights (CCPA)</h2>
                <p className="mb-4">
                    If you are a California resident, you have the right to:
                </p>
                <ul className="list-disc pl-6 mb-6">
                    <li>Request disclosure of personal information collected and its categories</li>
                    <li>Request deletion of personal information, with some exceptions</li>
                    <li>Opt-out of the sale of personal information (Monsta does not sell personal data)</li>
                    <li>Receive equal service and price even if you exercise these rights</li>
                </ul>
                <p className="mb-6">
                    To exercise your rights under GDPR or CCPA, please contact Monsta at <a href="mailto:privacy@monsta.com" className="text-[#C09578] underline cursor-pointer">privacy@monsta.com</a>.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8 font-playfair">Where We Send Your Data</h2>
                <p className="mb-10">
                    Comments may be checked with automated spam detection services to protect the community.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8 font-playfair">Security of Your Data</h2>
                <p className="mb-4">
                    We implement appropriate security measures to protect your data but cannot guarantee absolute security due to internet risks.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8 font-playfair">Children’s Privacy</h2>
                <p className="mb-4">
                    Our website is not intended for children under 16, and we do not knowingly collect data from children without parental consent.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8 font-playfair">Changes to This Privacy Policy</h2>
                <p className="mb-4">
                    We may update this Privacy Policy to reflect changes in legal or operational requirements. We encourage you to review it periodically.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8 font-playfair">Contact Us</h2>
                <p className="mb-6">
                    If you have any questions or concerns about the privacy policy or your data, contact:
                </p>
                <p className="mb-2 font-semibold">Monsta Furniture</p>
                <p className="mb-2">Email: <a href="mailto:privacy@monsta.com" className="text-[#C09578] underline cursor-pointer">privacy@monsta.com</a></p>
                <p className="mb-10">Address: 123 Design Street, Mumbai, India</p>
            </div>
        </section>
    )
}
