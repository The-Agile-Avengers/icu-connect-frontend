export function isLoggedIn(): boolean {
  const authToken = localStorage.getItem("AuthToken");
  return !!authToken;
}