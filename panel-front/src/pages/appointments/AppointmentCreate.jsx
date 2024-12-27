import styled from "styled-components";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHeadcrumbs } from "../../context/sessionSlice";
import Paper from "../../components/layout/Paper";
import Button from "../../components/layout/Button";
import Input from "../../components/layout/Input";
import { formatTime } from "../../utils/formats";
import { validateAppointment } from "../../utils/validate";
import { getAllCustomers, createAppointment } from "../../services";

const AppointmentsCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [initialTime, setInitialTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState({});
  const [customers, setCustomers] = useState(null);
  const [customerId, setCustomerId] = useState(0);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await getAllCustomers();
        setCustomers(response);
      } catch (ex) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    dispatch(
      setHeadcrumbs([
        {
          text: "Compromissos",
          nav: "/appointments",
        },
        {
          text: "Novo",
        },
      ])
    );
    loadCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const appointment = {
        name: name,
        date: date,
        customerId: customerId,
        initialTime: initialTime,
        endTime: endTime,
      };
      console.log(appointment);
      if (!validateAppointment(appointment, setError)) return;

      const appointmentData = {
        name: name,
        customerId: Number(customerId),
        initialDate: moment(
          `${date} ${initialTime}:00`,
          "YYYY-MM-DD HH:mm:ss"
        ).toDate(),
        endDate: moment(
          `${date} ${endTime}:00`,
          "YYYY-MM-DD HH:mm:ss"
        ).toDate(),
      };
      const response = await createAppointment(appointmentData);
      if (response === 404) {
        setError({ request: "Cliente não encotrado" });
        return;
      } else if (response === 409) {
        setError({ request: "Horário de atendimento conflitante" });
        return;
      }
      navigate("/appointments");
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
        Novo Compromisso
        <div className="buttons">
          <Button
            width="200px"
            text="Voltar"
            execute={() => navigate("/appointments")}
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
            />
            {error.name && <p className="field-error">{error.name}</p>}
          </div>
          <div className="field">
            <p className="field-name">Cliente *</p>
            <select
              className="custom-select"
              value={customerId}
              onChange={(e) => {
                setCustomerId(e.target.value);
                if (error.customer)
                  setError((prev) => ({ ...prev, customer: null }));
              }}
            >
              {customers && customers.length > 0 ? (
                <>
                  <option value={0}>Selecione o cliente</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </>
              ) : (
                <option value={0}>Nenhum cliente cadastrado</option>
              )}
            </select>
            {error.customer && <p className="field-error">{error.customer}</p>}
          </div>
          <div className="group-field">
            <div className="field">
              <p className="field-name">Data *</p>
              <Input
                height="40px"
                width="300px"
                type="date"
                placeHolder={""}
                value={date}
                onChange={(e) => {
                  setDate(e);
                  if (error.date) setError((prev) => ({ ...prev, date: null }));
                }}
              />
              {error.date && <p className="field-error">{error.date}</p>}
            </div>
            <div className="field">
              <p className="field-name">Horário de Início *</p>
              <Input
                height="40px"
                width="400px"
                placeHolder={""}
                value={initialTime}
                onChange={(e) => {
                  setInitialTime(formatTime(e));
                  if (error.initialTime)
                    setError((prev) => ({ ...prev, initialTime: null }));
                }}
              />
              {error.initialTime && (
                <p className="field-error">{error.initialTime}</p>
              )}
            </div>
          </div>
          <div className="group-field">
            <div className="no-field" />
            <div className="field">
              <p className="field-name">Horário de Término *</p>
              <Input
                height="40px"
                width="400px"
                placeHolder={""}
                value={endTime}
                onChange={(e) => {
                  setEndTime(formatTime(e));
                  if (error.endTime)
                    setError((prev) => ({ ...prev, endTime: null }));
                }}
              />
              {error.endTime && <p className="field-error">{error.endTime}</p>}
            </div>
          </div>
          <div className="request">
            <Button
              width="200px"
              height="40px"
              text={"Cancelar"}
              execute={() => navigate("/appointments")}
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

  .group-field {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;

    .no-field {
      width: 300px;
      height: 40px;
    }

    .field {
      width: auto;
    }
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

  .custom-select {
    height: 40px;
    width: 100%;
    padding: 5px;
    font-size: 16px;
    border: 1px solid var(--light-gray-color);
    border-radius: 8px;
  }
`;

export default AppointmentsCreate;
