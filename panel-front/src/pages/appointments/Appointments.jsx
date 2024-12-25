import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import Paper from "../../components/layout/Paper";
import { setHeadcrumbs } from "../../context/sessionSlice";
import Button from "../../components/layout/Button";
import Grid from "../../components/layout/Grid";
import Input from "../../components/layout/Input";

const Appointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(
      setHeadcrumbs([
        {
          text: "Compromissos",
        },
      ])
    );
    dispatch(
      setHeadcrumbs([
        {
          text: "Compromissos",
        },
      ])
    );
  }, []);

  return (
    <Paper gap={"10px"}>
      <div className="top">
        Lista de Compromissos
        <div className="buttons">
          <Input
            width="350px"
            value={search}
            onChange={setSearch}
            search={true}
          />
          <Button
            width="200px"
            text="Novo Compromisso"
            main={true}
            execute={() => navigate("/appointments/new")}
          />
        </div>
      </div>
      <div className="main">
        <Grid />
      </div>
    </Paper>
  );
};

export default Appointments;
