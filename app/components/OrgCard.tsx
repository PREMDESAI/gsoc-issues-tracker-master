import React from "react";
import Chip from "./Chip";
import Link from "next/link";

const OrgCard = ({ org }: any) => {
  const extractOrgNameFromUrl = (url: string) => {

    if(url === "https://home.unicode.org"){
      return "unicode";
    }
    else if(url === "https://mesa.readthedocs.io/en/latest/"){
      return "projectmesa";
    }
    else if(url === "https://github.com/RocketChat"){
      return "rocketchat";
    }
    else if (url === "https://github.com/ankidroid/Anki-Android"){
      return "ankidroid";
    }
    else {
      // Remove the protocol (http, https) and 'www' if present
      let cleanUrl = url.replace(/(^\w+:|^)\/\//, "").replace("www.", "");
  
      // Remove any trailing slashes
      cleanUrl = cleanUrl.replace(/\/$/, "");
  
      // Extract the name before the domain extension
      const name = cleanUrl.split(".")[0];
  
      return name;
    };
    
    }


  return (
    <div className="bg-white border-2 border-double border-gray-600 shadow-lg rounded-lg p-4 h-full flex flex-col">
      <div className="flex justify-center items-center mb-4">
        <img
          src={org.image_url}
          alt={org.name}
          className="h-24 w-24 object-contain"
          loading="lazy"
        />
      </div>

      <div className="text-center flex-1">
        <h2 className="text-xl font-semibold text-gray-800">{org.name}</h2>
        <p className="text-gray-600 mt-2 line-clamp-3">{org.description}</p>
      </div>

      <div className="mt-2">
        <h3 className="text-lg font-semibold text-gray-800">Category</h3>
        <p className="text-gray-600">{org.category}</p>
      </div>

      <div className="mt-2">
        <h3 className="text-lg font-semibold text-gray-800">Technologies</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {org.technologies.map((technology: string, index: number) => (
            <Chip key={index} data={technology} color="#090979" />
          ))}
        </div>
      </div>

      <div className="mt-2">
        <h3 className="text-lg font-semibold text-gray-800">Topics</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {org.topics.map((topic: string, index: number) => (
            <Chip key={index} data={topic} color="#FFD60A" />
          ))}
        </div>
      </div>

      <div className="mt-4 text-center">
        <Link href={`/OrgDetails/${extractOrgNameFromUrl(org.url)}`}>
          <p className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transition duration-200 cursor-pointer">
            View Details
          </p>
        </Link>
      </div>
    </div>
  );
};

export default OrgCard;
