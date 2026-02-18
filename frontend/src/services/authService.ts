import {
  confirmSignIn,
  getCurrentUser,
  signIn,
  signInWithRedirect,
  signOut,
} from "aws-amplify/auth";
import type { AuthUser } from "aws-amplify/auth";

export async function loginWithCredentials(email: string, password: string) {
  return signIn({ username: email, password });
}

export async function loginWithGoogle() {
  return signInWithRedirect({ provider: { custom: "Google" } });
}

export async function loginWithLinkedIn() {
  return signInWithRedirect({ provider: { custom: "LinkedIn" } });
}

export async function completeNewPassword(
  newPassword: string,
  userAttributes?: Record<string, string>,
) {
  return confirmSignIn({
    challengeResponse: newPassword,
    options: userAttributes ? { userAttributes } : undefined,
  });
}

export async function logout() {
  return signOut();
}

export async function checkCurrentUser(): Promise<AuthUser | null> {
  try {
    return await getCurrentUser();
  } catch {
    return null;
  }
}
