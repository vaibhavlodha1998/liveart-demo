import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import styles from "../styles/Home.module.css";

import BasicSelect from "../src/components/BasicSelect";
import BoxSx from "../src/components/BoxSx";
import CustomListItem from "../src/components/CustomListItem";

import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import {
  selectMineSweeperMap,
  updateMineSweeperMap,
} from "../src/features/mineSweeperMap/mineSweeperMapSlice";

import {
  selectMessageHistory,
  updatemessageHistory,
  deletemessageHistory,
} from "../src/features/messageHistory/messageHistorySlice";

import { updateLevel, selectLevel } from "../src/features/level/levelSlice";

import {
  updateMessage,
  selectMessage,
} from "../src/features/message/messageSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home: NextPage = () => {
  const [socketUrl, setSocketUrl] = useState(
    "wss://hometask.eg1236.com/game1/"
  );
  const messageHistory = useAppSelector(selectMessageHistory);
  const mineSweeperMap = useAppSelector(selectMineSweeperMap);
  const level = useAppSelector(selectLevel);
  const message = useAppSelector(selectMessage);
  const [boxDisabled, setBoxDisabled] = useState(false);

  const dispatch = useAppDispatch();

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    share: true,
    onOpen: () => console.log("Connection opened"),
    shouldReconnect: (closeEvent) => true,
    onClose: () => console.log("Connection Closed"),
  });

  useEffect(() => {
    if (lastMessage !== null) {
      const new_map = lastMessage.data
        .split("\n")
        .splice(1, lastMessage.data.split("\n").length - 2)
        .map((rows: any) => rows.split(""));
      dispatch(updateMineSweeperMap(new_map));
      dispatch(updatemessageHistory([lastMessage]));
    }
  }, [lastMessage, updateMineSweeperMap]);

  useEffect(() => {
    messageHistory.map((message: MessageEvent) => {
      if (message?.data === "open: You lose") {
        setBoxDisabled(true);
        dispatch(deletemessageHistory([]));
        dispatch(updateMessage("You Lose"));
      }
    });
  }, [lastMessage]);

  const startGame = (level: string) => {
    dispatch(deletemessageHistory([]));
    setBoxDisabled(false);
    dispatch(updateMessage(""));
    sendMessage(`new ${level}`);
    sendMessage("map");
  };

  const resetGame = (level: string) => {
    dispatch(deletemessageHistory([]));
    dispatch(updateMessage(""));
    setBoxDisabled(false);
    sendMessage(`new ${level}`);
    sendMessage("map");
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const updateMapLevel = (level: string): void => {
    dispatch(updateLevel(level));
  };

  const mineClicker = (sIndex: Number, index: Number): void => {
    {
      sendMessage(`open ${sIndex} ${index}`);
      sendMessage("map");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>MineSweeper App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="lg" sx={{ mt: 3, bgcolor: "#3F4C6C" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Typography variant="h5" component="h1">
                {" "}
                Welcome to MineSweeper World...!
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <CustomListItem pageTitle={"logs"} linkPath={"/logs"} />
          </Grid>
          <Grid item xs={12} sx={{ mx: "auto" }} justifyContent="center">
            <Grid container>
              <Item sx={{ p: 0, m: 0 }}>
                <BasicSelect level={level} updateLevel={updateMapLevel} />
              </Item>
            </Grid>
          </Grid>
          <Grid container item xs={12} justifyContent="space-evenly">
            <Button
              onClick={() => startGame(level)}
              disabled={readyState !== ReadyState.OPEN}
              variant="contained"
              sx={{ backgroundColor: "#F299AD" }}
            >
              Start Game
            </Button>

            <Button
              onClick={() => resetGame(level)}
              disabled={readyState !== ReadyState.OPEN}
              variant="contained"
              sx={{ backgroundColor: "#F299AD" }}
            >
              Reset Game
            </Button>
          </Grid>
          <Grid item xs={12} justifyContent="center" sx={{ mb: 2 }}>
            {mineSweeperMap
              ? mineSweeperMap.map((row: any, index: any) => {
                  return (
                    <Grid container key={index} justifyContent="center">
                      {row.map((box: any, sIndex: any) => {
                        return (
                          <Grid item xs={0} key={sIndex}>
                            <BoxSx
                              handleClick={() => mineClicker(sIndex, index)}
                              boxValue={box}
                              boxDisabled={boxDisabled}
                              boxSize={
                                lastMessage?.data.split("\n").length - 2 || 10
                              }
                            ></BoxSx>
                          </Grid>
                        );
                      })}
                    </Grid>
                  );
                })
              : null}
          </Grid>
          {message ? (
            <Grid item xs={12}>
              <Item sx={{ mb: 2 }}>
                <Typography variant="h5"> {message}</Typography>
              </Item>
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
