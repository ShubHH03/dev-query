import env from "@/src/app/env";

import { Client, Account, Avatars, Storage, TablesDB } from "appwrite";

const client = new Client()
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId); // Your project ID

const tablesDB= new TablesDB(client);
const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);

export { client, tablesDB, account, storage, avatars };
