import React from "react";
import type { NextPage } from "next";
import { selectMineSweeperMap } from "../../src/features/mineSweeperMap/mineSweeperMapSlice";
import { selectMessageHistory } from "../../src/features/messageHistory/messageHistorySlice";
import { useAppSelector } from "../../src/store/hooks";
import CustomListItem from "../../src/components/CustomListItem";

const Logs: NextPage = () => {
  const displayMine = useAppSelector(selectMineSweeperMap);
  const displayLogs = useAppSelector(selectMessageHistory);
  return (
    <div>
      <CustomListItem pageTitle={"Home"} linkPath={"/"} />
      {displayLogs.map((item, index) => {
        return <h2 key={index}>{item.data}</h2>;
      })}
    </div>
  );
};

export default Logs;
