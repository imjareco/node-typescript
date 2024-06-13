import { User } from "../../models/index.js";

export async function createUser(userId) {
    const userDoc = new User(userId);
    return await userDoc.save();
}