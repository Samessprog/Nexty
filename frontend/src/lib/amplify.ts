import { Amplify } from "aws-amplify";

// TO DO
// Set Keys and domain or buy :<

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID as string,
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID as string,
      loginWith: {
        oauth: {
          domain: "COGNITO_DOMAIN",
          scopes: ["openid", "email", "profile"],
          redirectSignIn: ["http://localhost:5173/"],
          redirectSignOut: ["http://localhost:5173/login"],
          responseType: "code",
          providers: [{ custom: "Google" }, { custom: "LinkedIn" }],
        },
      },
    },
  },
});
