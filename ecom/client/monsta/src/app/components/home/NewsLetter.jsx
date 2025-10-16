"use client"
import React, { useState } from 'react'

export default function NewsLetter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const isValidEmail = (value) => {
    if (!value) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(value).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: false, message: '', type: '' });

    if (!isValidEmail(email)) {
      setStatus({ loading: false, message: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    try {
      setStatus({ loading: true, message: '', type: '' });

      // build URL safely (handle trailing slash in env)
      const base = (process.env.NEXT_PUBLIC_APIBASEURL || '').replace(/\/+$/, '');
      const url = `${base}/newsletter/create`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newsletterEmail: email.trim() })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus({ loading: false, message: data.message || 'Subscribed successfully!', type: 'success' });
        setEmail('');
      } else {
        const msg = data.message || data.error || res.statusText || 'Subscription failed';
        setStatus({ loading: false, message: msg, type: 'error' });
      }
    } catch (err) {
      setStatus({ loading: false, message: err.message || 'Network error', type: 'error' });
    }
  };

  return (
    <div className="bg-[#F8F9F9] py-12 border-2 border-gray-200">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl text-black md:text-3xl font-bold mb-4 font-playfair">Our Newsletter</h2>
        <p className="text-gray-600 mb-8">Get E-mail updates about our latest shop and special offers.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-0">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address..."
            className="w-full sm:w-[800px] px-4 py-4 rounded-l-md border border-[#e5e5e5] focus:outline-none text-gray-700 bg-white"
            required
            aria-label="newsletter-email"
          />
          <button
            type="submit"
            disabled={status.loading}
            className="bg-[#C09578] text-white font-bold px-10 py-4 rounded-r-md text-base sm:text-lg disabled:opacity-60 cursor-pointer hover:bg-[#a67c5a] transition-colors duration-300"
          >
            {status.loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {status.message && (
          <p
            className={`mt-4 text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}
            role="status"
          >
            {status.message}
          </p>
        )}
      </div>
    </div>
  )
}
