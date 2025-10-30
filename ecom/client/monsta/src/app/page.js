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
  // Fetch best selling and tabbed products (SSR)
  let bestSellingProducts = [];
  let bestSellingStaticPath = "";
  let featuredProducts = [];
  let newArrivalsProducts = [];
  let onSaleProducts = [];
  let featuredStaticPath = "";
  try {
    // Best Selling
    const bestSellingRes = await getFeaturedProducts({ type: "bestSelling", limit: 12 });
    bestSellingProducts = bestSellingRes?.data || [];
    bestSellingStaticPath = bestSellingRes?.staticPath || "";

    // Featured
    const featuredRes = await getFeaturedProducts({ productType: "Featured", limit: 8 });
    featuredProducts = featuredRes?.data || [];
    featuredStaticPath = featuredRes?.staticPath || "";

    // New Arrivals
    const newArrivalsRes = await getFeaturedProducts({ productType: "New Arrivals", limit: 8 });
    newArrivalsProducts = newArrivalsRes?.data || [];

    // On Sale
    const onSaleRes = await getFeaturedProducts({ productType: "On Sale", limit: 8 });
    onSaleProducts = onSaleRes?.data || [];
  } catch (e) {
    // fallback to empty
    bestSellingProducts = [];
    featuredProducts = [];
    newArrivalsProducts = [];
    onSaleProducts = [];
  }

  return (
    <>
      <HomeBanner />
      <HomeCollection />
      <FeaturedProducts
        featuredProducts={featuredProducts}
        newArrivalsProducts={newArrivalsProducts}
        onSaleProducts={onSaleProducts}
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
