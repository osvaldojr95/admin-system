import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHeadcrumbs } from "../../context/sessionSlice";
import Paper from "../../components/layout/Paper";
import Button from "../../components/layout/Button";

const AppointmentsCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  return (
    <Paper gap={"10px"}>
      <div className="top">
        Novo Compromisso
        <div className="buttons">
          <Button
            width="200px"
            text="Cancelar"
            execute={() => navigate("/appointments")}
          />
          <Button
            width="200px"
            text="Novo Cliente"
            main={true}
            execute={() => {}}
          />
        </div>
      </div>
      <div className="main">Form</div>
    </Paper>
  );
};

export default AppointmentsCreate;
