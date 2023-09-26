import Image from "next/image";
import group1 from "resources/Group1.svg";
import group2 from "resources/Group2.svg";
import group3 from "resources/Group3.svg";
import group4 from "resources/Group4.svg";
import vector from "resources/Vector.svg";

const Part4 = () => {
  return (
    <>
      <div className="bg-base-150 h-[38.68rem] bg-prd-grad-from relative flex justify-center">
        <Image
          className="absolute right-0 top-0 w-full h-full object-cover"
          src={group4}
          alt="Group4"
        />
        <Image className="absolute left-0 top-0" src={group2} alt="Group2" />
        <Image className="absolute right-0 top-0" src={vector} alt="Vector" />
        <Image
          className="absolute right-0 bottom-20"
          src={group1}
          alt="Group1"
        />
        <Image
          className="absolute right-10 bottom-0"
          src={group3}
          alt="Group3"
        />
        <div className="z-10 flex flex-col justify-center items-center">
          <p className="text-4xl text-white font-bold">
            Let’s start streamlining your work with MaiStudyPal!
          </p>
          <p className="text-2xl text-white font-normal text-center">
            <br />
            Join us today and revolutionize the way you work, study, and excel.
            <br />
          </p>
          <div className="m-4 mt-10 p-1 w-[25.81rem] rounded-xl bg-white z-10 relative">
            <input
              type="text"
              placeholder="Enter Email"
              className="input w-full pr-32"
            />
            <button className="absolute right-1 btn normal-case bg-prd-grad-from text-white hover:bg-purple-900">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Part4;
