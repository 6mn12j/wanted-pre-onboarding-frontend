import { signin } from "api/user";
import axios from "axios";
import { useInput } from "Hooks/useInput";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const emailInput = useInput({ initialValue: "" });
  const passwordInput = useInput({ initialValue: "" });

  const navigateSignUp = () => {
    navigate("/signup");
  };

  const navigateTodo = () => {
    // navigate("/todo");
    window.location.href = "/todo";
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await signin(emailInput.value, passwordInput.value);

      //signin 로직
      window.localStorage.setItem("jwt", response.data.access_token);
      navigateTodo();
      window.alert("로그인을 완료 했습니다.");
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        const { message, statusCode } = error.response?.data;

        if (statusCode === 401) window.alert("비밀번호가 틀렸습니다.");
        else window.alert(message);
      }
    }
  };

  useEffect(() => {
    if (emailInput.value.match(/.@./) && passwordInput.value.length > 8)
      setDisabled(false);
    else setDisabled(true);
  }, [disabled, emailInput.value, passwordInput.value.length]);

  return (
    <>
      <h1>Signin</h1>
      <form onSubmit={handleSignIn}>
        <input id="id" type="email" {...useInput}></input>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          {...passwordInput}
        ></input>
        <button disabled={disabled}>로그인</button>
      </form>
      <button onClick={navigateSignUp}>회원가입하러가기</button>
    </>
  );
};

export default Signin;
