'use server';

import { loginUser } from "../auth";
import { AuthResult } from "@/app/types";


export async function login(formData: FormData): Promise<AuthResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, message: "Всі поля є обов'язковими" };
  }

  return loginUser(email, password) as Promise<AuthResult>;
}
