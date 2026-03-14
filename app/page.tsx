
import Feature from "@/components/web/Feature";
import Footer from "@/components/web/Footer";
import HeroSection from "@/components/web/HeroSection";
import ImageTabs from "@/components/web/imageTabs";


export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section :- */}
       <HeroSection />
        {/* Hero images section:- */}
        <ImageTabs />
        {/* Feature Section :- */}
       <Feature />
        <Footer />
      </main>
    </div>
  );
}
