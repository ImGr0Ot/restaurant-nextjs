import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";

export default function Loading() {
  return (
    <>
      <div className="bg-gradient-to-b from-slate-500 h-[300px] w-full fixed top-0 -z-10"></div>
      <div className="bg-gradient-to-t from-slate-500 h-[300px] w-full fixed bottom-0 -z-10"></div>
      <h1 className="text-center text-4xl font-semibold mt-10 font-hero text-white">
        Loading Products
      </h1>
      <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-2 gap-y-20">
        {[Array(20).keys()].map((i) => (
          <div key={i + " "} className="flex flex-col rounded-xl mt-5">
            <div className="flex items-center justify-center">
              <Image
                src={"/imageimage.png"}
                alt={"image"}
                width={600}
                height={500}
              />
            </div>

            <div className="flex flex-col justify-center max-w-screen-md">
              <div className="flex flex-col items-center">
                <h1 className="text-4xl font-hero font-bold">
                  <Skeleton width={200} />
                </h1>
                <p className="mt-5  mx-10  max-w-lg text-center font-candara">
                  <Skeleton width={400} height={30} />
                </p>
              </div>
              <div className="flex flex-col items-center lg:items-center justify-center p-10 lg:ml-10">
                <Skeleton
                  style={{ margin: "10px" }}
                  width={400}
                  height={30}
                  count={4}
                />

                <div className="mt-5"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
