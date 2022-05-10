import React from "react";
import type { NextPage } from "next";
import { selectMineSweeperMap } from "../../src/features/mineSweeperMap/mineSweeperMapSlice";
import { selectMessageHistory } from "../../src/features/messageHistory/messageHistorySlice";
import { useAppSelector } from "../../src/store/hooks";
import CustomListItem from "../../src/components/CustomListItem";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Container } from "@mui/material";

const Logs: NextPage = () => {
  const displayLogs = useAppSelector(selectMessageHistory);

  const columns: GridColDef[] = [
    {
      field: "internalId",
      headerName: "ID",
      width: 100,
    },
    {
      field: "data",
      headerName: "MESSAGE",
      width: 850,
      editable: false,
    },
  ];

  return (
    <Container maxWidth="lg">
      <CustomListItem pageTitle={"Home"} linkPath={"/"} />

      {displayLogs.length > 0 ? (
        <div style={{ height: "93vh", width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={displayLogs.reduce((acc, current, index) => {
              acc.push({ internalId: index, data: current.data });
              return acc;
            }, [])}
            getRowId={(row) => row.internalId}
          ></DataGrid>
        </div>
      ) : (
        <h1>No Logs to Display</h1>
      )}
    </Container>
  );
};

export default Logs;
