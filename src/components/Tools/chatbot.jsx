"use client";
import { ToolHeader } from "components/Navbar";
import Image from "next/image";
import MSP_Logo from "resources/footerlogo.svg";
import Navshowhide from "resources/navshowhide.svg";
import { useEffect, useState, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import HistoryItem from "components/Items/HistoryItem";
import ChatbotItem from "components/Items/chatbotchatitem";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const ChatBot = ({ uid }) => {
  const supabase = createClientComponentClient();
  const [showhide, setShowhide] = useState(false);
  const [session, setSession] = useState();
  const [history, setHistory] = useState();
  const [messages, setMessages] = useState([]);
  const [uuid, setUUid] = useState();
  const router = useRouter();
  const promptRef = useRef();

  const onKeyPressed = (e) => {
    if (e.keyCode === 13) {
      getResponse();
    }
  };
  const handleSend = () => {
    getResponse();
  };
  const newConversation = () => {
    router.push(`${window.origin}/chatbot`);
  };

  const showHide = () => {
    setShowhide(!showhide);
  };

  const saveToDB = async (result, _uuid) => {
    const { data, error } = await supabase
      .from("chatbot")
      .update({
        chat_data: JSON.stringify(result)
      })
      .eq("id", _uuid)
      .select()
      .single();
    if (error) return false;
    return true;
  };

  const getResponse = async () => {
    const prt = promptRef.current.value;
    if (prt) {
      promptRef.current.value = "";
      const newObj = { isAI: false, content: prt };
      const _uuid_ = uuidv4();
      if (messages.length === 0) {
        if (!uuid) setUUid(_uuid_);
        setHistory([...history, {isActive: true, id: '', title: prt, gotoLink: null}])
        await supabase.from("chatbot").insert({
          id: _uuid_.toString(),
          user_id: session.user.id,
          chat_data: JSON.stringify(newObj),
          title: prt,
        });
      }
      setMessages([...messages, newObj]);
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/openai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prt }),
      })
        .then((res) => res.json())
        .then((data) => {
          const answer = { isAI: true, content: data.message };
          const result = [...messages, newObj, answer];
          setMessages(result);
          if (uid) saveToDB(result, uid);
          else saveToDB(result, _uuid_);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    const getData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (session) {
        setSession(session);
        const { data, error } = await supabase
          .from("chatbot")
          .select("*")
          .eq("user_id", session.user.id);
        if (data) setHistory(data);
        if (uid) {
          setUUid(uid);
          const { data, error } = await supabase
            .from("chatbot")
            .select("*")
            .eq("id", uid);
          if (data) setMessages(JSON.parse(data[0].chat_data));
        }
      }
    };
    getData();
  }, []);

  const gotoLink = (_uuid_) => {
    router.push(`${window.origin}/chatbot/${_uuid_}`)
  };

  return (
    <>
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
            onClick={newConversation}
            className="btn normal-case ml-10 mt-5 w-4/5 bg-[#513192] text-white hover:bg-prd-grad-from"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 14V11M12 11V8M12 11H9M12 11H15M7.124 18.701L5.6 19.921C4.767 20.586 4.351 20.919 4.001 20.919C3.85061 20.9192 3.70211 20.8856 3.56654 20.8205C3.43098 20.7554 3.31184 20.6605 3.218 20.543C3 20.27 3 19.737 3 18.671V7.201C3 6.081 3 5.52 3.218 5.091C3.41 4.715 3.715 4.41 4.092 4.218C4.52 4 5.08 4 6.2 4H17.8C18.92 4 19.48 4 19.908 4.218C20.2843 4.40974 20.5903 4.71569 20.782 5.092C21 5.519 21 6.079 21 7.197V14.804C21 15.921 21 16.48 20.782 16.908C20.5903 17.2843 20.2843 17.5903 19.908 17.782C19.481 18 18.922 18 17.804 18H9.123C8.707 18 8.498 18 8.299 18.04C8.12271 18.0766 7.95217 18.1368 7.792 18.219C7.612 18.311 7.45 18.44 7.127 18.699L7.124 18.701Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            New Conversation
          </label>
          {/* pdf list */}
          <div className="mt-7 ml-10">Previous Chats</div>
          <div className="flex flex-col mt-4 ml-10 space-y-2 justify-start h-fit overflow-y-auto">
            {history?.slice().reverse().map((value) => (
              <HistoryItem
                isActive={value.id === uuid}
                key={value.id}
                id={value.id}
                name={value.title}
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
            <div onClick={() => router.push('/')} className="mt-4 inline-flex justify-center items-center btn normal-case bg-[#513192] hover:bg-prd-grad-from border-none text-white">
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
            <div onClick={() => router.push('/subscription')} className="mt-4 inline-flex justify-center items-center btn normal-case bg-[#513192] hover:bg-prd-grad-from border-none text-white">
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
            type="chatbot"
            id="navbar-summarizer"
          />
          {/* <!-- Main Content Area --> */}
          <main className="flex bg-gray-100 flex-1">
            {/* main content */}
            <div className="w-full flex-1 bg-gray-100 p-6 relative flex flex-col justify-center items-center">
              {/* <!-- Main content goes here --> */}
              {messages.length < 1 ? (
                <div className="w-full h-full flex justify-center items-center">
                  <div className="inline-flex justify-center flex-col items-center">
                    <label className="relative px-4 py-2 text-white rounded-md cursor-pointer border-white border hover:border-prd-grad-from"></label>
                    <div className="text-2xl font-bold mt-10">
                      Ask me anything!
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-[75vh] overflow-y-auto">
                  {messages.map((value) => (
                    <ChatbotItem key={Math.random()} isAI={value.isAI} content={value.content} />
                  ))}
                </div>
              )}

              <div className="w-full h-28 flex justify-center items-center">
                <div className="absolute bottom-10 w-8/12 h-10 rounded-xl bg-white flex justify-center items-center">
                  <input
                    type="text"
                    placeholder="Send Message"
                    className="input w-full h-full pr-15 resize-none text-lg"
                    rows={1}
                    ref={promptRef}
                    onKeyDown={onKeyPressed}
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
          </main>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
