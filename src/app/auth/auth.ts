'use server';

import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { AuthResult, User } from '../types';
import { createNewUser, findExistingUser } from '../database/prismaQuries';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('WARNING: JWT_SECRET not set in environment variables!');
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const existingUser = await findExistingUser(email);

    if (existingUser) {
      return { success: false, message: 'Користувач з такою електронною адресою вже існує' };
    }

    const hashedPassword = await hashPassword(password);

    const user = await createNewUser(name, email, hashedPassword);

    if (!user) {
      return { success: false, message: 'Не вдалося створити користувача' };
    }

    const token = sign({ userId: user.id, email: user.email, name: user.name }, JWT_SECRET!, {
      expiresIn: '7d',
    });

    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'strict',
    });

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, message: 'Помилка при створенні користувача' };
  }
}

export async function loginUser(email: string, password: string): Promise<AuthResult> {
  try {
    const user = await findExistingUser(email);

    if (!user) {
      return { success: false, message: 'Невірна електронна адреса або пароль' };
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return { success: false, message: 'Невірна електронна адреса або пароль' };
    }

    const token = sign({ userId: user.id, email: user.email, name: user.name }, JWT_SECRET!, {
      expiresIn: '7d',
    });

    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'strict',
    });

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  } catch (error) {
    console.error('Error logging in user:', error);
    return { success: false, message: 'Помилка при вході в систему' };
  }
}

export async function logoutUser() {
  cookies().delete('token');
  return { success: true };
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = cookies().get('token')?.value;

    if (!token) {
      return null;
    }

    try {
      const decoded = verify(token, JWT_SECRET!) as {
        userId: string;
        email: string;
        name: string;
      };

      return {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (verifyError) {
      console.error('Token verification failed:', verifyError);
      cookies().delete('token');
      return null;
    }
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}
