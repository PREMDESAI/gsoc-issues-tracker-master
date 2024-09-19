import { cache, getAllOrganizations } from "@/app/services/functions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : any) {
  try {
    const { year } = params

    if (!year) {
      return NextResponse.json({
        success: false,
        message: "Enter year to get the organizations",
      });
    }

    const organizationsData = await cache(
      getAllOrganizations,
      `${year}`,
      3,
      year
    );

    if (!organizationsData) {
      return NextResponse.json({
        success: false,
        message: `No organizations found for ${year}`,
      });
    }

    return NextResponse.json({
      success: true,
      message: "All organizations fetched successfully",
      allOrganizations: organizationsData.organizations,
    });
  } catch (error) {
    console.error("Error while fetching all organizations", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error while fetching organizations",
      },
      { status: 500 }
    );
  }
}
