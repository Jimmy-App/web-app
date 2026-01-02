"use server";

export type AuthActionState = {
  error?: string;
};

const authDisabledMessage = "Authentication is temporarily disabled.";

export async function signInAction(
  _prevState: AuthActionState,
  _formData: FormData,
): Promise<AuthActionState> {
  return { error: authDisabledMessage };
}

export async function signUpAction(
  _prevState: AuthActionState,
  _formData: FormData,
): Promise<AuthActionState> {
  return { error: authDisabledMessage };
}

export async function signInWithGoogle() {
  return;
}

export async function signOutAction() {
  return;
}
