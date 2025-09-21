import React from 'react'
import BreadcrumbProductDetails from './BreadcrumbProductDetails'
import ProductDetails from './ProductDetails'

export default function ProductDetailsView() {
  return (
    <div>
      <BreadcrumbProductDetails categoryName="Side and End Tables" productName="Hrithvik Stool" />
      <ProductDetails productName="Hrithvik Stool" />
    </div>
  )
}
