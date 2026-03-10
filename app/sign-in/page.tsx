"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // creating the function for the handle submit of the form to check for the error :-
  async function handleSubmit(e: React.FormEvent) {
    // to prevent from the refreshing of the page whenever submit the form.
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
      });
      if (result.error) {
        setError(result.error.message ?? "Failed to sign in");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Unexpected error");
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-2xl border border-gray-200 rounded-2xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
          <CardDescription className="text-gray-500">
            Sign In to your existing account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? "Getting Your Account...." : "Sign In"}

            </Button>

            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="text-indigo-600 hover:underline font-medium"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
