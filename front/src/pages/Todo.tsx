import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const isSignIn = localStorage.getItem("access_token") !== null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignIn) {
      navigate("/signin");
    }
  }, []);

  return <p>Todo</p>;
}
