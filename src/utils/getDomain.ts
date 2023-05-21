/* eslint-disable @typescript-eslint/restrict-template-expressions */
const isProduction = () => process.env.NODE_ENV === "production";

export const getDomain = () => {
  // AWS URL const prodUrl = "http://DEV-PROD-BALANCER-1363659248.eu-west-1.elb.amazonaws.com:8080";
  const prodUrl =  `http://localhost:40797`;
  const devUrl = `http://localhost:40797`;

  return isProduction() ? prodUrl : devUrl;
};
