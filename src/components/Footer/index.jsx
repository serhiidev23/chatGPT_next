"use client";
import Image from "next/image";
import footerlogo from "resources/footerlogo.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

const Footer = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

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

  return (
    <>
      <footer className="footer p-10 bg-[#1C1D1F] text-[#CAC7C7] flex justify-center">
        <div className="lg:grid lg:grid-rows-1">
          <Image src={footerlogo} alt="Logo" />
          <div className="space-x-12 lg:grid lg:grid-cols-4 lg:gap-x-20 2xl:gap-x-48 lg:space-x-0 flex-grow place-items-start">
            <div className="mt-6 lg:grid lg:grid-rows-2 lg:gap-x-16">
              <span className="footer-title">MAISTUDYPAL</span>
              <Link href="/about" className="link link-hover">
                About
              </Link>
              <Link href="/subscription" className="link link-hover">
                Subscription
              </Link>
            </div>
            <div className="mt-6 lg:grid lg:grid-rows-3 lg:gap-x-16 lg:space-y-0">
              <span className="footer-title">TOOLS</span>
              <Link href="/summarizer" className="link link-hover">
                AI summarizer
              </Link>
              <Link href="/wassistant" className="link link-hover">
                AI Writing Assistant
              </Link>
              <Link href="/chatbot" className="link link-hover">
                AI Chatbot
              </Link>
            </div>
            <div className="mt-6 lg:grid lg:grid-rows-2 lg:gap-x-16 lg:space-y-0">
              <span className="footer-title">SUPPORT</span>
              <Link href="/help" className="link link-hover">
                Help
              </Link>
              <Link href="#" className="link link-hover">
                Contact Us
              </Link>
            </div>
            <div className="mt-6 grid grid-rows-2 lg:gap-x-16 lg:space-y-0">
              <span className="footer-title">SUPERCHARGE PRODUCTIVITY</span>
              {!userData ? (
                <div className="space-x-5">
                  <button
                    onClick={() => router.push("/signin")}
                    className="btn btn-sm border-gray-300 bg-[#1C1D1F] text-[#CAC7C7] font-normal normal-case hover:bg-gray-800"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => router.push("/signup")}
                    className="btn btn-sm bg-purple-500 text-white font-normal normal-case hover:bg-purple-900"
                  >
                    Sign up for free
                  </button>
                </div>
              ) : (
                <div>Current Membership Plan : {userData.plan}</div>
              )}
            </div>
          </div>
        </div>
      </footer>
      <footer className="footer px-10 py-4 border-t bg-[#1C1D1F] border-base-300 text-[#CAC7C7]">
        <div className="grid-flow-col">
          <p>© 2023 MaiStudyPal. All rights reserved</p>
        </div>
        <div className="md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <p>Terms and Conditions • Privacy Policy</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
