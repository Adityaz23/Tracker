import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initializeUserBoard } from "../init-user-board";

// creating client for the adapters ->
const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();

export const auth = betterAuth({
  //...
  database: mongodbAdapter(db, { client }),
  //   setting the authentication :-
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.id) {
            await initializeUserBoard(user.id);
          }
        },
      },
    },
  },
});

// New handler for the navbar :-
export async function getSession() {
  const result = await auth.api.getSession({
    // passing the header :-
    // Allow to read the HTTP incoming request :-
    headers: await headers(),
  });
  return result;
}

// Function for signout :-
export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });
  if (result.success) {
    redirect("/sign-in");
  }
}
