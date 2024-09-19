import { cache, organizationRepos } from "@/app/services/functions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : any) {
  try {
    const { organizationName } = params;

    if (!organizationName) {
      return NextResponse.json({
        success: false,
        message: "Enter the organization name for getting the repos",
      });
    }

    const reposData = await cache(
      organizationRepos,
      `${organizationName}`,
      3,
      organizationName
    );

    if (!reposData) {
      return NextResponse.json({
        success: false,
        message: "Check the organization name",
      });
    }

    return NextResponse.json({
      success: true,
      message: `All repos of ${organizationName} fetched successfully`,
      repos: reposData,
    });
  } catch (error) {
    console.error("Error while fetching the repos", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error occured while getting the repos",
      },
      {
        status: 500,
      }
    );
  }
}
