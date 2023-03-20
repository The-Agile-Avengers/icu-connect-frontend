export function isLoggedIn(): boolean {
  const authToken = localStorage.getItem("AuthToken");
  localStorage.setItem("AuthToken", "alhd");
  return !!authToken;
}
