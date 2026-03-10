import { createAuthClient } from "better-auth/react";

// This is for the signup and signin page because these both pages are the client side :-
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});
export const { signIn, signUp, signOut, useSession } = authClient;
