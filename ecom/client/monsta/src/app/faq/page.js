"use client";
import React, { useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'

const faqData = [
	{
		question: "Mauris congue euismod purus at semper. Morbi et vulputate massa?",
		answer: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem"
	},
	{
		question: "Donec mattis finibus elit ut tristique?",
		answer: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem"
	},
	{
		question: "Aenean elit orci, efficitur quis nisl at, accumsan?",
		answer: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem"
	},
	{
		question: "Pellentesque habitant morbi tristique senectus et netus?",
		answer: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem"
	},
	{
		question: "Nam pellentesque aliquam metus?",
		answer: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem"
	},
	{
		question: "Aenean elit orci, efficitur quis nisl at?",
		answer: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem"
	},
	{
		question: "Morbi gravida, nisi id fringilla ultricies, elit lorem?",
		answer: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem"
	},
	{
		question: "Aenean elit orci, efficitur quis nisl at, accumsan?",
		answer: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem"
	}
];

export default function FAQPage() {
	const [openIndex, setOpenIndex] = useState(0);

	const handleToggle = idx => {
		setOpenIndex(idx === openIndex ? null : idx);
	};

	return (
		<div>
			<Breadcrumb pageName="FAQ" />
			<div className="max-w-7xl mx-auto mt-8">
				{faqData.map((item, idx) => (
					<div key={idx} className="mb-4">
						<button
							className={`w-full text-left px-6 py-4 rounded border ${idx === openIndex ? 'border-[#C09578] bg-[#f7f6f4]' : 'border-transparent bg-[#f5f5f5]'} font-bold text-xl flex justify-between items-center transition-all`}
							style={{ color: idx === openIndex ? '#C09578' : '#222', fontFamily: 'inherit' }}
							onClick={() => handleToggle(idx)}
						>
							{item.question}
							<span className={`text-2xl transition-colors ${idx === openIndex ? 'text-[#C09578]' : 'text-gray-400'}`}>
								{idx === openIndex ? '−' : '+'}
							</span>
						</button>
						{idx === openIndex && item.answer && (
							<div className="px-6 py-4 border border-[#C09578] border-t-0 bg-white text-lg text-gray-700">
								{item.answer}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
