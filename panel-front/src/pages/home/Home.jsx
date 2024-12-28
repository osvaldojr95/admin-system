import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/logo/Logo";
import Button from "../../components/layout/Button";

const Home = () => {
  const [ws, setWs] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const connectWebSocket = () => {
      const wsUrl = `${import.meta.env.VITE_WS_URL}/`;
      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        console.log("WebSocket conectado");
      };

      socket.onmessage = (event) => {
        const message = event.data;
        console.log("WebSocket message:", message);
        // setMessages((prev) => [
        //   ...prev,
        //   {
        //     id: Date.now(),
        //     content: message,
        //     timestamp: new Date().toLocaleTimeString(),
        //     type: "received",
        //   },
        // ]);
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
        <h2>Informações em tempo real: </h2>
        <h3>Número total de clientes: </h3>
        <h3>Número de clientes com telefone duplicado: </h3>
        <h3>Quantidade de clientes por estado: </h3>
      </div>
      <div className="sides">
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
  gap: 100px;
  justify-content: center;
  align-items: center;

  .sides {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .infos {
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
`;

export default Home;
