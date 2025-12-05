import env from "@/src/app/env";

import { Client, Account, Avatars, Databases, Storage } from "appwrite";

const client = new Client()
        .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId); // Your project ID


