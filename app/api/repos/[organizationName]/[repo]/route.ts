import { cache, singleRepo } from "@/app/services/functions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : any) {
  try {
    const { organizationName, repo } = params;

    if (!organizationName || !repo) {
      return NextResponse.json({
        success: false,
        message: "Organization name || repoName is missing",
      });
    }

    const singleRepoData = await cache(
      singleRepo,
      `${organizationName}_${repo}`,
      3,
      organizationName,
      repo
    );

    if (!singleRepoData) {
      return NextResponse.json({
        success: false,
        message: `Repo ${repo} not found`,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Repo ${repo} fetched successfully`,
      singleRepo: singleRepoData,
    });
  } catch (error) {
    console.error("Error while fetching single repo", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error occured while getting the single repo",
      },
      {
        status: 500,
      }
    );
  }
}
