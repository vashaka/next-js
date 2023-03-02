import React, { useEffect, useState, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import Login from "../components/Login";
import { AppContext } from "../context/appContext";
import axios from "axios";
import Link from "next/link";
import gamePic from "../data/gamePic.png";
import ab from "../data/Asset 12.png";
import Logo from "../data/Asset 2.png";
import stick from "../data/Asset 7.png";
import logo from "../data/Asset 13.png";

const inter = Inter({ subsets: ["latin"] });

const supabase = createClient(
  "https://lqydutonbpotkxpmzlyq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeWR1dG9uYnBvdGt4cG16bHlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0NjA5NzQsImV4cCI6MTk5MjAzNjk3NH0.st-luSXU6Xo0rzm69y8eLXI-Z8Sb-jEntO19PU5415Y"
);

export default function Home() {
  const {
    openAuth,
    setOpenAuth,
    user,
    setUser,
    mongodbUser,
    setMongodbUser,
    userId,
    setUserId,
  }: any = useContext(AppContext);

  // const [user, setUser] = useState<any>();

  const router = useRouter();

  function signoutUser() {
    // axios
    //   .post("http://localhost:3001/deleteUser", {
    //     user: mongodbUser,
    //   })
    //   .then(() => {
    //     window.location.reload();
    //   });
    const { error } = supabase.auth
      .signOut()
      .then(() => {
        setUser(null);
        localStorage.removeItem("ddd");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (user) {
      axios
        .post("http://localhost:3001/postUser", {
          user: user,
        })
        .then((resp) => {
          localStorage.setItem("user", resp.data._id);
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  }, [user]);
  return (
    <>
      {/* <div className=""> */}
      <div className="md:mx-12 md:mr-[100px]">
        <div className="border-2 bg-gradient-to-r mt-[20px] from-[#0F0114] to-[#30093A] rounded-[2.5rem] relative z-10 h-[270px] w-full">
          <div className="w-[240px] mx-8 pt-8">
            <Image
              src={ab}
              alt="image"
              className=""
              width={100}
              height={0}
              layout="responsive"
              placeholder="blur"
            />
            <Image
              src={Logo}
              alt="image"
              className="pt-8"
              width={100}
              height={0}
              layout="responsive"
              placeholder="blur"
            />
          </div>
          <div className="mx-2 w-[10px] absolute top-0 pt-4 left-[20rem]">
            <Image
              src={stick}
              alt="image"
              className=""
              width={100}
              height={0}
              layout="responsive"
              placeholder="blur"
            />
          </div>
          <div className="w-full lg:w-[70%] relative mt-[-220px] h-[245px] overflow-hidden">
            <div className="ml-[25rem] mx-2 absolute top-0 pt-4 max-w-[950px] min-w-[200px] h-auto">
              <h2 className="text-sm lg:text-lg 2xl:text-2xl">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
                in hendrerit in{" "}
              </h2>
            </div>
          </div>
          <div className="w-[240px] mx-8 pt-3 right-0 absolute top-0 hidden lg:flex">
            <Image
              src={logo}
              alt="image"
              className=""
              width={100}
              height={0}
              layout="responsive"
              placeholder="blur"
            />
          </div>
        </div>
        {openAuth && <Login />}
      </div>
      {/* </div>
{/* 
      {/* <div className="md:grid md:grid-cols-2 w-full z-50">
        <div className="px-7 md:px-6 py-2 text-center md:text-left">
          {user ? (
            <h2>Welcome - {user?.user_metadata?.full_name}</h2>
          ) : (
            <h2>Sign Up Now To Win Daily Prizes</h2>
          )}
          <h2>PLAY TO EARN GREAT PRIZES</h2>
          <p className="text-[#828f9a] mt-1 text-md">
            Unique games with cash withdrawal <br /> and an RNG certificate
          </p>
          <p className="text-[#828f9a] mt-10">
            DAILY FREE SPIN, RAKEBACK AND LOTS MORE
          </p>
          {!user ? (
            <button onClick={() => setOpenAuth(true)} className="btn-green">
              SIGN UP IN ONE CLICK
            </button>
          ) : (
            <button onClick={signoutUser} className="btn-green">
              LOG OUT
            </button>
            // <button className="btn-green">CONTACT US ON DISCORD</button>
          )}
        </div>
        <div>
          <picture className="flex justify-center">
            <img
              src="https://csgobooks.com/wp-content/uploads/play2x.png"
              alt="image"
              className="w-[90%] h-[90%]"
            />
          </picture>
        </div>
        {openAuth && <Login />}
        <div className="px-7 md:px-6">
          <h4 className="mt-6 font-bold flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mx-2 mt-[0.1rem]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>
            Play Our Original Games
          </h4>
          <div>
            <div
              onClick={() => (window.location = "/case")}
              className="mt-6 relative hover:cursor-pointer w-[200px] hover:opacity-30 bg-gray-600 rounded-xl p-4"
            >
              {!openAuth && (
                <Image
                  src={gamePic}
                  alt="image"
                  className="rounded-2xl object-cover aspect-square max-w-[200px]"
                  width={500}
                  height={500}
                  layout="responsive"
                  placeholder="blur"
                />
              )}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
