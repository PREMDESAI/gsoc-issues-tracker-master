import Link from "next/link";
import React from "react";
import { BiEnvelope } from "react-icons/bi";

type BannerProps = {
  image: string;
  name: any;
  website: string;
  followers: number;
  email: string;
  repos: number;
};

const Banner = ({
  image,
  name,
  website,
  followers,
  email,
  repos,
}: BannerProps) => {
  return (
    <div className="relative p-6 mb-6 rounded-lg bg-[#c849d0] text-white">
      <div className="flex justify-around items-center gap-8">
        <div className="flex flex-col gap-2 w-1/2">
          <h1 className="text-4xl font-bold">{name}</h1>
          {website === "No website found!!" ? (
            <p className="text-lg text-white">No website found!!</p>
          ) : (
            <Link href={website} target="_blank" className=" no-underline">
              <p className="text-lg text-white transition-all duration-200 hover:text-black ">
                {website}
              </p>
            </Link>
          )}

          <p className="text-lg">Followers: {followers}</p>
          <div className="flex gap-4">
            <Link href={`mailto:${email}`} className=" no-underline">
              <p className="flex items-center text-lg text-white transition-all duration-200 hover:text-black">
                <BiEnvelope className="text-2xl mr-2" />
                Email
              </p>
            </Link>
          </div>
        </div>
        <div>
          <img
            src={image}
            alt={`${name} logo`}
            loading="lazy"
            className="h-24 w-24 object-contain"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 text-2xl font-bold">
        Issues found in {repos} repositories
      </div>
    </div>
  );
};

export default Banner;
