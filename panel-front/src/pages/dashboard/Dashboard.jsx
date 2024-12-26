import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paper from "../../components/layout/Paper";
import { cleanHeadcrumbs } from "../../context/sessionSlice";

const Dashboard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanHeadcrumbs());
  }, []);

  const modules = [
    {
      name: "Clientes",
      nav: "/customers",
      tabs: [
        {
          name: "Listar todos",
          nav: "/customers",
        },
        {
          name: "Novo Cliente",
          nav: "/customers/new",
        },
        {
          name: "Importar CSV",
          nav: "/customers/import",
        },
      ],
    },
    {
      name: "Compromissos",
      nav: "/appointments",
      tabs: [
        {
          name: "Lista todos",
          nav: "/appointments",
        },
        {
          name: "Novo Compromisso",
          nav: "/appointments/new",
        },
      ],
    },
  ];

  return (
    <Paper gap={"10px"}>
      <div className="main">
        <Container>
          {modules.map((m, i) => {
            return (
              <Paper
                width={"300px"}
                height={"150px"}
                hover={true}
                onClick={() => navigate(m.nav)}
                key={i}
              >
                <div className="content">
                  <h3>{m.name}</h3>
                  <ul className="tabs">
                    {m.tabs.map((t, j) => {
                      return (
                        <li key={j}>
                          <a href={t.nav}>{t.name}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Paper>
            );
          })}
        </Container>
      </div>
    </Paper>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 15px;
  gap: 30px;
  z-index: 2;

  .content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .tabs {
    display: flex;
    flex-direction: column;
    gap: 5px;
    list-style-type: none;

    li {
      color: darkred;
    }
  }

  h3 {
    font-size: 22px;
    font-weight: 700;
    font-style: italic;
    color: var(--main-color);
  }

  a {
    width: fit-content;
    font-size: 14px;
    font-weight: 500;
    z-index: 3;
    text-decoration: none;
    color: var(--secondary-color);

    &:hover {
      color: var(--main-color);
    }
  }
`;

export default Dashboard;
