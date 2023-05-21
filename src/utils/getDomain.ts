const isProduction = () => process.env.NODE_ENV === "production";

export const getDomain = () => {
  const prodUrl = "http://localhost:8080";
  const devUrl = "http://localhost:8080";

  return isProduction() ? prodUrl : devUrl;
};
