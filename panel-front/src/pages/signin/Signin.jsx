import styled from "styled-components";
import { useState } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import Button from "../../components/layout/Button";
import Paper from "../../components/layout/Paper";
import Logo from "../../components/logo/Logo";
import Input from "../../components/layout/Input";
import { signIn } from "../../services";

const authSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email inválido",
      "any.required": "Email é obrigatório",
    }),
  password: Joi.string().min(3).required().messages({
    "string.min": "Senha inválida",
    "any.required": "Senha é obrigatória",
  }),
});

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const validateForm = () => {
    const validation = authSchema.validate(
      { email, password },
      { abortEarly: false }
    );
    if (validation.error) {
      validation.error.details.forEach((e) => {
        setError((prev) => ({ ...prev, [e.context.key]: e.message }));
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isValid = validateForm();
      if (!isValid) return;

      const response = await signIn({ email, password });
      if (response === 401 || response === 422) {
        setError({ request: "Email ou senha incorretos" });
        return;
      }

      localStorage.setItem("token", response);
      navigate("/dashboard");
    } catch (ex) {
      setError({
        request: "Erro desconhecido, tente novamente mais tarde!",
      });
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Logo big={true} />
      <h2>Entre com usa conta Admin</h2>
      <Paper
        height="auto"
        width="400px"
        gap={"35px"}
        flexCenter={true}
        padding="40px 40px"
      >
        <div className="field">
          <p className="field-name">Email</p>
          <Input
            height="40px"
            width="100%"
            placeHolder={"email@exemplo.com"}
            value={email}
            onChange={(e) => {
              setEmail(e);
              if (error.email) setError((prev) => ({ ...prev, email: null }));
            }}
            autocomplete={"email"}
          />
          {error.email && <p className="field-error">{error.email}</p>}
        </div>
        <div className="field">
          <p className="field-name">Senha</p>
          <Input
            type="password"
            height="40px"
            width="100%"
            value={password}
            onChange={(e) => {
              setPassword(e);
              if (error.password)
                setError((prev) => ({ ...prev, password: null }));
            }}
            autocomplete={"current-password"}
          />
          {error.password && <p className="field-error">{error.password}</p>}
        </div>
        <div className="request">
          <Button submit={true} height="40px" text={"Entrar"} main={true} />
          {error.request && <p className="error">{error.request}</p>}
        </div>
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
  gap: 20px;

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: var(--secondary-color);
  }

  .field {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .field-name {
    font-size: 16px;
    color: var(--secondary-color);
  }

  .field-error {
    top: 72px;
    left: 0;
    position: absolute;
    font-size: 13px;
    font-weight: 500;
    color: var(--error-color);
  }

  .request {
    position: relative;
    width: 100%;
    font-size: 15px;
    font-weight: 500;
    color: var(--error-color);

    .error {
      position: absolute;
      width: 100%;
      top: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
      color: var(--error-color);
    }
  }
`;

export default SignIn;
