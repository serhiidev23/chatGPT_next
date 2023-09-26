import Image from "next/image";
import WindowFrameSvg from "resources/WindowFrame.svg";
import Videoframe from "resources/videoframe.svg";

const WindowFrame = () => {
  return (
    <div className="pt-24 relative">
      <svg
        className="w-[82.5625rem] h-[54.1875rem] pr-[4.5rem]"
        viewBox="0 0 1321 867"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="1320"
          height="866"
          rx="43.5"
          fill="#FAFAFA"
          stroke="#E6E6E6"
        />
      </svg>

      <Image src={WindowFrameSvg} className="absolute top-40 left-11 pr-[4.5rem]" alt="Window Frame" />
      <Image
        className="absolute top-[14.3rem] lg:left-[2.84rem] pr-[4.5rem]"
        src={Videoframe}
        alt="Video Frame"
      />
      {/* <div className="absolute top-42 left-0.1 bg-black opacity-50 rounded-b-[2rem]">
        <svg
          width="1234"
          height="708"
          viewBox="0 0 1234 708"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H1233V683C1233 697.912 1220.91 710 1206 710H27C12.0883 710 0 697.912 0 683V0Z"
            fill="black"
            fill-opacity="0.15"
          />
        </svg>
        {/* <div className="w-48 h-48 bg-blue-600 bg-opacity-10 rounded-full" />
      </div> */}
    </div>
  );
};

export default WindowFrame;
