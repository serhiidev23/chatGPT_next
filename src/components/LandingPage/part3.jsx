import Image from "next/image";
import WindowFrameSvg from "resources/WindowFrame.svg";
import Videoframe from "resources/videoframe.svg";
import Backboardframe from "resources/framebackboard.svg";
import Logo from "resources/Logo.svg";
import Link from "next/link";

const Part3 = () => {
  return (
    <div className="hero min-h-screen py-28 bg-base-150 relative mt-52">
      <div className="hero-content">
        <div className="mt-6 space-x-12 lg:grid lg:grid-rows-3 lg:gap-y-80 lg:space-x-0 relative">
          <div className="absolute -left-20 top-8">
            <Image src={Logo} alt="Logo" />
            <svg
              className="absolute ml-5 -mt-1"
              width="4"
              height="367"
              viewBox="0 0 4 367"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="4"
                height="367"
                fill="url(#paint0_linear_31_713)"
                fillOpacity="0.5"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_31_713"
                  x1="2"
                  y1="0"
                  x2="2"
                  y2="367"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8C52FF" />
                  <stop offset="1" stopColor="#1A2735" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:space-y-0">
            <div className="group relative">
              <div className="relative rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
                <div className="text-5xl font-bold">AI Summarizer</div>
                <div className="pt-6 text-[1.1rem] font-medium">
                  Try our PDF/File Automatic Summarizer <br /> and Document
                  Query Bot today and <br /> simplify your document handling{" "}
                  <br /> process. Unlock the insights you need <br /> without
                  the information overload! <br />
                </div>
                <Link
                  href="/summarizer"
                  className="absolute left-0 bottom-0 btn bg-prd-grad-from hover:bg-purple-900 text-white normal-case"
                >
                  Try the Tool&nbsp;
                  <svg
                    className="w-5 h-5 text-white dark:text-white rounded-none"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="group relative">
              <div className="relative h-full w-full rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
                <Image
                  className="absolute -top-7"
                  src={Backboardframe}
                  alt="Back Board Frame"
                />
                <Image
                  src={WindowFrameSvg}
                  className="absolute top-0 left-11 pr-[5rem]"
                  alt="Window Frame"
                />
                <Image
                  className="absolute top-[2.05rem] lg:left-[2.75rem] pr-[4.5rem]"
                  src={Videoframe}
                  alt="Video Frame"
                />
              </div>

              {/* <div className="w-[40rem] h-[40rem] absolute rounded-full bg-gradient-radial from-purple-300 to-white opacity-75 blur-3xl"></div>             */}
            </div>
          </div>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:space-y-0">
            <div className="group relative">
              <div className="relative h-full w-full rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
                <Image
                  className="absolute -top-7"
                  src={Backboardframe}
                  alt="Back Board Frame"
                />
                <Image
                  src={WindowFrameSvg}
                  className="absolute top-0 left-11 pr-[5rem]"
                  alt="Window Frame"
                />
                <Image
                  className="absolute top-[2.05rem] lg:left-[2.75rem] pr-[4.5rem]"
                  src={Videoframe}
                  alt="Video Frame"
                />
              </div>

              {/* <div className="w-[40rem] h-[40rem] absolute rounded-full bg-gradient-radial from-purple-300 to-white opacity-75 blur-3xl"></div>             */}
            </div>
            <div className="group relative">
              <div className="relative rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
                <div className="text-5xl font-bold">AI Summarizer</div>
                <div className="pt-6 text-[1.1rem] font-medium">
                  Try our PDF/File Automatic Summarizer <br /> and Document
                  Query Bot today and <br /> simplify your document handling{" "}
                  <br /> process. Unlock the insights you need <br /> without
                  the information overload! <br />
                </div>
                <Link
                  href="/wassistant"
                  className="absolute left-0 bottom-0 btn bg-prd-grad-from hover:bg-purple-900 text-white normal-case"
                >
                  Try the Tool&nbsp;
                  <svg
                    className="w-5 h-5 text-white dark:text-white rounded-none"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:space-y-0">
            <div className="group relative">
              <div className="relative rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
                <div className="text-5xl font-bold">AI Summarizer</div>
                <div className="pt-6 text-[1.1rem] font-medium">
                  Try our PDF/File Automatic Summarizer <br /> and Document
                  Query Bot today and <br /> simplify your document handling{" "}
                  <br /> process. Unlock the insights you need <br /> without
                  the information overload! <br />
                </div>
                <Link
                  href="/chatbot"
                  className="absolute left-0 bottom-0 btn bg-prd-grad-from hover:bg-purple-900 text-white normal-case"
                >
                  Try the Tool&nbsp;
                  <svg
                    className="w-5 h-5 text-white dark:text-white rounded-none"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="group relative">
              <div className="relative h-full w-full rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
                <Image
                  className="absolute -top-7"
                  src={Backboardframe}
                  alt="Back Board Frame"
                />
                <Image
                  src={WindowFrameSvg}
                  className="absolute top-0 left-11 pr-[5rem]"
                  alt="Window Frame"
                />
                <Image
                  className="absolute top-[2.05rem] lg:left-[2.75rem] pr-[4.5rem]"
                  src={Videoframe}
                  alt="Video Frame"
                />
              </div>

              {/* <div className="w-[40rem] h-[40rem] absolute rounded-full bg-gradient-radial from-purple-300 to-white opacity-75 blur-3xl"></div>             */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part3;
