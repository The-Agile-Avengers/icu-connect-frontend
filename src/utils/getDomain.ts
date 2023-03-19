const isProduction = () => process.env.NODE_ENV === "production";


export const getDomain = () => {
  const prodUrl = 'LOCALSTACK / AWS URL';
  const devUrl = 'http://localhost:8080';

  return isProduction() ? prodUrl : devUrl;
};