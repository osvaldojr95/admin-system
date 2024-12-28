import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/logo/Logo";
import Button from "../../components/layout/Button";
import { states } from "../../utils/validate.js";

const Home = () => {
  const [ws, setWs] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState({
    totalCustomers: null,
    totalDuplicatedPhone: null,
    totalCustomersPerState: states.map((state) => ({
      state: state,
      total: null,
    })),
  });

  useEffect(() => {
    const connectWebSocket = () => {
      const wsUrl = `${import.meta.env.VITE_WS_URL}/`;
      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        socket.send("getStats");
      };

      socket.onmessage = (event) => {
        const message = event.data;
        const parsed = JSON.parse(message);
        setData({
          totalCustomers: parsed.totalCustomers,
          totalDuplicatedPhone: parsed.totalDuplicatedPhone,
          totalCustomersPerState: parsed.totalCustomersPerState.map(
            (state) => ({
              state: state.state,
              total: state.total,
            })
          ),
        });
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = () => {
        console.log("WebSocket desconectado");
        setTimeout(connectWebSocket, 3000);
      };

      setWs(socket);
    };

    connectWebSocket();

    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <Container>
      <div className="sides infos">
        <h2 className="tittle">Informações em tempo real</h2>
        <h3 className="section">
          Número total de clientes: {data.totalCustomers ?? "Carregando..."}
        </h3>
        <h3 className="section">
          Número de clientes com telefone duplicado:{" "}
          {data.totalDuplicatedPhone ?? "Carregando..."}
        </h3>
        <h3 className="section">
          Quantidade de clientes por estado:{" "}
          {!data.totalCustomers ? "Carregando..." : ""}
        </h3>
        <ul className="states">
          {data.totalCustomersPerState.map((state) => (
            <li key={state.state}>
              {state.state}: {state.total}
            </li>
          ))}
        </ul>
      </div>
      <div className="sides right">
        <div className="access">
          <Logo big white />
          <Button
            width="300px"
            bgColor="var(--bg-public)"
            execute={() => navigate("/signin")}
            text="Acesse agora!"
          />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .sides {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .right {
    width: 40%;
  }

  .infos {
    width: 60%;
    align-items: flex-start;
  }

  .access {
    padding: 50px;
    background-color: var(--main-color);
    border-radius: 50px 0 50px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
  }

  .states {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 10px;
  }

  .tittle {
    font-size: 26px;
    font-weight: 700;
    font-style: italic;
    color: var(--main-color);
    margin-bottom: 20px;
  }

  .section {
    font-size: 18px;
    font-weight: 600;
  }
`;

export default Home;
