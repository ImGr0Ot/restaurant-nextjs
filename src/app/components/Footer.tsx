import React from "react";
import Link from "next/link";
import Image from "next/image";
const Footer = () => {
  return (
    <div className="bottom-0 z-10 flex items-center justify-center w-full text-white mt-16">
      <div className="flex">
        © 2024&nbsp;
        <Link href="/" className="hover:underline">
          Gr00t Enterprise™.
        </Link>
        <Link className="relative bottom-6" href={"/"}>
          <Image
            className="cursor-pointer"
            src={"/logo.png"}
            width={100}
            height={100}
            alt="logo"
          />
        </Link>
        All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
