import { IndexType, Permission } from "node-appwrite";

import { db, questionCollection } from "../name";
import { tablesDB } from "./config";

export default async function createQuestionCollection() {
  // create collection
  await tablesDB.createTable({
    databaseId: db,
    tableId: questionCollection,
    name: questionCollection,
    permissions: [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
  });
  console.log("Question collection created");

  // create attributes
  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: questionCollection,
      key: "title",
      size: 100,
      required: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: questionCollection,
      key: "content",
      size: 10000,
      required: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: questionCollection,
      key: "authorId",
      size: 50,
      required: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: questionCollection,
      key: "tags",
      size: 50,
      required: true,
      array: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: questionCollection,
      key: "attachmentId",
      size: 50,
      required: false,
    }),
  ]);
  console.log("Question Attributes created");

  // create indexes
  /*
  await Promise.all([
    tablesDB.createIndex({
      databaseId: db,
      tableId: questionCollection,
      key: "title",
      type: IndexType.Fulltext,
      columns: ["title"],
      orders: ["asc"],
    }),

    tablesDB.createIndex({
      databaseId: db,
      tableId: questionCollection,
      key: "content",
      type: IndexType.Fulltext,
      columns: ["content"],
      orders: ["asc"],
    }),
  ]);
  console.log("Question Indexes created");
  */
}
