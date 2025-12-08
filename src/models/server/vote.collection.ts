import { tablesDB } from "./config";
import { db, voteCollection } from "../name";
import { Permission } from "node-appwrite";

export default async function createVoteCollection() {
  // create collection
  await tablesDB.createTable({
    databaseId: db,
    tableId: voteCollection,
    name: voteCollection,
    permissions: [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
  });
  console.log("Vote collection created");

  // create attributes
  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: voteCollection,
      key: "typeId",
      size: 50,
      required: true,
    }),
    tablesDB.createStringColumn({
        databaseId: db,
        tableId: voteCollection,
        key: "votedById",
        size: 50,
        required: true,
    }),
    tablesDB.createEnumColumn({
        databaseId: db,
        tableId: voteCollection,
        key: "type",
        elements: ["question", "answer"],
        required: true,
    }),
    tablesDB.createEnumColumn({
        databaseId: db,
        tableId: voteCollection,
        key: "voteStatus",
        elements: ["upvoted", "downvoted"],
        required: true,
    }),

  ]);
  console.log("Vote attributes created");
}
