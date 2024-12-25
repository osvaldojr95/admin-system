import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paper from "../../components/layout/Paper";
import { setHeadcrumbs } from "../../context/sessionSlice";
import Button from "../../components/layout/Button";

const Customers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      setHeadcrumbs([
        {
          text: "Clientes",
          nav: "/customers",
        },
        {
          text: "Importar CSV",
        },
      ])
    );
  }, []);

  return (
    <Paper gap={"10px"}>
      <div className="top">
        Importar Clientes via Arquivo CSV
        <div className="buttons">
          <Button
            width="200px"
            text="Voltar"
            execute={() => navigate("/customers")}
          />
          <Button
            width="200px"
            text="Importar arquivo"
            main={true}
            execute={() => {}}
          />
        </div>
      </div>
      <div className="main">Pending & Dones</div>
    </Paper>
  );
};

export default Customers;
