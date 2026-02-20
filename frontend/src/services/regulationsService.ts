interface AcceptRegulationsPayload {
  termsOfService: boolean;
  privacyPolicy: boolean;
  acceptedAt: string;
}

// TODO: Replace with real API call — POST /api/users/regulations/accept
export async function acceptRegulations(
  payload: AcceptRegulationsPayload,
): Promise<{ success: boolean }> {
  void payload;
  return Promise.resolve({ success: true });
}
