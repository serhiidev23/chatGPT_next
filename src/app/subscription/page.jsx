'use client';
import {Navbar as Header} from "components/Navbar";
import Footer from "components/Footer";
import paymentlayer from "resources/paymentlayer.svg";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import axios from 'axios';
import { useState, useEffect } from 'react'

const SubscriptionPage = () => {
  const { push } = useRouter();
  const supabase = createClientComponentClient()
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function getProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
  
      const { data: prof, error } = await supabase
        .from('users')
        .select(`subscription,customer_id,release_date`)
        .eq('id', user?.id)
        .single()

      setProfile(prof);
    }

    getProfile();
  }, [])

  const handleClickFree = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('users')
      .update({ subscription: 'Free' })
      .eq('id', user.id)

    if (!error) {
      push('/');
    }
  }

  const handleClickPremium = async () => {
    const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/session`, { 
      priceId: 'price_1NXcr5BAT8lPXLzYceJo2NLq',
      organizationId: null,
      customerId: profile?.customer_id,
      returnUrl: process.env.NEXT_PUBLIC_BASE_URL
    });
    // window.location.href = data.url;
  }

  const handleClickClose = async () => {
    const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/portal`, { 
      customerId: profile?.customer_id,
      returnUrl: process.env.NEXT_PUBLIC_BASE_URL + '/subscription'
    });
    // window.location.href = data.url;
  }

  return (
    <>
      <Header />
      <main>
        <div className="hero min-h-screen py-40 mt-20 bg-base-150">
          <div className="hero-content text-center">
            <div className="max-w-full">
              <div className="lg:text-6xl font-bold text-black">
                AI Tools for You.{" "}
                <span className="lg:text-6xl font-bold pt-5 bg-gradient-to-b text-transparent bg-clip-text from-prd-grad-from to-prd-grad-to">
                  Hours to Seconds
                </span>
              </div>
              <div className="mt-6 lg:text-3xl font-medium text-black">
                Keeps you ahead, saves your time and effort!
              </div>
              <div className="mt-20 relative flex justify-center items-center overflow-hidden">
                <Image
                  className="w-full"
                  src={paymentlayer}
                  alt="Payment Layer"
                />
                <div className="absolute top-0">
                  <svg
                    width="1511"
                    height="1510"
                    viewBox="0 0 1511 1510"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="755.5"
                      cy="755"
                      rx="755.5"
                      ry="755"
                      fill="url(#paint0_linear_42_130)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_42_130"
                        x1="755.5"
                        y1="0"
                        x2="755.5"
                        y2="3362.79"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="absolute grid grid-cols-2 space-x-5">
                  <div className="card w-96 h-[33.25rem] max-w-sm mx-auto bg-white shadow-lg text-primary-content">
                    <div className="card-body pl-15 flex justify-start items-start">
                      <h2 className="card-title text-black text-3xl font-semibold">
                        Free
                      </h2>
                      <div className="card-actions">
                        <div className="grid grid-rows-2 place-items-start">
                          <div className="mt-6 text-5xl font-extrabold text-black">
                            $0
                          </div>
                          <div className="text-gray-400 text-md">
                            get started with MaiStudyPal
                          </div>
                        </div>

                        <span className="flex">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                              fill="#D2D2D2"
                            />
                          </svg>
                          <p className="text-black text-md font-semibold pl-2">
                            One tool access/day
                          </p>
                        </span>
                        <span className="flex mt-3">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                              fill="#D2D2D2"
                            />
                          </svg>
                          <p className="text-black text-md font-semibold pl-2">
                            Available when demand is low
                          </p>
                        </span>
                        <span className="flex mt-3">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                              fill="#D2D2D2"
                            />
                          </svg>
                          <p className="text-black text-md font-semibold pl-2">
                            Limited Tool Usage
                          </p>
                        </span>
                      </div>
                    </div>

                    <div className="card-actions mb-14 justify-center">
                      <button className="btn normal-case w-64 justify-center border-gray-400" onClick={() => handleClickFree()}>
                        Get Started
                      </button>
                    </div>
                  </div>
                  <div className="card w-96 h-[33.25rem] max-w-sm mx-auto bg-white shadow-lg text-primary-content bg-gradient-to-b from-prd-sub-grad-from to-prd-sub-grad-to">
                    <div className="card-body pl-15">
                      <h2 className="card-title text-white text-3xl font-semibold">
                        Plus
                      </h2>
                      <div className="card-actions">
                        <div className="grid grid-rows-2 place-items-start">
                          <div className="mt-6 w-40 text-start text-5xl font-extrabold text-white">
                            $100
                          </div>
                          <div className="text-gray-200 text-md">
                            AUD per month
                          </div>
                        </div>

                        <span className="flex">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                              fill="#D2D2D2"
                            />
                          </svg>
                          <p className="text-white text-md font-semibold pl-2">
                            All Tools Access
                          </p>
                        </span>
                        <span className="flex mt-3">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                              fill="#D2D2D2"
                            />
                          </svg>
                          <p className="text-white text-md font-semibold pl-2">
                            Available when demand is high
                          </p>
                        </span>
                        <span className="flex mt-3">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                              fill="#D2D2D2"
                            />
                          </svg>
                          <p className="text-white text-md font-semibold pl-2">
                            Unlimited Tool Usage
                          </p>
                        </span>
                      </div>
                    </div>

                    <div className="card-actions mb-14 justify-center">
                      {!(profile && profile.subscription && profile.subscription != 'Free')&& !profile?.release_date && <button className="btn normal-case w-64 justify-center text-white border-gray-400 bg-prd-grad-from hover:bg-purple-800" onClick={() => handleClickPremium()}>
                        Buy Plus
                      </button>}
                      {profile && (profile.subscription || profile.release_date) && profile.subscription != 'Free' && <button className="btn normal-case w-64 justify-center text-white border-gray-400 bg-prd-grad-from hover:bg-purple-800" onClick={() => handleClickClose()}>
                        {!profile.subscription? 'Resume Subscription': 'Cancel Subscription' }
                      </button>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SubscriptionPage;
