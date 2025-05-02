import Navbar from "../components/Navbar";
import BannerCarousel from "../components/BannerCarousel";
import CompanyIntro from "../components/CompanyIntro";
import ProductCategoryQuickEntry from "../components/ProductCategoryQuickEntry";
import ApplicationRecommend from "../components/ApplicationRecommend";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      <Navbar />
      <main className="flex-1 flex flex-col gap-8 md:gap-12">
        <BannerCarousel />
        <section className="container mx-auto px-4 my-8">
          <CompanyIntro />
        </section>
        <section className="container mx-auto px-4 my-8">
          <ProductCategoryQuickEntry />
        </section>
        <ApplicationRecommend />
      </main>
      <Footer />
    </div>
  );
}
