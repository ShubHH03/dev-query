import { tablesDB } from "@/src/models/server/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {

    // grab vote data
    const {votedById, voteStatus, typeId,type } = await request.json();

    // const response = await tablesDB.

  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || "Error in voting",
      },
      { status: error?.status || error?.code || 500 }
    );
  }
}
