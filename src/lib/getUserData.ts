import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { DecodedUserData } from "@/types";

const secretKey = process.env.JWT_SECRET;

export async function redirectIfAuthenticated() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token || !secretKey) return;

  redirect("/"); // Already logged in → go home
}

export async function getAuthenticatedUser() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token || !secretKey) {
    redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, secretKey) as DecodedUserData;
    return decoded;
  } catch (err) {
    console.log(err);
    redirect("/login");
  }
}
