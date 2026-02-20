import {
  checkCurrentUser,
  completeNewPassword,
  loginWithCredentials,
  logout,
} from "@/services/authService";

vi.mock("aws-amplify/auth", () => ({
  signIn: vi.fn().mockResolvedValue({ isSignedIn: true }),
  signOut: vi.fn().mockResolvedValue(undefined),
  getCurrentUser: vi
    .fn()
    .mockResolvedValue({ userId: "amplify-user", username: "real@user.com" }),
  signInWithRedirect: vi.fn(),
  confirmSignIn: vi.fn().mockResolvedValue({ isSignedIn: true }),
}));

describe("authService", () => {
  describe("loginWithCredentials", () => {
    it("calls Amplify signIn with username and password", async () => {
      const { signIn } = await import("aws-amplify/auth");
      await loginWithCredentials("user@example.com", "RealPassword1!");
      expect(signIn).toHaveBeenCalledWith({
        username: "user@example.com",
        password: "RealPassword1!",
      });
    });
  });

  describe("checkCurrentUser", () => {
    it("returns Amplify user", async () => {
      const user = await checkCurrentUser();
      expect(user).toEqual({
        userId: "amplify-user",
        username: "real@user.com",
      });
    });

    it("returns null when getCurrentUser throws", async () => {
      const { getCurrentUser } = await import("aws-amplify/auth");
      vi.mocked(getCurrentUser).mockRejectedValueOnce(
        new Error("not signed in"),
      );
      const user = await checkCurrentUser();
      expect(user).toBeNull();
    });
  });

  describe("completeNewPassword", () => {
    it("calls confirmSignIn with new password", async () => {
      const { confirmSignIn } = await import("aws-amplify/auth");
      await completeNewPassword("NewPassword1!");
      expect(confirmSignIn).toHaveBeenCalledWith({
        challengeResponse: "NewPassword1!",
        options: undefined,
      });
    });

    it("forwards userAttributes when provided", async () => {
      const { confirmSignIn } = await import("aws-amplify/auth");
      await completeNewPassword("NewPassword1!", { name: "John" });
      expect(confirmSignIn).toHaveBeenCalledWith({
        challengeResponse: "NewPassword1!",
        options: { userAttributes: { name: "John" } },
      });
    });
  });

  describe("logout", () => {
    it("calls Amplify signOut", async () => {
      const { signOut } = await import("aws-amplify/auth");
      await logout();
      expect(signOut).toHaveBeenCalled();
    });
  });
});
