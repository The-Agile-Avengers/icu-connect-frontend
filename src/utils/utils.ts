export function isLoggedIn(): boolean {
  const authToken = localStorage.getItem("AuthToken");
  return !!authToken;
}

export function getJwtToken(): string {
  return localStorage.getItem("AuthToken") || "";
}

export function getDate(creation: string): string {
  const date= new Date(creation)
  const day = date.getDate().toString();
  const month = date.getMonth().toString()
  const year= date.getFullYear().toString();
  const dateString= day + "." + month + "." + year;
  return dateString;

}