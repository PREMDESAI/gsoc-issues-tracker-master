import { cache, singleRepoAllIssues } from "@/app/services/functions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : any) {
  try {
    const { organizationName, repo } = params;
    console.log(params);

    if (!organizationName || !repo) {
      return NextResponse.json({
        success: false,
        message: "Organization name or  repositoryName is missing",
      });
    }

    const repoAllIssuesData = await cache(
      singleRepoAllIssues,
      `${organizationName}_${repo}_issues`,
      3,
      organizationName,
      repo
    );

    if (!repoAllIssuesData) {
      return NextResponse.json({
        success: false,
        message: `No issues found for ${repo}`,
      });
    }

    return NextResponse.json({
      success: true,
      message: `All issues of ${repo} fetched successfully`,
      Allissues: repoAllIssuesData,
    });
  } catch (error) {
    console.error(
      "Error while fetching all issues of a single repository",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Error occured while getting all the issues",
      },
      {
        status: 500,
      }
    );
  }
}
