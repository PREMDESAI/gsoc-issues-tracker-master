"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function OrgDetails() {
  const { orgName } = useParams();
  const [orgRepos, setOrgRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("OrgName from URL:", orgName);

    const fetchOrgRepos = async () => {
      if (!orgName) {
        console.error("Organization name is undefined");
        return;
      }

      try {
        const response = await fetch(`/api/repos/${orgName}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrgRepos(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrgRepos();
  }, [orgName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{orgName}</h1>
      <ul>
        {orgRepos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}
