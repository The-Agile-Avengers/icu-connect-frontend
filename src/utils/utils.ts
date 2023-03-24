export function isLoggedIn(): boolean {
  const authToken = localStorage.getItem("AuthToken");
  localStorage.setItem(
    "AuthToken",
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MjMiLCJleHAiOjE2Nzk2OTA0OTYsImlhdCI6MTY3OTY3MjQ5Nn0.c4yyopb9Hwg--HdnH11n8Nt_FusU5BO9--HeghZL9p661QA1gPofbYrK7cD3Ya4xdZohyWZZ8ef0VnG53Gys-g"
  );
  return !!authToken;
}
