"use client";
import { ToolHeader } from "components/Navbar";
import { useState } from "react";
import React from "react";
import dynamic from "next/dynamic";
import WritingButton from "components/Items/writingbuttons";
const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

const WritingAssistant = () => {
  const [status, setStatus] = useState({});
  const [originalText, setOriginalText] = useState();
  const [inputText, setInputText] = useState();
  const [outputText, setOutputText] = useState();
  const [count, setCount] = useState({ wordCount: 0, sentenceCount: 0 });
  const [showGrammarChecker, hideGrammarChecker] = useState(true);

  const getCount = (text) => {
    const wordCount = text.trim().split(/\s+/).length;
    const sentenceCount = text.trim().split(/[.?!]\s/).length;
    return { wordCount: wordCount, sentenceCount: sentenceCount };
  };

  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((pastedText) => {
        setOriginalText(pastedText);
        setCount(getCount(pastedText));
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (option) => {
    let prt;
    if (option === "Rephrase")
      prt = `${originalText} \n Please ${option} the above sentences.`;
    else if (option === "Clear") {
      setOriginalText(null);
      setInputText(null);
      return;
    } else
      prt = `${originalText} \n Please make the above sentences are ${option}`;
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/openai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prt }),
    })
      .then((res) => res.json())
      .then((data) => {
        setInputText(data.message);
      });
  };

  return (
    <>
      <div className="flex h-screen">
        {/* -- Main Content -- */}
        <div className="flex flex-col flex-1">
          <ToolHeader type="wassistant" id="navbar-summarizer" />
          {/* <!-- Main Content Area --> */}
          <main className="flex flex-1">
            {/* main content */}
            <div className="w-3/4 flex-1 bg-gray-100 p-6 relative flex justify-center items-center flex-col">
              <div className="w-11/12 relative bg-white rounded-md shadow flex items-start justify-start flex-col">
                <div className="text-neutral-500 font-normal mt-3 ml-6">
                  Tools
                </div>
                <div className="flex mt-4">
                  <WritingButton
                    handleClick={() => handleClick("Rephrase")}
                    btnName="Rephrase"
                  />
                  <svg
                    className="ml-6 mt-1.5"
                    width="3"
                    height="37"
                    viewBox="0 0 3 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1.5 0V36.5" stroke="#D2D2D2" strokeWidth="2" />
                  </svg>

                  <WritingButton
                    handleClick={() => handleClick("Casual")}
                    btnName="Casual"
                  />
                  <WritingButton
                    handleClick={() => handleClick("Formal")}
                    btnName="Formal"
                  />
                  <WritingButton
                    handleClick={() => handleClick("Creative")}
                    btnName="Creative"
                  />
                  <WritingButton
                    handleClick={() => handleClick("Simple")}
                    btnName="Simple"
                  />
                  <svg
                    className="ml-6 mt-1.5"
                    width="3"
                    height="37"
                    viewBox="0 0 3 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1.5 0V36.5" stroke="#D2D2D2" strokeWidth="2" />
                  </svg>
                  <WritingButton
                    handleClick={() => handleClick("Expand")}
                    btnName="Expand"
                  />
                  <WritingButton
                    handleClick={() => handleClick("Shorten")}
                    btnName="Shorten"
                  />
                  <WritingButton
                    handleClick={() => handleClick("Clear")}
                    btnName="Clear"
                  />
                  {showGrammarChecker ? (
                    <div
                      onClick={() => hideGrammarChecker(false)}
                      className="absolute hover:bg-gray-200 right-6 ml-6 bg-white w-60 h-12 cursor-pointer rounded-lg border border-neutral-300 justify-center items-center gap-2.5 inline-flex"
                    >
                      Open Grammar Suggestor
                      <svg
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.25 2C2.78587 2 2.34075 2.18437 2.01256 2.51256C1.68437 2.84075 1.5 3.28587 1.5 3.75V11.25C1.5 12.216 2.284 13 3.25 13H10.75C11.2141 13 11.6592 12.8156 11.9874 12.4874C12.3156 12.1592 12.5 11.7141 12.5 11.25V9.25C12.5 9.05109 12.579 8.86032 12.7197 8.71967C12.8603 8.57902 13.0511 8.5 13.25 8.5C13.4489 8.5 13.6397 8.57902 13.7803 8.71967C13.921 8.86032 14 9.05109 14 9.25V11.25C14 12.112 13.6576 12.9386 13.0481 13.5481C12.4386 14.1576 11.612 14.5 10.75 14.5H3.25C2.38805 14.5 1.5614 14.1576 0.951903 13.5481C0.34241 12.9386 0 12.112 0 11.25V3.75C0 2.88805 0.34241 2.0614 0.951903 1.4519C1.5614 0.84241 2.38805 0.5 3.25 0.5H5.25C5.44891 0.5 5.63968 0.579018 5.78033 0.71967C5.92098 0.860322 6 1.05109 6 1.25C6 1.44891 5.92098 1.63968 5.78033 1.78033C5.63968 1.92098 5.44891 2 5.25 2H3.25ZM7.5 1.25C7.5 1.05109 7.57902 0.860322 7.71967 0.71967C7.86032 0.579018 8.05109 0.5 8.25 0.5H13.25C13.4489 0.5 13.6397 0.579018 13.7803 0.71967C13.921 0.860322 14 1.05109 14 1.25V6.25C14 6.44891 13.921 6.63968 13.7803 6.78033C13.6397 6.92098 13.4489 7 13.25 7C13.0511 7 12.8603 6.92098 12.7197 6.78033C12.579 6.63968 12.5 6.44891 12.5 6.25V3.06L8.78 6.78C8.71134 6.85369 8.62854 6.91279 8.53654 6.95378C8.44454 6.99477 8.34523 7.01682 8.24452 7.01859C8.14382 7.02037 8.04379 7.00184 7.9504 6.96412C7.85701 6.9264 7.77218 6.87026 7.70096 6.79904C7.62974 6.72782 7.5736 6.64299 7.53588 6.5496C7.49816 6.45621 7.47963 6.35618 7.48141 6.25548C7.48318 6.15478 7.50523 6.05546 7.54622 5.96346C7.58721 5.87146 7.64631 5.78866 7.72 5.72L11.44 2H8.25C8.05109 2 7.86032 1.92098 7.71967 1.78033C7.57902 1.63968 7.5 1.44891 7.5 1.25Z"
                          fill="#8C52FF"
                        />
                      </svg>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mt-4 flex justify-center items-center w-full">
                  <div className="w-1/2 h-[28.56rem] border border-t-zinc-300 border-r-zinc-300">
                    <div className="w-full h-full resize-none p-5 flex relative overflow-y-auto">
                      {originalText ? (
                        <div className="whitespace-pre-line">
                          {originalText}
                        </div>
                      ) : (
                        <>
                          <div className="text-start text-gray-500">
                            To enhance your text use the tools above.
                          </div>
                          <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center">
                            <div
                              onClick={handlePaste}
                              className="absolute hover:cursor-pointer btn normal-case hover:bg-prd-sub-grad-from bg-prd-sub-grad-from inline-flex justify-center items-center rounded-lg space-x-2"
                            >
                              <svg
                                width="18"
                                height="22"
                                viewBox="0 0 18 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16 20H2V4H4V7H14V4H16M9 2C9.26522 2 9.51957 2.10536 9.70711 2.29289C9.89464 2.48043 10 2.73478 10 3C10 3.26522 9.89464 3.51957 9.70711 3.70711C9.51957 3.89464 9.26522 4 9 4C8.73478 4 8.48043 3.89464 8.29289 3.70711C8.10536 3.51957 8 3.26522 8 3C8 2.73478 8.10536 2.48043 8.29289 2.29289C8.48043 2.10536 8.73478 2 9 2ZM16 2H11.82C11.4 0.84 10.3 0 9 0C7.7 0 6.6 0.84 6.18 2H2C1.46957 2 0.960859 2.21071 0.585786 2.58579C0.210714 2.96086 0 3.46957 0 4V20C0 20.5304 0.210714 21.0391 0.585786 21.4142C0.960859 21.7893 1.46957 22 2 22H16C16.5304 22 17.0391 21.7893 17.4142 21.4142C17.7893 21.0391 18 20.5304 18 20V4C18 3.46957 17.7893 2.96086 17.4142 2.58579C17.0391 2.21071 16.5304 2 16 2Z"
                                  fill="white"
                                />
                              </svg>
                              <span className="text-white">Paste Text</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="w-1/2 h-[28.56rem] border border-t-zinc-300">
                    <div className="w-full h-full resize-none py-5 overflow-y-auto">
                      <MarkdownPreview source={inputText} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex bg-[#FAFAFA] justify-between w-11/12 mt-4">
                <span className="justify-start">
                  {count.sentenceCount} Sentences • {count.wordCount} Words
                </span>
                <span className="flex items-center">
                  <svg
                    className="mr-2"
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="4" cy="4" r="4" fill="#8C52FF" />
                  </svg>
                  Changed Word
                  <svg
                    className="ml-4 mr-2"
                    width="16"
                    height="2"
                    viewBox="0 0 16 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0.5 1H16" stroke="#FFD01F" strokeWidth="2" />
                  </svg>
                  Structural Changes
                </span>
              </div>
            </div>
            {/* pdf viewer */}
            <div
              className="w-1/4 sidebar-shadow h-full border-none relative"
              hidden={showGrammarChecker}
            >
              <div className="flex justify-between w-full">
                <span className="ml-3 mt-3 text-2xl font-bold flex justify-center items-center">
                  <svg
                    className="w-8 h-8 text-black fill-white rounded-none"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.0952 33.3333H33.3333M29.5238 12.381L31.4285 14.2857M32.3809 7.61905C32.7562 7.99421 33.0539 8.43963 33.257 8.92987C33.4601 9.4201 33.5646 9.94555 33.5646 10.4762C33.5646 11.0068 33.4601 11.5323 33.257 12.0225C33.0539 12.5127 32.7562 12.9582 32.3809 13.3333L14.2857 31.4286L6.66663 33.3333L8.57139 25.821L26.6742 7.62667C27.3878 6.90966 28.3448 6.48717 29.3554 6.44306C30.366 6.39895 31.3562 6.73646 32.1295 7.38857L32.3809 7.61905Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  &nbsp;Grammar Checker
                </span>
                <span
                  onClick={() => hideGrammarChecker(true)}
                  className="mr-3 mt-3 hover:cursor-pointer"
                >
                  ✕
                </span>
              </div>
              <div className="flex w-10/12 shadow mt-10 ml-8 flex-col">
                <div className="flex mt-2">
                  <div className="w-[15px] h-[18px] bg-red-500 bg-opacity-30" />
                  <div className="ml-2 font-semibold leading-none text-neutral-500">
                    Replace with
                  </div>
                </div>
                <div className="flex mt-2 ml-6">recommends spending,</div>
                <div className="flex justify-end items-center p-3">
                  <button className="btn normal-case border border-gray-500">
                    Ignore
                  </button>
                  <button className="btn normal-case border border-gray-500 ml-2 bg-prd-grad-from text-white">
                    Replace
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default WritingAssistant;
