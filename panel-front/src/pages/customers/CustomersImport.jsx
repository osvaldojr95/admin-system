import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paper from "../../components/layout/Paper";
import { setHeadcrumbs } from "../../context/sessionSlice";
import Button from "../../components/layout/Button";
import Grid from "../../components/layout/Grid";
import { getAllImports, importCustomers } from "../../services";

const Customers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const columns = [
    {
      headername: "Status",
      field: "status",
    },
    {
      headername: "Arquivo",
      field: "fileName",
    },
    {
      headername: "Data Upload",
      field: "createdDate",
      type: "date",
    },
    {
      headername: "Processamento Finalizado",
      field: "processingDate",
      type: "date",
    },
  ];
  const fileInputRef = useRef(null);

  const loadImports = async () => {
    try {
      const response = await getAllImports();
      setRows(response.imports);
      setTotalCount(response.total);
    } catch (ex) {}
  };

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
    loadImports();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      if (selectedFile.type !== "text/csv") {
        setError("O arquivo deve ser um CSV.");
        setFile(null);
      } else {
        setError(null);
        setFile(selectedFile);
      }
    }
  };

  const handleUpload = async () => {
    try {
      await importCustomers(file);
      setFile(null);
    } catch (err) {}
  };

  return (
    <Paper gap={"10px"}>
      <div className="top">
        Importar Clientes via Arquivo CSV
        <div className="buttons">
          {file ? (
            <>
              <Button
                width="300px"
                text="Remover Arquivo"
                execute={() => {
                  setFile(null);
                  setError(null);
                }}
              />
              <Button
                text={"Enviar " + file.name}
                main={true}
                color={"var(--main-color)"}
                execute={async () => {
                  await handleUpload();
                  await loadImports();
                }}
              />
            </>
          ) : (
            <>
              <Button
                width="200px"
                text="Voltar"
                execute={() => navigate("/customers")}
              />
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              <div>
                <Button
                  width="100%"
                  text="Selecionar arquivo"
                  main={true}
                  color={"var(--thirdy-color)"}
                  bgHover={"var(--thirdy-hover)"}
                  execute={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}
                />
                {error && (
                  <span
                    style={{ fontSize: "14px", color: "var(--error-color)" }}
                  >
                    {error}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="main">
        <Grid columns={columns} rows={rows} total={totalCount} />
      </div>
    </Paper>
  );
};

export default Customers;
