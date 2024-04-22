"use server";
import React from "react";
import Image from "next/image";
import { Price } from "@/app/components/Price";
import { connectDB } from "@/utils/mongoose";
import { ProductType } from "@/utils/types";
import Product from "@/models/product.model";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default async function productsComponent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  await connectDB();
  let products: ProductType[] = [];
  if (searchParams.cat) {
    const data = await Product.find({
      category: searchParams.cat,
    });
    products = JSON.parse(JSON.stringify(data));
  } else {
    const data = await Product.find();
    products = JSON.parse(JSON.stringify(data));
  }

  return (
    <>
      <div className="bg-gradient-to-b from-slate-500 h-[300px] w-full fixed top-0 -z-10"></div>
      <div className="bg-gradient-to-t from-slate-500 h-[300px] w-full fixed bottom-0 -z-10"></div>
      <h1 className="text-center text-4xl font-semibold mt-10 font-hero text-white">
        {" "}
        {searchParams.cat
          ? searchParams.cat.toString().toUpperCase()
          : "All Products"}
      </h1>
      <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-2 gap-y-20">
        {products
          .sort((a, b) =>
            (b.category as string).localeCompare(a.category as string)
          )
          .map((product) => (
            <div
              key={product._id as string}
              className="flex flex-col rounded-xl mt-5"
            >
              {(
                <div className="relative h-[400px] max-w-screen-md">
                  <Image
                    src={product.imgUrl as string}
                    alt={"hero photo"}
                    fill
                    className="rounded-xl object-contain"
                  />
                </div>
              ) || (
                <div className="flex items-center justify-center">
                  <Image
                    src={"/imageimage.png"}
                    alt={"image"}
                    width={600}
                    height={500}
                  />
                </div>
              )}
              <div className="flex flex-col justify-center max-w-screen-md">
                <div className="flex flex-col items-center">
                  <h1 className="text-4xl font-hero font-bold">
                    {product.name || <Skeleton width={200} />}
                  </h1>
                  <p className="mt-5  mx-10  max-w-lg text-center font-candara">
                    {product.description || (
                      <Skeleton width={400} height={30} />
                    )}
                  </p>
                </div>
                <div className="flex flex-col items-center lg:items-center justify-center p-10 lg:ml-10">
                  {<Price product={product} /> || (
                    <Skeleton
                      style={{ margin: "10px" }}
                      width={400}
                      height={30}
                      count={4}
                    />
                  )}
                  <div className="mt-5"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
