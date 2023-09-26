import Image from "next/image";
import GridGroup_r from "resources/rightgrid.svg";
import GridGroup_l from "resources/leftgrid.svg";
import StyledButton from "components/StyledButton";
import WindowFrame from "components/window";

const Part1 = () => {
  return (
    <>
      <div className="absolute right-0 top-0 hidden lg:flex">
        <Image src={GridGroup_r} alt="Grid_R" />
      </div>
      <div className="absolute left-0 top-0 hidden lg:flex">
        <Image src={GridGroup_l} alt="Grid_R" />
      </div>
      <div className="hero min-h-screen py-28 bg-base-150">
        <div className="hero-content text-center">
          <div className="max-w-full">
            <div className="lg:text-8xl font-bold text-black">
              Supercharge your
            </div>
            <div className="lg:text-8xl font-bold pt-5 bg-gradient-to-b text-transparent bg-clip-text from-prd-grad-from to-prd-grad-to">
              Productivity.
            </div>
            <div className="py-6 lg:text-2xl pt-10 text-black font-medium">
              Harness the Power of AI to Increase Productivity In Your <br />
              Workflow with our AI Tools Range!
            </div>

            <StyledButton />
            <WindowFrame />
          </div>
        </div>
      </div>
    </>
  );
};

export default Part1;