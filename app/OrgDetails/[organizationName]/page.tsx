"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import Banner from "@/app/components/Banner";
import RepoCard from "@/app/components/RepoCard";

export default function OrgDetails() {
  const organizationName = useParams().organizationName;
  const [orgRepos, setOrgRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [orgImage, setOrgImage] = useState<string | any>(null);
  const [year, setYear] = useState<string | any>(null);
  const [ownerDetails, setOwnerDetails] = useState<any>(null);
  const [newOwnerDetails, setnewOwnerDetails] = useState<any>(null);

  useEffect(() => {
    const fetchOrgRepos = async () => {
      try {
        const response = await fetch(`/api/repos/${organizationName}`);

        const newResponse = await fetch(
          `https://api.github.com/users/${organizationName}`
        );
        if (!response.ok || !newResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const newData = await newResponse.json();
        setOwnerDetails(data.repos[0].owner);
        setnewOwnerDetails(newData);

        setOrgImage(data.repos[0].owner.avatar_url);

        setOrgRepos(data.repos);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrgRepos();
  }, [organizationName]);

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-2 justify-center mt-[20%]">
        <div className="spinner"></div>
        <div>Loading....</div>
      </div>
    );
  }

  const reposWithOpenIssues = orgRepos.filter(
    (repo) => repo.open_issues_count > 0
  );

  return newOwnerDetails === null ? (
    <div className="grid col-span-3">
      <div className="flex flex-col items-center gap-2 justify-center mt-[20%]">
        <p className="text-2xl">No information available</p>
        <p className="text-lg">
          Please add proper github username of organization in parameter
        </p>
      </div>
    </div>
  ) : (
    <div>
      <Banner
        image={orgImage}
        name={organizationName}
        website={newOwnerDetails.blog ?? "No website found!!"}
        followers={newOwnerDetails.followers}
        email={newOwnerDetails.email}
        repos={reposWithOpenIssues.length}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {orgRepos.length !== 0 &&
          reposWithOpenIssues.map((repo) => (
            <div key={repo.id}>
              <RepoCard
                name={repo.name}
                description={repo.description}
                link={`/OrgDetails/${organizationName}/${repo.name}/issues`}
                issues={repo.open_issues_count}
                createdAt={repo.created_at}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
