export function isLoggedIn(): boolean {
  const authToken = localStorage.getItem("AuthToken");
  return !!authToken;
}

export function getJwtToken(): string {
  return localStorage.getItem("AuthToken") || "";
}
