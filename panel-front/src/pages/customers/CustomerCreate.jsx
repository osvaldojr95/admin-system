import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHeadcrumbs } from "../../context/sessionSlice";
import Paper from "../../components/layout/Paper";
import Button from "../../components/layout/Button";
import Input from "../../components/layout/Input";
import { validateCustomer } from "../../utils/validate";
import {
  formatCpf,
  formatPhone,
  formatState,
  formatCep,
  formatName,
} from "../../utils/formats";
import { createCustomer } from "../../services";

const CustomerCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(
      setHeadcrumbs([
        {
          text: "Clientes",
          nav: "/customers",
        },
        {
          text: "Novo",
        },
      ])
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const customer = {
        name: formatName(name),
        cpf,
        phone,
        city,
        state,
        cep,
        address,
      };
      if (!validateCustomer(customer, setError)) return;

      await createCustomer(customer);
      navigate("/customers");
    } catch (ex) {
      console.log(ex);
      setError({
        request: "Erro desconhecido, tente novamente mais tarde!",
      });
    }
  };

  return (
    <Paper gap={"10px"}>
      <div className="top">
        Novo Cliente
        <div className="buttons">
          <Button
            width="200px"
            text="Voltar"
            execute={() => navigate("/customers")}
          />
        </div>
      </div>
      <div className="main">
        <Container onSubmit={handleSubmit}>
          <div className="field">
            <p className="field-name">Nome *</p>
            <Input
              height="40px"
              width="100%"
              placeHolder={""}
              value={name}
              onChange={(e) => {
                setName(e);
                if (error.name) setError((prev) => ({ ...prev, name: null }));
              }}
              autocomplete={"name"}
            />
            {error.name && <p className="field-error">{error.name}</p>}
          </div>
          <div className="field">
            <p className="field-name">CPF *</p>
            <Input
              height="40px"
              width="100%"
              value={cpf}
              onChange={(e) => {
                setCpf(formatCpf(e));
                if (error.cpf) setError((prev) => ({ ...prev, cpf: null }));
              }}
              autocomplete={"off"}
            />
            {error.cpf && <p className="field-error">{error.cpf}</p>}
          </div>
          <div className="field">
            <p className="field-name">Telefone *</p>
            <Input
              height="40px"
              width="100%"
              value={phone}
              onChange={(e) => {
                setPhone(formatPhone(e));
                if (error.phone) setError((prev) => ({ ...prev, phone: null }));
              }}
              autocomplete={"tel"}
            />
            {error.phone && <p className="field-error">{error.phone}</p>}
          </div>
          <div className="field">
            <p className="field-name">Cidade *</p>
            <Input
              height="40px"
              width="100%"
              value={city}
              onChange={(e) => {
                setCity(e);
                if (error.city) setError((prev) => ({ ...prev, city: null }));
              }}
              autocomplete={"address-level2"}
            />
            {error.city && <p className="field-error">{error.city}</p>}
          </div>
          <div className="field">
            <p className="field-name">Estado *</p>
            <Input
              height="40px"
              width="100%"
              value={state}
              onChange={(e) => {
                setState(formatState(e));
                if (error.state) setError((prev) => ({ ...prev, state: null }));
              }}
              autocomplete={"address-level1"}
            />
            {error.state && <p className="field-error">{error.state}</p>}
          </div>
          <div className="field">
            <p className="field-name">CEP *</p>
            <Input
              height="40px"
              width="100%"
              value={cep}
              onChange={(e) => {
                setCep(formatCep(e));
                if (error.cep) setError((prev) => ({ ...prev, cep: null }));
              }}
              autocomplete={"postal-code"}
            />
            {error.cep && <p className="field-error">{error.cep}</p>}
          </div>
          <div className="field">
            <p className="field-name">Endereço *</p>
            <Input
              height="40px"
              width="100%"
              value={address}
              onChange={(e) => {
                setAddress(e);
                if (error.address)
                  setError((prev) => ({ ...prev, address: null }));
              }}
              autocomplete={"address-line1"}
            />
            {error.address && <p className="field-error">{error.address}</p>}
          </div>
          <div className="request">
            <Button
              width="200px"
              height="40px"
              text={"Cancelar"}
              execute={() => navigate("/customers")}
            />
            <Button
              submit={true}
              width="200px"
              height="40px"
              text={"Salvar"}
              main={true}
            />
            {error.request && <p className="error">{error.request}</p>}
          </div>
        </Container>
      </div>
    </Paper>
  );
};

const Container = styled.form`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

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
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 500;
    color: var(--error-color);
    margin-bottom: 20px;

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

export default CustomerCreate;
