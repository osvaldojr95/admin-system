import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/layout/Button";
import Paper from "../../components/layout/Paper";
import Logo from "../../components/logo/Logo";
import Input from "../../components/layout/Input";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Logo big={true} />
      <h2>Entre com usa conta Admin</h2>
      <Paper height="auto" width="400px" flexCenter={true} padding="40px 40px">
        <div className="field">
          <p>Email</p>
          <Input
            height="40px"
            width="100%"
            placeHolder={"email@exemplo.com"}
            value={email}
            onChange={setEmail}
            autocomplete={"email"}
          />
        </div>
        <div className="field">
          <p>Senha</p>
          <Input
            type="password"
            height="40px"
            width="100%"
            value={password}
            onChange={setPassword}
            autocomplete={"current-password"}
          />
        </div>
        <Button submit={true} height="40px" text={"Entrar"} main={true} />
      </Paper>
    </Container>
  );
};

const Container = styled.form`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: var(--secondary-color);
  }

  p {
    font-size: 16px;
    color: var(--secondary-color);
  }

  .field {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export default SignIn;
