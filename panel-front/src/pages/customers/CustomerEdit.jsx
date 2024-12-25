import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Paper from "../../components/layout/Paper";
import { setHeadcrumbs } from "../../context/sessionSlice";

const CustomerEdit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeadcrumbs([
        {
          text: "Clientes",
          nav: "/customers",
        },
        {
          text: "Editar",
        },
      ])
    );
  }, []);

  return (
    <Paper gap={"10px"}>
      <div className="top">Editar Cliente</div>
      <div className="main">Form</div>
    </Paper>
  );
};

export default CustomerEdit;
