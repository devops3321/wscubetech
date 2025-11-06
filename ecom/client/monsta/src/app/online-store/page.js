import React from 'react'
import Breadcrumb from '../common/Breadcrumb'
import ProductFilter from './ProductFilter'
import ProductListing from './ProductListing'
import { getAllProducts, getCategoriesForFilter, getMaterialsForFilter, getColorsForFilter } from '@/apiServices/serverProductService'

export default async function OnlineStore({ searchParams }) {
  // Await searchParams in Next.js 15+
  const params = await searchParams;
  
  // Parse search params for filters
  const page = parseInt(params?.page || '1', 10);
  const limit = parseInt(params?.limit || '12', 10);
  const sortBy = params?.sortBy || 'newest';
  const search = params?.search || '';
  const category = params?.category || '';
  const subcategory = params?.subcategory || '';
  const subsubcategory = params?.subsubcategory || '';
  const material = params?.material ? (Array.isArray(params.material) ? params.material : [params.material]) : [];
  const color = params?.color ? (Array.isArray(params.color) ? params.color : [params.color]) : [];
  const minPrice = params?.minPrice || '';
  const maxPrice = params?.maxPrice || '';

  // Build API params
  const productParams = {
    page,
    limit,
    sortBy,
    search,
    ...(category && { category }),
    ...(subcategory && { subcategory }),
    ...(subsubcategory && { subsubcategory }),
    ...(material.length > 0 && { material }),
    ...(color.length > 0 && { color }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice })
  };

  // Fetch initial data server-side
  let productsData = { data: [], totalCount: 0, page: 1, totalPage: 1, staticPath: "" };
  let categoriesData = { data: [] };
  let materialsData = { data: [] };
  let colorsData = { data: [] };

  try {
    const [productsRes, categoriesRes, materialsRes, colorsRes] = await Promise.all([
      getAllProducts(productParams).catch((err) => {
        console.warn('Failed to fetch products:', err.message);
        return { data: [], totalCount: 0, page: 1, totalPage: 1, staticPath: "", status: false };
      }),
      getCategoriesForFilter().catch((err) => {
        console.warn('Failed to fetch categories:', err.message);
        return { data: [], status: false };
      }),
      getMaterialsForFilter().catch((err) => {
        console.warn('Failed to fetch materials:', err.message);
        return { data: [], status: false };
      }),
      getColorsForFilter().catch((err) => {
        console.warn('Failed to fetch colors:', err.message);
        return { data: [], status: false };
      })
    ]);

    // Handle response structure - check for both status and data properties
    productsData = productsRes && (productsRes.status !== false) ? productsRes : { ...productsRes, status: true };
    categoriesData = categoriesRes && categoriesRes.data ? categoriesRes : { data: categoriesRes?.data || [], status: categoriesRes?.status !== false };
    materialsData = materialsRes && materialsRes.data ? materialsRes : { data: materialsRes?.data || [], status: materialsRes?.status !== false };
    colorsData = colorsRes && colorsRes.data ? colorsRes : { data: colorsRes?.data || [], status: colorsRes?.status !== false };

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('Categories fetched:', categoriesData.data?.length || 0, 'items');
      console.log('Materials fetched:', materialsData.data?.length || 0, 'items');
      console.log('Colors fetched:', colorsData.data?.length || 0, 'items');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <div>
      <Breadcrumb pageName={"Online Store"} />
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-6">
        <div className="md:w-1/5 w-full mb-6 md:mb-0">
          <ProductFilter 
            initialCategories={categoriesData.data || []}
            initialMaterials={materialsData.data || []}
            initialColors={colorsData.data || []}
            initialFilters={{
              category,
              subcategory,
              subsubcategory,
              material,
              color,
              minPrice,
              maxPrice
            }}
          />
        </div>
        <div className="md:w-4/5 w-full">
          <ProductListing 
            initialProducts={productsData.data || []}
            initialPagination={{
              page: productsData.page || 1,
              limit: productsData.limit || limit,
              totalCount: productsData.totalCount || 0,
              totalPage: productsData.totalPage || 1
            }}
            initialSort={sortBy}
            staticImagePath={productsData.staticPath || ""}
          />
        </div>
      </div>
    </div>
  )
}