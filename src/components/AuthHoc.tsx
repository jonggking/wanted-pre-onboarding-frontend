import { ComponentType } from "react";
// import useTokenCheck from "../../../hooks/auth/useTokenCheck";

const AuthHoc = (AuthComponent: ComponentType) => {
  const AuthCheck = () => {
    const isSignIn = localStorage.getItem("access_token") !== null;
    
    if (!isSignIn) {
      window.alert("로그인이 필요한 서비스입니다.");
      window.location.href = "/signin";
      return <></>;
    }

    return <AuthComponent />;
  };

  return AuthCheck;
};

export default AuthHoc;