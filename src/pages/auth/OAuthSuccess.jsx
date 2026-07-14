import { React, useEffect } from "react";
import { RefreshTokenRequest } from "@/service/AuthService";

const OAuthSuccess = () => {
  const getData = async () => {
    const respone = await RefreshTokenRequest();
    console.log(respone);
  };
  useEffect(() => {
    getData();
  }, []);

  return <div>OAuthSuccess</div>;
};

export default OAuthSuccess;
