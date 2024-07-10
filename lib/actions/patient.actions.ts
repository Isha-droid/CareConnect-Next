import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";



export const createUser = async (user: CreateUserParams) => {
    try {
        // Attempt to create the user using Appwrite API
        // Replace with your actual user creation logic with Appwrite
        const createdUser = await users.create(ID.unique(),user.email, user.phone, undefined, user.name);

    
        return createdUser; // Return the created user object
    } catch (error: any) {
        if (error && error.code === 409) {
            // Handle conflict (e.g., duplicate email error)
            try {
                // List existing users with the same email
                const existingUsers = await users.list([
                    Query.equal("email", user.email),
                ]);
                
                // Return the first existing user found
                return existingUsers.users[0];
            } catch (listError) {
                console.error("Error listing existing users:", listError);
                throw listError; // Throw listError for further handling
            }
        } else {
            console.error("Error creating user:", error);
            throw error; // Throw original error for further handling
        }
    }
};
