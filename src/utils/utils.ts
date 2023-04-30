export function isLoggedIn(): boolean {
  const authToken = localStorage.getItem("AuthToken");
  return !!authToken;
}

export function logout(): void {
  localStorage.removeItem("AuthToken");
}

export function getJwtToken(): string {
  return localStorage.getItem("AuthToken") || "";
}

export function getDate(creation = " "): string {
  if (creation == " ") {
    const date = new Date();
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    const dateString = day + "." + month + "." + year;
    return dateString;
  }
  const date = new Date(creation);
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();
  const dateString = day + "." + month + "." + year;
  return dateString;
}
