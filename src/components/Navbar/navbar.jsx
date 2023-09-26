"use client";
import Image from "next/image";
import MSP_Logo from "resources/Maistudypal_logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

const NavBar = () => {
  const router = useRouter();
  const [userData, setUserData] = useState();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      console.log("session: ", session);

      if (session) {
        const { data: users, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id);
        if (users) setUserData(users[0]);
      }
    };
    getUserData();
  }, []);

  const onLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <nav className="navbar bg-base-100 pt-5 shadow fixed top-0 z-50">
      <div className="navbar-center">
        <div className="dropdown lg:pr-24">
          <label tabIndex={0} className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <summary>Tools</summary>
              <ul className="p-2">
                <li>
                  <Link href="/summarizer">AI Summarizer</Link>
                </li>
                <li>
                  <Link href="/wassistant">AI Writing Assistant</Link>
                </li>
                <li>
                  <Link href="/chatbot">AI Chatbot</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/faqs">FAQs</Link>
            </li>
            <li>
              <Link href="/help">Help</Link>
            </li>
            <li>
              <Link href="/subscription">Subscription</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="pr-10">
          <Image src={MSP_Logo} alt="Logo" />
        </Link>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li tabIndex={0}>
            <details>
              <summary>Tools</summary>
              <ul className="p-2">
                <li>
                  <Link href="/summarizer">AI Summarizer</Link>
                </li>
                <li>
                  <Link href="/wassistant">AI Writing Assistant</Link>
                </li>
                <li>
                  <Link href="/chatbot">AI Chatbot</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link href="/faqs">FAQs</Link>
          </li>
          <li>
            <Link href="/help">Help</Link>
          </li>
          <li>
            <Link href="/subscription">Subscription</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end"></div>
      <div className="navbar-end gap-2.5 hidden md:flex lg:pr-24">
        {console.log("userData: ", userData)}
        {!userData ? (
          <>
            <div
              className="btn btn-sm border-gray-300 bg-white font-normal normal-case"
              onClick={() => router.push("/signin")}
            >
              Sign In
            </div>
            <div
              className="btn btn-sm bg-purple-500 text-white font-normal normal-case hover:bg-purple-900"
              onClick={() => router.push("/signup")}
            >
              Sign up for free
            </div>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost rounded-btn normal-case"
            >
              {userData.username}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0003 13.172L16.9503 8.222L18.3643 9.636L12.0003 16L5.63626 9.636L7.05126 8.222L12.0013 13.172L12.0003 13.172Z"
                  fill="black"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4 text-black font-medium"
            >
              <li>
                <Link href="#">Profile</Link>
              </li>
              <li>
                <div onClick={onLogout} className="hover:cursor-pointer">Log out</div>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="navbar-end sm:hidden">
        <summary></summary>
      </div>
    </nav>
  );
};

export default NavBar;
