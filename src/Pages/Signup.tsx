import React, { useEffect, useState, useContext } from "react";
import { signup } from "api/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "context/AuthProvider";
import { useInput } from "Hooks/useInput";

const Signup = () => {
  const navigate = useNavigate();
  const [, actions] = useContext(AuthContext);

  const [disabled, setDisabled] = useState(true);
  const {
    props: { value: emailValue, onChange: emailOnchange },
  } = useInput({ initialValue: "" });

  const {
    props: { value: passwordValue, onChange: passwordOnChange },
  } = useInput({ initialValue: "" });

  const navigateHome = () => {
    navigate("/");
  };

  const navigateTodo = () => {
    navigate("/todo");
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await signup(emailValue, passwordValue);

      //signup 로직
      actions.setJWT(response.data.access_token);
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
    if (emailValue.match(/.@./) && passwordValue.length >= 8)
      setDisabled(false);
    else setDisabled(true);
  }, [disabled, emailValue, passwordValue]);

  return (
    <>
      <h1>SIGN UP</h1>
      <form onSubmit={handleSignup}>
        <input
          id="id"
          type="email"
          value={emailValue}
          onChange={emailOnchange}
        ></input>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={passwordValue}
          onChange={passwordOnChange}
        ></input>
        <button disabled={disabled}>회원가입</button>
      </form>
      <button onClick={navigateHome}>홈으로돌아가기</button>
    </>
  );
};

export default Signup;
