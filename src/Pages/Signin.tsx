import { signin } from "api/user";
import axios from "axios";
import { useInput } from "Hooks/useInput";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "context/AuthProvider";

const Signin = () => {
  const navigate = useNavigate();
  const [, actions] = useContext(AuthContext);
  const [isDisabled, setDisabled] = useState(true);

  const {
    props: { value: emailValue, onChange: emailOnchange },
  } = useInput({ initialValue: "" });

  const {
    props: { value: passwordValue, onChange: passwordOnChange },
  } = useInput({ initialValue: "" });

  const navigateSignUp = () => {
    navigate("/signup");
  };

  const navigateTodo = () => {
    navigate("/todo");
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await signin(emailValue, passwordValue);

      //signin 로직
      actions.setJWT(response.data.access_token);
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
    if (emailValue.match(/.@./) && passwordValue.length >= 8)
      setDisabled(false);
    else setDisabled(true);
  }, [isDisabled, emailValue, passwordValue.length]);

  return (
    <>
      <h1>Signin</h1>
      <form onSubmit={handleSignIn}>
        <input
          id="id"
          type="email"
          value={emailValue}
          onChange={emailOnchange}
        />
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={passwordValue}
          onChange={passwordOnChange}
        />
        <button disabled={isDisabled}>로그인</button>
      </form>
      <button onClick={navigateSignUp}>회원가입하러가기</button>
    </>
  );
};

export default Signin;
