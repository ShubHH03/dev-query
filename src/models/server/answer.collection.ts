import { db, answerCollection } from "../name";
import { Permission } from "node-appwrite";
import { tablesDB } from "./config";

export default async function createAnswerCollection() {
  // create collection
  await tablesDB.createTable({
    databaseId: db,
    tableId: answerCollection,
    name: answerCollection,
    permissions: [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
  });
  console.log("Answer collection created");

  // create attributes
  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: answerCollection,
      key: "content",
      size: 10000,
      required: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: answerCollection,
      key: "questionId",
      size: 50,
      required: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: answerCollection,
      key: "authorId",
      size: 50,
      required: true,
    }),
  ]);
  console.log("Answer attributes created");
}
