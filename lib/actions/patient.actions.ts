import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { UserRoundIcon } from "lucide-react";



export const createUser = async (user: CreateUserParams) => {
    try {
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

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId); // Assuming users is your Appwrite service instance
        console.log(user); // Logging the retrieved user data
        return user; // Returning the user object
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error; // Rethrow the error or handle as needed in your application
    }
};