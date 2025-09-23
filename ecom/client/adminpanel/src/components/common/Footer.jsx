import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-2xl rounded-t-3xl border-t border-blue-200 dark:border-gray-700 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <hr className="border-t border-blue-200 dark:border-gray-700 my-4 w-full" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-blue-900 dark:text-gray-200">
          <p>2025 WsCube Tech™. All Rights Reserved.</p>
          <p>Design By WsCube Tech</p>
        </div>
      </div>
    </footer>
  )
}