import { db } from "../name";
import { tablesDB } from "./config";
import createAnswerCollection from "./answer.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import createCommentCollection from "./comments.collection";

export default async function getOrCreateDB() {
  try {
    await tablesDB.get({ databaseId: db });
    console.log("Database connected");
  } catch (error) {
    try {
      await tablesDB.create({ databaseId: db, name: db });
      console.log("Database created");

      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createVoteCollection(),
        createCommentCollection(),
      ]);
      console.log("All collections created");
      console.log("Database connected");
    } catch (error) {
      console.error("Error creating database or collections:", error);
    }
  }

  return tablesDB;
}
