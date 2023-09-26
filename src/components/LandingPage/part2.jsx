import Image from "next/image";
import GridGroup_t from "resources/topgrid.svg";
import GridGroup_b from "resources/bottomgrid.svg";
const Part2 = () => {
  return (
    <div className="hero min-h-screen bg-base-150 justify-bet relative">
      <div className="absolute top-0 hidden lg:flex w-full">
        <Image src={GridGroup_t} alt="Grid_T" className="w-full" />
      </div>
      <div className="absolute bottom-0 hidden lg:flex w-full">
        <Image src={GridGroup_b} alt="Grid_B" className="w-full" />
      </div>
      <div className="hero-content text-center">
        <div className="max-w-full">
          <div className="lg:text-6xl font-bold text-black">
            Next Generation{" "}
            <span className="lg:text-6xl font-bold pt-5 bg-gradient-to-b text-transparent bg-clip-text from-prd-grad-from to-prd-grad-to">
              AI Powered Tools
            </span>
            <br />
            to Help you{" "}
            <span className="lg:text-6xl font-bold pt-5 bg-gradient-to-b text-transparent bg-clip-text from-prd-grad-from to-prd-grad-to">
              Save Time and Effort!
            </span>
          </div>
          <div className="py-6 lg:text-2xl pt-10 text-black font-medium">
            Whether you're a university student seeking to streamline your
            academic journey or an everyday <br /> user looking to simplify your
            tasks, our website is here to make your life easier. Unlock the
            power <br /> of artificial intelligence and experience the freedom
            of saving countless hours.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part2;
