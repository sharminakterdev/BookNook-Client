import HeroSlider from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
import TopCategories from "@/components/home/TopCategories";
import BorrowingSteps from "@/components/home/BorrowingSteps";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <NewArrivals />
      <TopCategories />
      <BorrowingSteps />
    </main>
  );
}