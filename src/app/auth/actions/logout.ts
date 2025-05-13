'use server';

import { logoutUser } from '../auth';

export async function logout() {
  return logoutUser();
}
