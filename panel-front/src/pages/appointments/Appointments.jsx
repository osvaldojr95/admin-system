import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import Paper from "../../components/layout/Paper";
import { setHeadcrumbs } from "../../context/sessionSlice";
import Button from "../../components/layout/Button";
import Grid from "../../components/layout/Grid";
import Input from "../../components/layout/Input";
import { getAllAppointments } from "../../services";

const Appointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState(null);
  const [search, setSearch] = useState("");
  const columns = [
    {
      headername: "Nome",
      field: "name",
    },
    {
      headername: "Data/Hora Início",
      field: "initialDate",
      type: "date",
    },
    {
      headername: "Data/Hora Fim",
      field: "endDate",
      type: "date",
    },
  ];

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const appointments = await getAllAppointments();
        setRows(appointments);
      } catch (ex) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    dispatch(
      setHeadcrumbs([
        {
          text: "Compromissos",
        },
      ])
    );
    loadAppointments();
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
        <Grid columns={columns} rows={rows} />
      </div>
    </Paper>
  );
};

export default Appointments;
