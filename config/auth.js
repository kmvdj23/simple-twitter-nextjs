import { createAuthProvider } from "react-token-auth"

import customStorage from "./customStorage"
import { refreshToken } from "./endpoints"

export const { useAuth, authFetch, login, logout } = createAuthProvider({
  storageKey: "access_token",
  onUpdateToken: (token) => refreshToken(token.access_token),
  storage: customStorage,
})
