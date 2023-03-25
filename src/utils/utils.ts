export function isLoggedIn(): boolean {
  const authToken = localStorage.getItem("AuthToken");
  localStorage.setItem(
    "AuthToken",
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NyIsImV4cCI6MTY3OTc3NTM1MSwiaWF0IjoxNjc5NzU3MzUxfQ.e_cR0zcwWxEZVfpTckmXqBM597SZfu1-6NH80uuxTM2M_iXeRnhOnQfGiTWyqXUofkXnJWbP6eoOhyVdzgIrDw"
  );
  return !!authToken;
}
