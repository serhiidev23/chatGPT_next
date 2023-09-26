"use client";
import Image from "next/image";
import MSP_Logo from "resources/footerlogo.svg";
import Navshowhide from "resources/navshowhide.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

const ToolHeader = (props) => {
  const router = useRouter();
  const [userData, setUserData] = useState();
  const supabase = createClientComponentClient();

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

  const onLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <nav className="navbar pt-5 shadow top-0 bg-[#513192] text-white flex justify-end">
        {props.show ? (
          <div className="navbar-start">
            <div className="inline-flex items-center justify-center">
              <div
                onClick={props.showHide}
                className="btn btn-outline btn-square ml-14 border border-white hover:bg-prd-grad-from"
              >
                <Image
                  className="w-7 h-7"
                  src={Navshowhide}
                  alt="Side Bar Show & Hide"
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {props.type !== "summarizer" && props.type !== "chatbot" ? (
          <div className="navbar-start">
            <div className="dropdown">
              <div className="flex justify-center items-center">
                <Image className="lg:ml-24" src={MSP_Logo} alt="Logo" />
                <label
                  htmlFor="my-drawer-2"
                  className="ml-6 drawer-button lg:hidden bg-[#513192] border-none link"
                >
                  <Image src={Navshowhide} alt="Side Bar Show & Hide" />
                </label>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Parent</a>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="navbar-center hidden lg:flex">
          <div className="dropdown dropdown-end px-1">
            <label
              tabIndex={0}
              className="btn m-1 hover:bg-[#513192] border border-none bg-[#513192] text-white normal-case"
            >
              {props.type === "wassistant" ? (
                <>
                  <svg
                    className="w-5 h-5 text-white fill-white rounded-none"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.0952 33.3333H33.3333M29.5238 12.381L31.4285 14.2857M32.3809 7.61905C32.7562 7.99421 33.0539 8.43963 33.257 8.92987C33.4601 9.4201 33.5646 9.94555 33.5646 10.4762C33.5646 11.0068 33.4601 11.5323 33.257 12.0225C33.0539 12.5127 32.7562 12.9582 32.3809 13.3333L14.2857 31.4286L6.66663 33.3333L8.57139 25.821L26.6742 7.62667C27.3878 6.90966 28.3448 6.48717 29.3554 6.44306C30.366 6.39895 31.3562 6.73646 32.1295 7.38857L32.3809 7.61905Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Writing Assistant
                </>
              ) : props.type === "chatbot" ? (
                <>
                  <svg
                    className="w-5 h-5 text-white rounded-none fill-white"
                    viewBox="0 0 40 40"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.9558 33.2471C15.1239 34.402 17.5435 35.0041 20.0001 35C28.2843 35 35.0001 28.2843 35.0001 20C35.0001 11.7157 28.2843 5 20.0001 5C11.7158 5 5.00005 11.7157 5.00005 20C5.00005 22.55 5.63577 24.9486 6.75577 27.0486C7.01708 27.5378 7.07853 28.1093 6.9272 28.6429L5.16434 34.8386L11.3615 33.0771C11.8949 32.9254 12.4664 32.9863 12.9558 33.2471ZM20.0001 37.1429C17.1917 37.1468 14.4256 36.4579 11.9472 35.1371L5.13291 37.0757C4.82702 37.1626 4.50347 37.1662 4.1957 37.0862C3.88793 37.0062 3.60711 36.8455 3.38225 36.6207C3.1574 36.3958 2.99666 36.115 2.91666 35.8072C2.83666 35.4994 2.8403 35.1759 2.9272 34.87L4.86434 28.0557C3.54261 25.5765 2.85317 22.8095 2.8572 20C2.8572 10.5329 10.5329 2.85715 20.0001 2.85715C29.4672 2.85715 37.1429 10.5329 37.1429 20C37.1429 29.4671 29.4672 37.1429 20.0001 37.1429ZM13.5715 16.7857C13.5715 16.5016 13.6844 16.229 13.8853 16.0281C14.0862 15.8272 14.3587 15.7143 14.6429 15.7143H25.3572C25.6414 15.7143 25.9139 15.8272 26.1148 16.0281C26.3157 16.229 26.4286 16.5016 26.4286 16.7857C26.4286 17.0699 26.3157 17.3424 26.1148 17.5433C25.9139 17.7443 25.6414 17.8571 25.3572 17.8571H14.6429C14.3587 17.8571 14.0862 17.7443 13.8853 17.5433C13.6844 17.3424 13.5715 17.0699 13.5715 16.7857ZM13.5715 23.2143C13.5715 22.9301 13.6844 22.6576 13.8853 22.4567C14.0862 22.2557 14.3587 22.1429 14.6429 22.1429H21.0715C21.3556 22.1429 21.6282 22.2557 21.8291 22.4567C22.03 22.6576 22.1429 22.9301 22.1429 23.2143C22.1429 23.4984 22.03 23.771 21.8291 23.9719C21.6282 24.1728 21.3556 24.2857 21.0715 24.2857H14.6429C14.3587 24.2857 14.0862 24.1728 13.8853 23.9719C13.6844 23.771 13.5715 23.4984 13.5715 23.2143Z"
                      fill="white"
                    />
                  </svg>
                  AI ChatBot
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 text-white dark:text-white rounded-none"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"
                    />
                  </svg>
                  AI Summarizer
                </>
              )}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0003 13.172L16.9503 8.222L18.3643 9.636L12.0003 16L5.63626 9.636L7.05126 8.222L12.0013 13.172L12.0003 13.172Z"
                  fill="white"
                />
              </svg>
            </label>
            <ul className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4 text-black font-medium">
              {props.type === "wassistant" ? (
                <>
                  <li>
                    <Link href="/summarizer">
                      {" "}
                      <svg
                        className="w-5 h-5 text-black dark:text-black rounded-none"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2"
                          d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"
                        />
                      </svg>
                      AI Summarizer
                    </Link>
                  </li>
                  <li>
                    <Link href="/chatbot">
                      <svg
                        className="w-5 h-5 text-black rounded-none fill-black"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.9558 33.2471C15.1239 34.402 17.5435 35.0041 20.0001 35C28.2843 35 35.0001 28.2843 35.0001 20C35.0001 11.7157 28.2843 5 20.0001 5C11.7158 5 5.00005 11.7157 5.00005 20C5.00005 22.55 5.63577 24.9486 6.75577 27.0486C7.01708 27.5378 7.07853 28.1093 6.9272 28.6429L5.16434 34.8386L11.3615 33.0771C11.8949 32.9254 12.4664 32.9863 12.9558 33.2471ZM20.0001 37.1429C17.1917 37.1468 14.4256 36.4579 11.9472 35.1371L5.13291 37.0757C4.82702 37.1626 4.50347 37.1662 4.1957 37.0862C3.88793 37.0062 3.60711 36.8455 3.38225 36.6207C3.1574 36.3958 2.99666 36.115 2.91666 35.8072C2.83666 35.4994 2.8403 35.1759 2.9272 34.87L4.86434 28.0557C3.54261 25.5765 2.85317 22.8095 2.8572 20C2.8572 10.5329 10.5329 2.85715 20.0001 2.85715C29.4672 2.85715 37.1429 10.5329 37.1429 20C37.1429 29.4671 29.4672 37.1429 20.0001 37.1429ZM13.5715 16.7857C13.5715 16.5016 13.6844 16.229 13.8853 16.0281C14.0862 15.8272 14.3587 15.7143 14.6429 15.7143H25.3572C25.6414 15.7143 25.9139 15.8272 26.1148 16.0281C26.3157 16.229 26.4286 16.5016 26.4286 16.7857C26.4286 17.0699 26.3157 17.3424 26.1148 17.5433C25.9139 17.7443 25.6414 17.8571 25.3572 17.8571H14.6429C14.3587 17.8571 14.0862 17.7443 13.8853 17.5433C13.6844 17.3424 13.5715 17.0699 13.5715 16.7857ZM13.5715 23.2143C13.5715 22.9301 13.6844 22.6576 13.8853 22.4567C14.0862 22.2557 14.3587 22.1429 14.6429 22.1429H21.0715C21.3556 22.1429 21.6282 22.2557 21.8291 22.4567C22.03 22.6576 22.1429 22.9301 22.1429 23.2143C22.1429 23.4984 22.03 23.771 21.8291 23.9719C21.6282 24.1728 21.3556 24.2857 21.0715 24.2857H14.6429C14.3587 24.2857 14.0862 24.1728 13.8853 23.9719C13.6844 23.771 13.5715 23.4984 13.5715 23.2143Z"
                          fill="black"
                        />
                      </svg>
                      AI ChatBot
                    </Link>
                  </li>
                </>
              ) : props.type === "chatbot" ? (
                <>
                  <li>
                    <Link href="/summarizer">
                      {" "}
                      <svg
                        className="w-5 h-5 text-black dark:text-black rounded-none"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2"
                          d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"
                        />
                      </svg>
                      AI Summarizer
                    </Link>
                  </li>
                  <li>
                    <Link href="/wassistant">
                      {" "}
                      <svg
                        className="w-5 h-5 text-black fill-black rounded-none"
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
                      Writing Assistant
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/wassistant">
                      {" "}
                      <svg
                        className="w-5 h-5 text-black fill-black rounded-none"
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
                      Writing Assistant
                    </Link>
                  </li>

                  <li>
                    <Link href="/chatbot">
                      <svg
                        className="w-5 h-5 text-black rounded-none fill-black"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.9558 33.2471C15.1239 34.402 17.5435 35.0041 20.0001 35C28.2843 35 35.0001 28.2843 35.0001 20C35.0001 11.7157 28.2843 5 20.0001 5C11.7158 5 5.00005 11.7157 5.00005 20C5.00005 22.55 5.63577 24.9486 6.75577 27.0486C7.01708 27.5378 7.07853 28.1093 6.9272 28.6429L5.16434 34.8386L11.3615 33.0771C11.8949 32.9254 12.4664 32.9863 12.9558 33.2471ZM20.0001 37.1429C17.1917 37.1468 14.4256 36.4579 11.9472 35.1371L5.13291 37.0757C4.82702 37.1626 4.50347 37.1662 4.1957 37.0862C3.88793 37.0062 3.60711 36.8455 3.38225 36.6207C3.1574 36.3958 2.99666 36.115 2.91666 35.8072C2.83666 35.4994 2.8403 35.1759 2.9272 34.87L4.86434 28.0557C3.54261 25.5765 2.85317 22.8095 2.8572 20C2.8572 10.5329 10.5329 2.85715 20.0001 2.85715C29.4672 2.85715 37.1429 10.5329 37.1429 20C37.1429 29.4671 29.4672 37.1429 20.0001 37.1429ZM13.5715 16.7857C13.5715 16.5016 13.6844 16.229 13.8853 16.0281C14.0862 15.8272 14.3587 15.7143 14.6429 15.7143H25.3572C25.6414 15.7143 25.9139 15.8272 26.1148 16.0281C26.3157 16.229 26.4286 16.5016 26.4286 16.7857C26.4286 17.0699 26.3157 17.3424 26.1148 17.5433C25.9139 17.7443 25.6414 17.8571 25.3572 17.8571H14.6429C14.3587 17.8571 14.0862 17.7443 13.8853 17.5433C13.6844 17.3424 13.5715 17.0699 13.5715 16.7857ZM13.5715 23.2143C13.5715 22.9301 13.6844 22.6576 13.8853 22.4567C14.0862 22.2557 14.3587 22.1429 14.6429 22.1429H21.0715C21.3556 22.1429 21.6282 22.2557 21.8291 22.4567C22.03 22.6576 22.1429 22.9301 22.1429 23.2143C22.1429 23.4984 22.03 23.771 21.8291 23.9719C21.6282 24.1728 21.3556 24.2857 21.0715 24.2857H14.6429C14.3587 24.2857 14.0862 24.1728 13.8853 23.9719C13.6844 23.771 13.5715 23.4984 13.5715 23.2143Z"
                          fill="black"
                        />
                      </svg>
                      AI ChatBot
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-end lg:mr-24">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.27148 18.346C4.27148 18.346 6.50048 15.5 12.0005 15.5C17.5005 15.5 19.7305 18.346 19.7305 18.346M12.0005 12C12.7961 12 13.5592 11.6839 14.1218 11.1213C14.6844 10.5587 15.0005 9.79565 15.0005 9C15.0005 8.20435 14.6844 7.44129 14.1218 6.87868C13.5592 6.31607 12.7961 6 12.0005 6C11.2048 6 10.4418 6.31607 9.87916 6.87868C9.31655 7.44129 9.00048 8.20435 9.00048 9C9.00048 9.79565 9.31655 10.5587 9.87916 11.1213C10.4418 11.6839 11.2048 12 12.0005 12Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost rounded-btn normal-case"
            >
              {userData?.username}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0003 13.172L16.9503 8.222L18.3643 9.636L12.0003 16L5.63626 9.636L7.05126 8.222L12.0013 13.172L12.0003 13.172Z"
                  fill="white"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4 text-black font-medium"
            >
              <li>
                <Link href="#">Item 1</Link>
              </li>
              <li>
                <div onClick={onLogout}>Log out</div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ToolHeader;
