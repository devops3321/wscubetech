"use client";
import React from "react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8e7d7] to-[#fff] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <svg
          className="mx-auto mb-6"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="12" fill="#C09578" />
          <path
            d="M7 13l3 3 7-7"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-3xl font-bold text-[#C09578] mb-4 font-playfair">
          Thank You for Registering!
        </h1>
        <p className="text-gray-700 mb-6">
          Your account has been created successfully.<br />
          We're excited to have you join our community.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-[#C09578] text-white font-bold px-6 py-3 rounded-full shadow hover:bg-[#a67c52] transition"
        >
          Go to Dashboard
        </Link>
      </div>
      <div className="mt-8 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Monsta. All rights reserved.
      </div>
    </div>
  );
}