"use client";

import CircularProgressBar from "@/components/CircularProgressBar";
import TableData from "@/components/TableData";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const barcodeRef = useRef();
  const [itemValues, setItemValues] = useState({ barcode: "", location: "" });
  const [dummyData, setDummyData] = useState([
    {
      id: 1,
      barcode: "stock-0001",
      quantity: 1,
      location: "location-01",
    },
    {
      id: 2,
      barcode: "stock-0002",
      quantity: 1,
      location: "location-02",
    },
    {
      id: 3,
      barcode: "stock-0003",
      quantity: 1,
      location: "location-03",
    },
    {
      id: 4,
      barcode: "stock-0004",
      quantity: 1,
      location: "location-04",
    },
  ]);
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const styles = {
    header: {
      marginRight: "auto",
      marginBottom: "3rem",
      letterSpacing: "4px",
      fontWeight: "bold",
    },
    section: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    textField: {
      "& input": { color: isDarkMode ? "#fff" : "#000" },
      marginTop: "3rem",
    },
  };

  const checkCurrentQuantity = () =>
    dummyData.reduce((total, current) => total + current.quantity, 0);

  const propagateNext = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      barcodeRef?.current.focus();
    }
  };

  const onSubmitHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let errors = [];
      if (!itemValues.location) errors.push("You should scan location first!");
      if (!itemValues.barcode) errors.push("Barcode cannot be empty!");
      if (!errors.length && checkCurrentQuantity() === 10)
        errors.push("Exceeded expected quantity!");

      if (errors.length) errors.map((each) => toastNotify(each, "error"));
      else {
        setDummyData((oldData) => {
          const idx = oldData.findIndex(
            (each) =>
              each.barcode === itemValues.barcode &&
              each.location === itemValues.location
          );
          return idx !== -1
            ? [
                ...oldData.slice(0, idx),
                { ...oldData[idx], quantity: oldData[idx].quantity + 1 },
                ...oldData.slice(idx + 1),
              ]
            : [
                ...oldData,
                {
                  id: oldData.length + 1,
                  barcode: itemValues.barcode,
                  quantity: 1,
                  location: itemValues.location,
                },
              ];
        });
        setItemValues({ barcode: "", location: "" });
        toastNotify("Added successfully!", "success");
      }
    }
  };

  const onDeleteHandler = (id) => {
    if (dummyData.some((each) => each.id === id)) {
      setDummyData(dummyData.filter((each) => each.id !== id));
      toastNotify("Deleted successfully!", "warning");
    }
  };

  const toastNotify = (message, type) =>
    toast(message, { type: type, theme: isDarkMode ? "dark" : "light" });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    setIsDarkMode(mediaQuery.matches);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    setCurrentQuantity(checkCurrentQuantity);
    if (checkCurrentQuantity() === 10)
      toastNotify("Completed Inbound!", "info");
  }, [dummyData, setCurrentQuantity]);

  return (
    <>
      <Box
        component="main"
        className="sm:h-screen flex sm:flex-row flex-col items-center justify-center sm:p-0 p-12"
      >
        <Box
          component="section"
          sx={styles.section}
          className="lg:w-1/3 sm:w-1/2 w-full"
        >
          <CircularProgressBar
            currentQuantity={currentQuantity}
            isDarkMode={isDarkMode}
          />
          <Stack>
            <TextField
              label="Location"
              variant="outlined"
              color="info"
              focused
              sx={styles.textField}
              value={itemValues.location}
              onKeyDown={propagateNext}
              onChange={(e) =>
                setItemValues({ ...itemValues, location: e.target.value })
              }
            />
            <TextField
              label="Barcode"
              variant="outlined"
              color="info"
              focused
              sx={styles.textField}
              value={itemValues.barcode}
              inputRef={barcodeRef}
              onKeyDown={onSubmitHandler}
              onChange={(e) =>
                setItemValues({ ...itemValues, barcode: e.target.value })
              }
            />
          </Stack>
        </Box>
        <Box
          component="section"
          sx={styles.section}
          className="lg:w-2/3 sm:w-1/2 w-full xl:me-24 sm:me-12 sm:mt-0 mt-12"
        >
          <Typography variant="h5" sx={styles.header}>
            Inbound Item List
          </Typography>
          <TableData
            data={dummyData}
            isDarkMode={isDarkMode}
            onDeleteHandler={onDeleteHandler}
          />
        </Box>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
