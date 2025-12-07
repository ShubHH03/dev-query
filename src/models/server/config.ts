import env from "@/src/app/env";
import {Client, Avatars, TablesDB, Storage, Users} from "node-appwrite";

let client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apiKey) // Your secret API key
;

const tablesDB= new TablesDB(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const users = new Users(client);

export { client, tablesDB, storage, avatars, users};
