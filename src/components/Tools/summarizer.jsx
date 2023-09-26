"use client";
import { ToolHeader } from "components/Navbar";
import MSP_Logo from "resources/footerlogo.svg";
import Image from "next/image";
import Navshowhide from "resources/navshowhide.svg";
import Uploadpdf from "resources/uploadpdf.svg";
import { useRef, useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";
import ChatItem from "components/Items/ChatItem";
import { useRouter } from "next/navigation";
import HistoryItem from "components/Items/HistoryItem";
// import PDFViewer from "./pdfviewer";

const getData = async () => {
  const supabase = createClientComponentClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (session) {
    const { data, error } = await supabase
      .from("summarizer")
      .select("*")
      .eq("user_id", session.user.id);
    if (data) return { data: data, session: session };
  }
};

const Summarizer = ({ uid }) => {
  const supabase = createClientComponentClient();
  const [onProcessing, setOnProcessing] = useState();
  const [history, setHistory] = useState();
  const [session, setSession] = useState();
  const [messages, setMessages] = useState([]);
  const [uuid, setUUid] = useState();
  const [showhide, setShowhide] = useState(false);
  const fileRef = useRef();
  const newFileRef = useRef();
  const promptRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const getMessage = async () => {
      const histories = await getData();
      if (histories) {
        setHistory(histories.data);
        setSession(histories.session);
      }
      if (uid) {
        setUUid(uid);
        const { data, error } = await supabase
          .from("summarizer")
          .select("*")
          .eq("id", uid);
        if (data?.length > 0) setMessages(JSON.parse(data[0]?.chat_data));
      }
    };
    getMessage();
  }, []);

  const uploadPdftoSup = async (userId, file) => {
    return await supabase.storage
      .from("docs")
      .upload(`${userId}/pdf/${file.name}`, file, {
        cacheControl: "3600",
        upsert: true,
      });
  };

  const fileProcessing = async (file) => {
    setOnProcessing(true);
    await uploadPdftoSup(session?.user.id, file);
    const _uuid_ = uuidv4();
    const formData = new FormData();
    formData.append("file", file);
    formData.append('uuid', _uuid_);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (data) => {
        setOnProcessing(false);
        const result =
          `Hey there, \n\nYou uploaded a document named ${file.name}. Following is the summary of the PDF:\n` +
          data.answer;
        setMessages([{ isAI: true, content: result }]);
        setUUid(_uuid_);
        await supabase.from("summarizer").insert({
          id: _uuid_.toString(),
          summary_result: data.answer,
          chat_data: JSON.stringify([{ isAI: true, content: result }]),
          pdf_name: file.name,
          user_id: session.user.id,
        });
        enqueueSnackbar("Successfully Processed!", { variant: "success" });
        router.push(`/summarizer/${_uuid_}`);
      })
      .catch((err) => {
        setOnProcessing(false);
        enqueueSnackbar(err, { variant: "error" });
      });
  }

  const onNewFileSelected = async () => {
    const file = newFileRef.current?.files[0];
    if (!file) return;
    fileProcessing(file);
  }

  const onFileSelected = async () => {
    const file = fileRef.current?.files[0];
    if (!file) return;
    fileProcessing(file);
  };

  const saveToDB = async (result) => {
    const { data, error } = await supabase
      .from("summarizer")
      .update({
        chat_data: JSON.stringify(result),
      })
      .eq("id", uuid)
      .select()
      .single();
    if (error) return false;
    return true;
  };

  const getAnswer = () => {
    const prt = promptRef.current.value;
    if (prt) {
      promptRef.current.value = "";
      const newObj = { isAI: false, content: prt };
      setMessages([...messages, newObj]);
      const uu = uid ? uid : uuid;
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prt, uuid: uu }),
      })
        .then((res) => res.json())
        .then((data) => {
          const answer = { isAI: true, content: data.answer };
          const result = [...messages, newObj, answer];
          setMessages(result);
          saveToDB(result);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      getAnswer();
    }
  };

  const handleSend = () => {
    getAnswer();
  };
  const gotoLink = (_uuid_) => {
    router.push(`${window.origin}/summarizer/${_uuid_}`)
  };

  const showHide = () => {
    setShowhide(!showhide);
  };

  return (
    <>
      <SnackbarProvider
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        autoHideDuration={3000}
      />
      <div className="relative">
        <div className="flex h-screen">
          {/* Sidebar Header */}
          <div
            hidden={showhide}
            className="text-white w-[21.31rem] bg-[#513192] pr-2"
          >
            <div className="inline-flex items-center justify-center mt-6 ml-10">
              <Image src={MSP_Logo} alt="Logo" />
              <div
                onClick={showHide}
                className="btn btn-outline btn-square ml-14 border border-white hover:bg-prd-grad-from"
              >
                <Image
                  className="w-7 h-7"
                  src={Navshowhide}
                  alt="Side Bar Show & Hide"
                />
              </div>
            </div>
            {/* upload pdf button */}
            <label
              htmlFor="inputFile"
              className="btn normal-case ml-10 mt-5 w-4/5 bg-[#513192] text-white hover:bg-prd-grad-from"
            >
              <svg
                width="18"
                height="22"
                viewBox="0 0 18 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 21H2C1.44771 21 1 20.5523 1 20V2C1 1.44772 1.44771 1 2 1H16C16.5523 1 17 1.44772 17 2V11"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.75 21V14.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.5 16.25L13.25 15.5L14.75 14L16.25 15.5L17 16.25"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 7.00003H13"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M5 11H9"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Upload New PDF
              <input
                id="inputFile"
                type="file"
                hidden
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={onNewFileSelected}
                ref={newFileRef}
                accept=".pdf"
              />
            </label>
            {/* pdf list */}
            <div className="mt-7 ml-10">Previous Uploads</div>
            <div className="flex flex-col mt-4 ml-10 space-y-2 justify-start h-fit overflow-y-auto">
              {history?.slice().reverse().map((value) => (
                <HistoryItem
                  isActive={value.id === uuid}
                  key={value.id}
                  id={value.id}
                  name={value.pdf_name}
                  gotoLink={() => gotoLink(value.id)}
                />
              ))}
            </div>
            {/* bottom nav */}
            <div className="flex justify-center ml-5 absolute bottom-4 flex-col items-start">
              <svg
                width="289"
                height="2"
                viewBox="0 0 289 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1H289" stroke="#F4F4F4" strokeWidth="2" />
              </svg>
              <div
                onClick={() => router.push("/")}
                className="mt-4 inline-flex justify-center items-center btn normal-case bg-[#513192] hover:bg-prd-grad-from border-none text-white"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.0001 10C20.0001 9.73481 19.8947 9.48046 19.7072 9.29292C19.5197 9.10539 19.2653 9.00003 19.0001 9.00003C18.7349 9.00003 18.4805 9.10539 18.293 9.29292C18.1054 9.48046 18.0001 9.73481 18.0001 10H20.0001ZM6.00008 10C6.00008 9.73481 5.89472 9.48046 5.70719 9.29292C5.51965 9.10539 5.2653 9.00003 5.00008 9.00003C4.73486 9.00003 4.48051 9.10539 4.29297 9.29292C4.10544 9.48046 4.00008 9.73481 4.00008 10H6.00008ZM20.2931 12.707C20.4817 12.8892 20.7343 12.99 20.9965 12.9877C21.2587 12.9854 21.5095 12.8803 21.6949 12.6948C21.8803 12.5094 21.9855 12.2586 21.9878 11.9964C21.99 11.7342 21.8892 11.4816 21.7071 11.293L20.2931 12.707ZM12.0001 3.00003L12.7071 2.29303C12.5196 2.10556 12.2652 2.00024 12.0001 2.00024C11.7349 2.00024 11.4806 2.10556 11.2931 2.29303L12.0001 3.00003ZM2.29308 11.293C2.19757 11.3853 2.12139 11.4956 2.06898 11.6176C2.01657 11.7396 1.98898 11.8709 1.98783 12.0036C1.98668 12.1364 2.01198 12.2681 2.06226 12.391C2.11254 12.5139 2.18679 12.6255 2.28069 12.7194C2.37458 12.8133 2.48623 12.8876 2.60913 12.9379C2.73202 12.9881 2.8637 13.0134 2.99648 13.0123C3.12926 13.0111 3.26048 12.9835 3.38249 12.9311C3.50449 12.8787 3.61483 12.8025 3.70708 12.707L2.29308 11.293ZM7.00008 22H17.0001V20H7.00008V22ZM20.0001 19V10H18.0001V19H20.0001ZM6.00008 19V10H4.00008V19H6.00008ZM21.7071 11.293L12.7071 2.29303L11.2931 3.70703L20.2931 12.707L21.7071 11.293ZM11.2931 2.29303L2.29308 11.293L3.70708 12.707L12.7071 3.70703L11.2931 2.29303ZM17.0001 22C17.7957 22 18.5588 21.684 19.1214 21.1214C19.684 20.5587 20.0001 19.7957 20.0001 19H18.0001C18.0001 19.2652 17.8947 19.5196 17.7072 19.7071C17.5197 19.8947 17.2653 20 17.0001 20V22ZM7.00008 20C6.73486 20 6.48051 19.8947 6.29297 19.7071C6.10544 19.5196 6.00008 19.2652 6.00008 19H4.00008C4.00008 19.7957 4.31615 20.5587 4.87876 21.1214C5.44137 21.684 6.20443 22 7.00008 22V20Z"
                    fill="white"
                  />
                </svg>
                <span>Go to Home</span>
              </div>
              <div className="mt-4 inline-flex justify-center items-center btn normal-case bg-[#513192] hover:bg-prd-grad-from border-none text-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.2858 18.0001L21.0858 19.2001L18.8572 16.9715V24.0001H17.1429V16.9715L14.9144 19.2001L13.7144 18.0001L18.0001 13.7144L22.2858 18.0001Z"
                    fill="white"
                  />
                  <path
                    d="M11.4858 24L2.5715 18.6857C2.05721 18.3429 1.71436 17.8286 1.71436 17.2286V6.77143C1.71436 6.17143 2.05721 5.57143 2.5715 5.31429L11.1429 0.257143C11.4001 0.0857142 11.6572 0 12.0001 0C12.3429 0 12.6001 0.0857142 12.8572 0.257143L21.4286 5.31429C21.9429 5.65714 22.2858 6.17143 22.2858 6.77143V12H20.5715V6.77143L12.0001 1.71429L3.42864 6.77143V17.2286L12.4286 22.5429L11.4858 24Z"
                    fill="white"
                  />
                </svg>

                <span>Upgrade to Plus</span>
              </div>
            </div>
          </div>

          {/* -- Main Content -- */}
          <div className="flex flex-col flex-1">
            <ToolHeader
              show={showhide}
              showHide={showHide}
              type="summarizer"
              id="navbar-summarizer"
            />
            {/* <!-- Main Content Area --> */}
            <main className="flex bg-gray-100 flex-1">
              {/* main content */}
              <div className="w-3/4 flex-1 bg-gray-100 p-6 relative flex flex-col">
                {/* <!-- Main content goes here --> */}
                {messages.length < 1 ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="inline-flex justify-center flex-col items-center">
                      <label
                        htmlFor="fileInput"
                        className="relative px-4 py-2 text-white rounded-md cursor-pointer border-white border hover:border-prd-grad-from"
                      >
                        <Image
                          className="hover:bg-none"
                          src={Uploadpdf}
                          alt="Pdt Upload"
                        />
                        <input
                          id="fileInput"
                          type="file"
                          hidden
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept=".pdf"
                          ref={fileRef}
                          onChange={onFileSelected}
                        />
                      </label>
                      <div className="text-2xl font-bold mt-10">
                        Click to Upload Your File
                      </div>
                      <div className="mt-2 text-neutral-400">
                        Please upload in .pdf format
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-[75vh] overflow-y-auto">
                    {messages?.map((value) => (
                      <ChatItem key={Math.random()} isAI={value.isAI} content={value.content} />
                    ))}
                  </div>
                )}

                <div className="w-full h-28 flex justify-center items-center">
                  <div className="absolute bottom-10 w-8/12 h-10 rounded-xl bg-white flex justify-center items-center">
                    <input
                      type="text"
                      placeholder="Ask Your Questions"
                      className="input w-full h-full pr-15 resize-none text-lg"
                      rows={1}
                      ref={promptRef}
                      onKeyDown={handleKeyDown}
                    />
                    <svg
                      className="mr-3 absolute right-1 hover:cursor-pointer"
                      onClick={handleSend}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_59_671)">
                        <path
                          d="M0 0L24 12L0 24V0ZM0 9.6V14.4L12 12L0 9.6Z"
                          fill="#D2D2D2"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_59_671">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
              {/* pdf viewer */}
              <div
                className="w-1/4 sidebar-shadow h-full border-none relative"
                hidden={false}
              >
                <div className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
                  ✕
                </div>
                <div className="overflow-scroll"></div>
              </div>
            </main>
          </div>
        </div>
        {onProcessing && (
          <div className="absolute flex flex-col justify-center items-center w-full h-screen left-0 top-0 bg-gray-900 bg-opacity-50">
            <span className="scale-150 loading loading-dots loading-lg text-white"></span>
            <span className="text-lg text-white">Please wait...</span>
          </div>
        )}
      </div>
    </>
  );
};
export default Summarizer;
