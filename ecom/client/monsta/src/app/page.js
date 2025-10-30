import HomeBanner from "./components/home/Banner";
import HomeCollection from "./components/home/Collections";
import FeaturedProducts from "./components/home/FeaturedProducts";
import { getFeaturedProducts } from "@/apiServices/productService";
import NewTrendingCollection from "./components/home/NewTrendingCollection";
import BestSellingProducts from "./components/home/BestSellingProducts";
import FreeShipping from "./components/home/FreeShipping";
import Testimonial from "./components/home/Testimonial";
import NewsLetter from "./components/home/NewsLetter";

export default async function Home() {
  let bestSellingProducts = [];
  let bestSellingStaticPath = "";
  let featuredStaticPath = "";
  let productTypes = [];
  let productsByType = {};

  try {
    // Best Selling
    const bestSellingRes = await getFeaturedProducts({ type: "bestSelling", limit: 12 });
    bestSellingProducts = bestSellingRes?.data || [];
    bestSellingStaticPath = bestSellingRes?.staticPath || "";

    // Get product types from API
    const featuredRes = await getFeaturedProducts({ productType: "Featured", limit: 8 });
    productTypes = featuredRes?.productTypes || [];
    featuredStaticPath = featuredRes?.staticPath || "";

    // Fetch products for each productType
    for (const type of productTypes) {
      const res = await getFeaturedProducts({ productType: type, limit: 8 });
      productsByType[type] = res?.data || [];
    }
  } catch (e) {
    bestSellingProducts = [];
    productsByType = {};
    productTypes = [];
  }

  return (
    <>
      <HomeBanner />
      <HomeCollection />
      <FeaturedProducts
        productTypes={productTypes}
        productsByType={productsByType}
        staticPath={featuredStaticPath}
      />
      <NewTrendingCollection />
      <BestSellingProducts bestSellingProducts={bestSellingProducts} staticPath={bestSellingStaticPath} />
      <FreeShipping />
      <Testimonial />
      <NewsLetter />
    </>
  );
}
