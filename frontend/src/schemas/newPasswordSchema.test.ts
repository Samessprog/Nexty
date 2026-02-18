import { newPasswordSchema } from "@/schemas/newPasswordSchema";

describe("newPasswordSchema", () => {
  it("accepts valid matching passwords", () => {
    const result = newPasswordSchema.safeParse({
      newPassword: "StrongP@ss1",
      confirmPassword: "StrongP@ss1",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty new password", () => {
    const result = newPasswordSchema.safeParse({
      newPassword: "",
      confirmPassword: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.issues.find((i) =>
        i.path.includes("newPassword"),
      );
      expect(error?.message).toBe("newPassword.errors.required");
    }
  });

  it("rejects empty confirm password", () => {
    const result = newPasswordSchema.safeParse({
      newPassword: "StrongP@ss1",
      confirmPassword: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.issues.find((i) =>
        i.path.includes("confirmPassword"),
      );
      expect(error?.message).toBe("newPassword.errors.confirmRequired");
    }
  });

  it("rejects password shorter than 8 characters", () => {
    const result = newPasswordSchema.safeParse({
      newPassword: "Aa1!",
      confirmPassword: "Aa1!",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.issues.find((i) =>
        i.path.includes("newPassword"),
      );
      expect(error?.message).toBe("newPassword.errors.minLength");
    }
  });

  it("rejects password missing uppercase letter", () => {
    const result = newPasswordSchema.safeParse({
      newPassword: "weakpass1!",
      confirmPassword: "weakpass1!",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.issues.find((i) =>
        i.path.includes("newPassword"),
      );
      expect(error?.message).toBe("newPassword.errors.uppercase");
    }
  });

  it("rejects password missing lowercase letter", () => {
    const result = newPasswordSchema.safeParse({
      newPassword: "WEAKPASS1!",
      confirmPassword: "WEAKPASS1!",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.issues.find((i) =>
        i.path.includes("newPassword"),
      );
      expect(error?.message).toBe("newPassword.errors.lowercase");
    }
  });

  it("rejects password missing number", () => {
    const result = newPasswordSchema.safeParse({
      newPassword: "WeakPass!a",
      confirmPassword: "WeakPass!a",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.issues.find((i) =>
        i.path.includes("newPassword"),
      );
      expect(error?.message).toBe("newPassword.errors.number");
    }
  });

  it("rejects password missing special character", () => {
    const result = newPasswordSchema.safeParse({
      newPassword: "WeakPass1a",
      confirmPassword: "WeakPass1a",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.issues.find((i) =>
        i.path.includes("newPassword"),
      );
      expect(error?.message).toBe("newPassword.errors.special");
    }
  });

  it("rejects mismatched passwords", () => {
    const result = newPasswordSchema.safeParse({
      newPassword: "StrongP@ss1",
      confirmPassword: "StrongP@ss2",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.issues.find((i) =>
        i.path.includes("confirmPassword"),
      );
      expect(error?.message).toBe("newPassword.errors.mismatch");
    }
  });
});
