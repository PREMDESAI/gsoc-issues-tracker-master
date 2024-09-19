import toast from "react-hot-toast";
import { apiConnector } from "../utils/apiConnector";
import client from "./redisClient";
import { NextResponse } from "next/server";

// Caching function
interface FetchFunction {
  (...args: any[]): Promise<any>;
}

export async function cache(
  url: FetchFunction,
  key: string,
  retryCount: number,
  ...args: any[]
) {
  try {
    if (!client.isOpen) {
      await client.connect();
    }

    // Check if the data is available in redis
    const cachedData = await client.get(key);

    if (cachedData) {
      console.log("Cached data from redis");
      return JSON.parse(cachedData);
    }

    // If data is not available in redis
    const data = await url(...args);

    // Store the data in redis for future extraction
    await client.set(key, JSON.stringify(data));

    // Optionally, you can add expiration logic in your custom redis client
    // For example, using setTimeout to set expiration after a certain time
    setTimeout(() => {
      client.del(key); // Remove key after expiration time
    }, 7200 * 1000); // 7200 seconds = 2 hours

    return data;
  } catch (error: any) {
    console.error("Error while caching the data", error);

    if (retryCount > 0 && error.response && error.response.status === 403) {
      // Rate limit error
      // Implement exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * (4 - retryCount))
      );
      return cache(url, key, retryCount - 1, ...args);
    }
    throw error;
  } finally {
    if (client.isOpen) {
      await client.disconnect();
    }
  }
}

// Getting all the organizations
export async function getAllOrganizations(year: string) {
  if (!year) {
    return NextResponse.json({
      success: false,
      message: "Please enter year for getting the GSOC organizations",
    });
  }

  const response = await apiConnector(
    "GET",
    `${process.env.ALL_ORGANIZATIONS_API}${year}.json`,
    null,
    null,
    null
  );

  if (!response) {
    return NextResponse.json({
      success: false,
      message: "No organizations found for this year",
    });
  }

  return response.data;
}

// Getting the repos of 1 organization
export async function organizationRepos(name: string) {
  if (!name) {
    return NextResponse.json({
      success: false,
      message: "Enter organization name to get the repos",
    });
  }

  const response = await apiConnector(
    "GET",
    `${process.env.ORGANIZATION_REPO_API}${name}/repos`,
    null,
    null,
    null
  );

  if (!response) {
    return NextResponse.json({
      success: false,
      message:
        "No repos found for this organization. Please check the name of the organization",
    });
  }

  return response.data;
}

export async function singleRepo(orgName: string, repoName: string) {
  if (!repoName || !orgName) {
    return NextResponse.json({
      success: false,
      message: "Repo name as well as Organization name is required",
    });
  }

  const response = await apiConnector(
    "GET",
    `${process.env.GET_SINGLE_REPO_API}${orgName}/${repoName}`,
    null,
    null,
    null
  );

  if (!response) {
    return NextResponse.json({
      success: false,
      message: "Organization name or repo name is wrong. Please check it",
    });
  }

  return response.data;
}

export async function singleRepoAllIssues(orgName: string, repoName: string) {
  if (!repoName || !orgName) {
    return NextResponse.json({
      success: false,
      message: "Repo name && Organization name is required",
    });
  }

  const response = await apiConnector(
    "GET",
    `${process.env.SINGLE_REPO_ALL_ISSUES_API}${orgName}/${repoName}/issues`,
    null,
    null,
    null
  );

  if (!response) {
    return NextResponse.json({
      success: false,
      message: "Organization name || repo name is wrong. Please check it",
    });
  }

  return response.data;
}
