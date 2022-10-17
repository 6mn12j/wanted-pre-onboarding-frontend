import { signup } from "api/user";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateHome = () => {
    navigate("/");
  };

  const navigateTodo = () => {
    navigate("/todo");
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = event.currentTarget.value;
    setState(value);
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await signup(email, password);

      //signup 로직
      window.localStorage.setItem("jwt", response.data.access_token);
      window.alert("회원가입을 완료 했습니다.");
      navigateTodo();
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        const { message } = error.response?.data;
        window.alert(message);
      }
    }
  };

  useEffect(() => {
    if (email.match(/.@./) && password.length > 8) setDisabled(false);
    else setDisabled(true);
  }, [disabled, email, password]);

  return (
    <>
      <h1>SIGH UP</h1>
      <form onSubmit={handleSignup}>
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
        <button disabled={disabled}>회원가입</button>
      </form>
      <button onClick={navigateHome}>홈으로돌아가기</button>
    </>
  );
};

export default Signup;
