import { Navbar } from "components/Navbar";
import Part1 from "./part1";
import Part2 from "./part2";
import Part3 from "./part3";
import Part4 from "./part4";
import Footer from "components/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Part1 />
        <Part2 />
        <Part3 />
        <Part4 />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
