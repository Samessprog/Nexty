import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import {
  completeNewPassword,
  loginWithCredentials,
} from "@/services/authService";
import { acceptRegulations } from "@/services/regulationsService";

function mapCognitoError(error: unknown): string {
  const name = error instanceof Error ? error.name : "";
  switch (name) {
    case "NotAuthorizedException":
      return "auth.errors.invalidCredentials";
    case "UserNotFoundException":
      return "auth.errors.userNotFound";
    case "UserNotConfirmedException":
      return "auth.errors.userNotConfirmed";
    case "TooManyRequestsException":
      return "auth.errors.tooManyRequests";
    case "LimitExceededException":
      return "auth.errors.limitExceeded";
    case "UserAlreadyAuthenticatedException":
      return "auth.errors.alreadyAuthenticated";
    case "InvalidPasswordException":
      return "auth.errors.invalidPassword";
    case "PasswordResetRequiredException":
      return "auth.errors.passwordResetRequired";
    case "NetworkError":
      return "auth.errors.network";
    default:
      return "auth.errors.unknown";
  }
}

export function useLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [challengeStep, setChallengeStep] = useState<string | null>(null);
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsSubmitting(true);
    setAuthError(null);
    try {
      const result = await loginWithCredentials(email, password);
      if (result.isSignedIn) {
        await refreshUser();
        void navigate("/dashboard");
      } else {
        setChallengeStep(result.nextStep.signInStep);
      }
    } catch (error) {
      setAuthError(mapCognitoError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitNewPassword = async (newPassword: string) => {
    setIsSubmitting(true);
    setAuthError(null);
    try {
      const result = await completeNewPassword(newPassword);
      if (result.isSignedIn) {
        setChallengeStep("REGULATIONS_ACCEPTANCE");
      }
    } catch (error) {
      setAuthError(mapCognitoError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitRegulationsAcceptance = async () => {
    setIsSubmitting(true);
    setAuthError(null);
    try {
      await acceptRegulations({
        termsOfService: true,
        privacyPolicy: true,
        acceptedAt: new Date().toISOString(),
      });
      await refreshUser();
      void navigate("/dashboard");
    } catch (error) {
      setAuthError(mapCognitoError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetChallenge = () => {
    setChallengeStep(null);
    setAuthError(null);
  };

  const clearAuthError = () => setAuthError(null);

  return {
    login,
    submitNewPassword,
    submitRegulationsAcceptance,
    isSubmitting,
    authError,
    clearAuthError,
    challengeStep,
    resetChallenge,
  };
}
