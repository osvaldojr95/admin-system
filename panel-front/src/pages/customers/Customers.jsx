import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paper from "../../components/layout/Paper";
import { setHeadcrumbs } from "../../context/sessionSlice";
import Button from "../../components/layout/Button";
import Grid from "../../components/layout/Grid";
import Input from "../../components/layout/Input";
import { getAllCustomers } from "../../services";

const Customers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [search, setSearch] = useState("");
  const columns = [
    {
      headername: "Nome",
      field: "name",
      order: true,
    },
    {
      headername: "CPF",
      field: "cpf",
    },
    {
      headername: "Telefone",
      field: "phone",
    },
    {
      headername: "Endereço",
      field: "address",
    },
    {
      headername: "Cidade",
      field: "city",
    },
    {
      headername: "Estado",
      field: "state",
      order: true,
    },
    {
      headername: "CEP",
      field: "cep",
    },
    {
      headername: "Data Cadastro",
      field: "createdDate",
      type: "date",
      order: true,
    },
  ];

  const loadCustomers = async (pagination) => {
    try {
      const response = await getAllCustomers(pagination);
      setRows(response.customers);
      setTotalCount(response.total);
    } catch (ex) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

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
        <Grid
          columns={columns}
          rows={rows}
          total={totalCount}
          loadData={loadCustomers}
          paginationOn
          orderOn
        />
      </div>
    </Paper>
  );
};

export default Customers;
