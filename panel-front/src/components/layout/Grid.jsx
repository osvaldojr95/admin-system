import moment from "moment";
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";

const Grid = (props) => {
  const {
    columns = [],
    rows = null,
    total = null,
    loadData = null,
    paginationOn = false,
    orderOn = false,
    search = "",
  } = props;
  const [columnsSource, setColumnsSource] = useState(columns);
  const [rowsSource, setRowsSource] = useState(rows);
  const [headerRef, setHeaderRef] = useState([]);
  const [headerSizes, setHeaderSizes] = useState([]);
  const columnsRefs = useRef([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    orderBy: "name",
    order: "asc",
  });
  const paginationOptions = [10, 25, 50, 100];

  useEffect(() => {
    if (rows === null) return;
    setRowsSource(rows);
  }, [rows]);

  useEffect(() => {
    const autoSizeColumns = () => {
      let biggs = [];
      columnsSource.forEach((c, i) => {
        let bigger = c.headername;
        if (rowsSource && rowsSource?.length >= 0) {
          for (let j = 0; j < rowsSource.length; j++) {
            const row = rows[j][c.field];
            if (row?.length > bigger.length) {
              bigger = row;
            }
          }
        }
        biggs.push(bigger);
      });
      setHeaderRef(biggs);
    };
    autoSizeColumns();
  }, [rowsSource]);

  useEffect(() => {
    if (columnsRefs.current.length > 0 && headerRef.length > 0) {
      setHeaderSizes(
        columnsRefs.current.map((ref) => ref.getBoundingClientRect().width + 30)
      );
      setHeaderRef([]);
    }
  }, [headerRef]);

  useEffect(() => {
    loadData && loadData(pagination, search);
  }, [pagination, search]);

  return (
    <Container>
      <div className="bg-header" />
      <Table>
        <THead>
          <div className="tr">
            {headerRef.length > 0
              ? headerRef.map((c, i) => {
                  return (
                    <Cell
                      key={i}
                      className="th-big"
                      ref={(el) => (columnsRefs.current[i] = el)}
                    >
                      --{c}--
                    </Cell>
                  );
                })
              : columnsSource.map((c, i) => {
                  return (
                    <HeaderCell
                      key={i}
                      width={`${headerSizes[i]}px`}
                      onClick={() => {
                        if (
                          orderOn &&
                          columnsSource.filter(
                            (colSrc) => colSrc.field === c.field && c.order
                          ).length > 0
                        ) {
                          if (pagination.orderBy === c.field) {
                            setPagination((prev) => ({
                              ...prev,
                              order: prev.order === "asc" ? "desc" : "asc",
                            }));
                          } else {
                            setPagination((prev) => ({
                              ...prev,
                              orderBy: c.field,
                              order: "asc",
                            }));
                          }
                        }
                      }}
                    >
                      {c.headername}
                      {orderOn &&
                        c.order &&
                        pagination.orderBy === c.field &&
                        (pagination.order === "asc" ? (
                          <FaSortAmountUpAlt className="order-icon" />
                        ) : (
                          <FaSortAmountDown className="order-icon" />
                        ))}
                    </HeaderCell>
                  );
                })}
          </div>
        </THead>
        <TBody>
          {rowsSource === null ? (
            <div className="no-content">Loading</div>
          ) : rowsSource.length > 0 ? (
            rowsSource.map((r, i) => {
              return (
                <div className="tr" key={i}>
                  {columnsSource.map((c, i) => {
                    return (
                      <Cell key={i} width={`${headerSizes[i]}px`}>
                        {c.type && c.type === "date"
                          ? r[c.field]
                            ? moment(r[c.field]).format("DD/MM/YYYY HH:mm")
                            : "-"
                          : r[c.field] ?? "-"}
                      </Cell>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <div className="no-content">Sem registro</div>
          )}
        </TBody>
      </Table>
      <Pagination>
        {total != null && <span>Total: {total}</span>}
        {paginationOn && (
          <>
            <div className="pags">
              {pagination.page > 1 && (
                <button
                  onClick={() => {
                    setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
                  }}
                >
                  {"<"}
                </button>
              )}
              <p>{pagination.page}</p>
              {total !== 0 && total !== null && pagination.page * pagination.pageSize < total && (
                <button
                  onClick={() => {
                    setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
                  }}
                >
                  {">"}
                </button>
              )}
            </div>
            <select
              value={pagination.pageSize}
              onChange={(e) => {
                setPagination((prev) => ({
                  ...prev,
                  page: 1,
                  pageSize: e.target.value,
                }));
              }}
            >
              {paginationOptions.map((o, i) => {
                return (
                  <option key={i} value={o}>
                    {o}
                  </option>
                );
              })}
            </select>
          </>
        )}
      </Pagination>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;

  .bg-header {
    height: 44px;
    width: 100%;
    background-color: var(--secondary-light);
    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
`;
const Table = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 0;
  overflow-x: auto;
  z-index: 3;
`;
const THead = styled.div`
  height: 44px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  background-color: var(--secondary-light);
  border-radius: 8px;
  padding: 4px 20px;
  flex-grow: 1;
  flex-shrink: 0;
  z-index: 3;

  .tr {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }

  .th-big {
    width: fit-content;
    white-space: nowrap;
    font-size: 16px;
    font-weight: bold;
    color: var(--secondary-light);
  }

  .order-icon {
    font-size: 14px;
    margin-left: 10px;
    color: var(--main-color);
  }
`;

const TBody = styled.div`
  width: 100%;
  max-height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  flex-grow: 0;
  flex-shrink: 0;

  .tr {
    height: 40px;
    min-width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--bg-public);
    gap: 10px;
    border: 2px solid var(--secondary-light);
    border-radius: 8px;
    padding: 0 20px;
    flex-shrink: 0;
    flex-grow: 0;
  }

  .no-content {
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: italic;
    color: var(--light-gray-color);
  }
`;
const HeaderCell = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 10px;
  border-radius: 8px;

  &:hover {
    background-color: var(--light-gray-color);
  }
`;
const Cell = styled.div`
  width: ${(props) => props.width};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 10px;
`;
const Pagination = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: flex-end;
  gap: 60px;
  margin-top: 10px;
  font-weight: bold;

  &:focus {
    outline: none;
  }

  span {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--secondary-light);
    padding: 0 10px;
    border-radius: 4px;
  }

  button {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--secondary-light);
    padding: 0 10px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
  }

  .pags {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    p {
      background-color: var(--main-color);
      color: var(--bg-public);
    }
  }
`;

export default Grid;
