'use server';

import { createUser } from "../auth";
import { AuthResult } from "@/app/types";

export async function register(formData: FormData): Promise<AuthResult> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!name || !email || !password || !confirmPassword) {
    return { success: false, message: "Всі поля є обов'язковими" };
  }

  if (password !== confirmPassword) {
    return { success: false, message: 'Паролі не співпадають' };
  }

  if (password.length < 6) {
    return { success: false, message: 'Пароль повинен містити щонайменше 6 символів' };
  }

  return createUser(name, email, password) as Promise<AuthResult>;
}
