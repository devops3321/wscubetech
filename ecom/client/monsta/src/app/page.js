import Image from "next/image";
import HomeBanner from "./components/home/Banner";
import HomeCollection from "./components/home/Collections";
import FeaturedProducts from "./components/home/FeaturedProducts";
import NewTrendingCollection from "./components/home/NewTrendingCollection";
import BestSellingProducts from "./components/home/BestSellingProducts";
import FreeShipping from "./components/home/FreeShipping";
import Testimonial from "./components/home/Testimonial";
import NewsLetter from "./components/home/NewsLetter";
export default function Home() {
  return (
    <>
      <HomeBanner />
      <HomeCollection />
      <FeaturedProducts />
      <NewTrendingCollection />
      <BestSellingProducts />
      <FreeShipping />
      <Testimonial />
      <NewsLetter />
    </>
  );
}
