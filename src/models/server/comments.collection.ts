import { tablesDB } from "./config";
import { db, commentCollection } from "../name";
import { Permission } from "node-appwrite";

export default async function createCommentCollection() {
  // create collection
  await tablesDB.createTable({
    databaseId: db,
    tableId: commentCollection,
    name: commentCollection,
    permissions: [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
  });
  console.log("Comment collection created");

  // create attributes
  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: commentCollection,
      key: "content",
      size: 10000,
      required: true,
    }),
    tablesDB.createEnumColumn({
      databaseId: db,
      tableId: commentCollection,
      key: "type",
      elements: ["question", "answer"],
      required: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: commentCollection,
      key: "authorId",
      size: 50,
      required: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: commentCollection,
      key: "typeId",
      size: 50,
      required: true,
    }),
  ]);
  console.log("Comment attributes created");
}
