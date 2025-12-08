import { storage } from "./config";
import { questionAttachmentBucket } from "../name";
import { Permission } from "node-appwrite";

export default async function getOrCreateStorage() {
    try {
        await storage.getBucket({
            bucketId: questionAttachmentBucket
        });
        console.log("Storage connected");
    } catch (error) {
        try {
            await storage.createBucket({
                bucketId: questionAttachmentBucket,
                name: questionAttachmentBucket,
                permissions: [
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.create("users"),
                    Permission.update("users"),
                    Permission.delete("users"),
                ],
                fileSecurity: false,
                maximumFileSize: undefined,
                compression: undefined,
                allowedFileExtensions: ["jpg", "png", "jpeg", "gif", "webp", "heic"]
            });
            console.log("Storage bucket created");
            console.log("Storage connected");
        } catch (error) {
            console.error("Error creating storage bucket:", error);
        }
    }
}