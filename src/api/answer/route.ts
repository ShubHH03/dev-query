import { tablesDB, users } from "@/src/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { UserPrefs } from "@/src/store/Auth";
import { answerCollection } from "@/src/models/name";
import { ID } from "node-appwrite";
import { db } from "@/src/models/name";

export async function POST(request: NextRequest) {
  try {
    const { questionId, answer, authorId } = await request.json();

    const response = await tablesDB.createRow({
      databaseId: db,
      tableId: answerCollection,
      rowId: ID.unique(),
      data: {
        content: answer,
        authorId: authorId,
        questionId: questionId,
      },
    });

    // Increase author reputation
    const prefs = await users.getPrefs<UserPrefs>(authorId);
    await users.updatePrefs({
      userId: authorId,
      prefs: { reputation: Number(prefs.reputation) + 1 },
    });

    return NextResponse.json(response, {
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error creating answer",
      },
      { status: error?.status || error?.code || 500 }
    );
  }
}
