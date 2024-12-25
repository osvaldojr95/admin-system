import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paper from "../../components/layout/Paper";
import { setHeadcrumbs } from "../../context/sessionSlice";
import Button from "../../components/layout/Button";
import Grid from "../../components/layout/Grid";
import Input from "../../components/layout/Input";

const Customers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(
      setHeadcrumbs([
        {
          text: "Clientes",
        },
      ])
    );
  }, []);

  return (
    <Paper gap={"10px"}>
      <div className="top">
        Lista de Clientes
        <div className="buttons">
          <Input
            width="350px"
            value={search}
            onChange={setSearch}
            search={true}
          />
          <Button
            width="200px"
            text="Importar .csv"
            main={true}
            color="var(--thirdy-color)"
            bgHover={"var(--thirdy-hover)"}
            execute={() => navigate("/customers/import")}
          />
          <Button
            width="200px"
            text="Novo Cliente"
            main={true}
            execute={() => navigate("/customers/new")}
          />
        </div>
      </div>
      <div className="main">
        <Grid />
      </div>
    </Paper>
  );
};

export default Customers;
