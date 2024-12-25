import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHeadcrumbs } from "../../context/sessionSlice";
import Paper from "../../components/layout/Paper";
import Button from "../../components/layout/Button";

const CustomerCreate = () => {
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
          text: "Novo",
        },
      ])
    );
  }, []);

  return (
    <Paper gap={"10px"}>
      <div className="top">
        Novo Cliente
        <div className="buttons">
          <Button
            width="200px"
            text="Cancelar"
            execute={() => navigate("/customers")}
          />
          <Button width="200px" text="Salvar" main={true} execute={() => {}} />
        </div>
      </div>
      <div className="main">Form</div>
    </Paper>
  );
};

export default CustomerCreate;
