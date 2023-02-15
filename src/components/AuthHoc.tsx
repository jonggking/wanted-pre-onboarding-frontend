import { ComponentType } from "react";

const AuthHoc = (AuthComponent: ComponentType) => {
  const AuthCheck = () => {
    const isAuth = localStorage.getItem("access_token") !== null;

    if (!isAuth) {
      window.alert("로그인이 필요한 서비스입니다.");
      window.location.href = "/signin";
      return <></>;
    }

    return <AuthComponent />;
  };

  return AuthCheck;
};

export default AuthHoc;
