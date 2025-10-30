import Image from "next/image";

import HomeBanner from "./components/home/Banner";
import HomeCollection from "./components/home/Collections";
import FeaturedProducts from "./components/home/FeaturedProducts";
import NewTrendingCollection from "./components/home/NewTrendingCollection";
import BestSellingProducts from "./components/home/BestSellingProducts";
import FreeShipping from "./components/home/FreeShipping";
import Testimonial from "./components/home/Testimonial";
import NewsLetter from "./components/home/NewsLetter";
import { getFeaturedProducts } from "@/apiServices/productService";

export default async function Home() {
  // Fetch best selling products (server component pattern)
  let bestSellingProducts = [];
  let bestSellingStaticPath = "";
  try {
    const res = await getFeaturedProducts({ type: "bestSelling", limit: 12 });
    bestSellingProducts = res?.data || [];
    bestSellingStaticPath = res?.staticPath || "";
  } catch (e) {
    bestSellingProducts = [];
  }

  return (
    <>
      <HomeBanner />
      <HomeCollection />
      <FeaturedProducts />
      <NewTrendingCollection />
      <BestSellingProducts bestSellingProducts={bestSellingProducts} staticPath={bestSellingStaticPath} />
      <FreeShipping />
      <Testimonial />
      <NewsLetter />
    </>
  );
}
