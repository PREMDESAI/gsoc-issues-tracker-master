import Link from "next/link";
import React from "react";

type RepoCardProps = {
  name: string;
  description: string;
  link: string;
  issues: number;
  createdAt: string;
};

const RepoCard = ({
  name,
  description,
  link,
  issues,
  createdAt,
}: RepoCardProps) => {
  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex-grow">
        <p className="text-gray-500 text-sm mb-2">
          Created At: {createdAt.split("T")[0]}
        </p>

        <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>

        <p className="text-gray-700 mb-4">{description}</p>

        <p className="text-gray-700 font-medium mb-4">Open Issues: {issues}</p>
      </div>

      <div className="flex justify-center mt-4">
        <Link href={link} className="no-underline">
          <p className="inline-block px-6 py-3 text-blue-500 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out shadow-md">
            View All Unassigned
          </p>
        </Link>
      </div>
    </div>
  );
};

export default RepoCard;
