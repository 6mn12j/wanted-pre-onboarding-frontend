import { signin } from "api/user";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateSignUp = () => {
    navigate("/signup");
  };

  const navigateTodo = () => {
    // navigate("/todo");
    window.location.href = "/todo";
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = event.currentTarget.value;
    setState(value);
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await signin(email, password);

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
    if (email.match(/.@./) && password.length > 8) setDisabled(false);
    else setDisabled(true);
  }, [disabled, email, password]);

  return (
    <>
      <h1>Signin</h1>
      <form onSubmit={handleSignIn}>
        <input
          id="id"
          type="email"
          value={email}
          onChange={(event) => {
            handleChange(event, setEmail);
          }}
        ></input>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(event) => {
            handleChange(event, setPassword);
          }}
        ></input>
        <button disabled={disabled}>로그인</button>
      </form>
      <button onClick={navigateSignUp}>회원가입하러가기</button>
    </>
  );
};

export default Signin;
