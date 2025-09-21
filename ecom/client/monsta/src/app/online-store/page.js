import React from 'react'
import Breadcrumb from '../common/Breadcrumb'
import ProductFilter from './ProductFilter'
import ProductListing from './ProductListing'

export default function OnlineStore() {
  return (
    <div>
      <Breadcrumb pageName={"Online Store"} />
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-6">
        <div className="md:w-1/5 w-full mb-6 md:mb-0">
          <ProductFilter />
        </div>
        <div className="md:w-4/5 w-full">
          <ProductListing />
        </div>
      </div>
    </div>
  )
}