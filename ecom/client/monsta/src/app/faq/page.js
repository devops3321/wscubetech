"use client";
import React, { useState, useEffect } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import axios from 'axios'

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);
    const [faqData, setFaqData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // normalize admin API base and ensure single trailing slash
    const API_BASE = (process.env.NEXT_PUBLIC_APIBASEURL_ADMIN || '').replace(/\/+$/, '') + '/';

    const handleToggle = idx => {
        setOpenIndex(idx === openIndex ? null : idx);
    };

    const fetchFaqs = async () => {
        setLoading(true);
        setError(null);
        try {
            // request a large limit so server returns all FAQs (server uses default limit=5 otherwise)
            const url = `${API_BASE}faq/view?limit=10000`;
            const resp = await axios.get(url);
            const data = resp?.data || {};
            setFaqData(Array.isArray(data.faqData) ? data.faqData : []);
        } catch (err) {
            console.error("Error fetching FAQs:", err);
            setError("Unable to load FAQs");
            setFaqData([]);
        } finally {
            setLoading(false);
        }
    };

    // fetch once on mount (no pagination)
    useEffect(() => {
        fetchFaqs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Breadcrumb pageName="FAQ" />
            <div className="max-w-7xl mx-auto mt-8">
                {loading && (
                    <div className="py-8 text-center text-gray-600">Loading FAQs...</div>
                )}

                {error && (
                    <div className="py-4 px-6 mb-4 bg-red-50 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {!loading && faqData.length === 0 && !error && (
                    <div className="py-8 text-center text-gray-600">No FAQs found.</div>
                )}

                {faqData.map((item, idx) => (
                    <div key={item._id ?? idx} className="mb-4">
                        <button
                            className={`w-full text-left px-6 py-4 rounded border ${idx === openIndex ? 'border-[#C09578] bg-[#f7f6f4]' : 'border-transparent bg-[#f5f5f5]'} font-bold text-xl flex justify-between items-center transition-all cursor-pointer`}
                            style={{ color: idx === openIndex ? '#C09578' : '#222', fontFamily: 'inherit' }}
                            onClick={() => handleToggle(idx)}
                        >
                            {item.question || "Untitled question"}
                            <span className={`text-2xl cursor-pointer transition-colors ${idx === openIndex ? 'text-[#C09578]' : 'text-gray-400'}`}>
                                {idx === openIndex ? '−' : '+'}
                            </span>
                        </button>
                        {item.answer && (
                            <div className={`px-6 py-4 border border-[#C09578] border-t-0 bg-white text-lg text-gray-700 ${idx === openIndex ? '' : 'hidden'}`}>
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}

                {/* pagination removed - all FAQs displayed in series */}
            </div>
        </div>
    )
}
