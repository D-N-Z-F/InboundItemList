import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export default function CircularProgressBar({ currentQuantity, isDarkMode }) {
  const theme = useTheme();
  const isMdBreakPoint = useMediaQuery(theme.breakpoints.down("md"));
  const styles = {
    outerBox: { position: "relative", display: "inline-flex" },
    innerBox: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    progressBarBG: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: "absolute",
      color: isDarkMode ? "#121212" : "#fff",
      zIndex: -1,
    },
  };
  return (
    <Box sx={styles.outerBox}>
      <CircularProgress
        variant="determinate"
        value={(currentQuantity / 10) * 100}
        size={isMdBreakPoint ? 200 : 250}
        thickness={2}
      />
      <CircularProgress
        variant="determinate"
        value={100}
        size={isMdBreakPoint ? 200 : 250}
        thickness={2}
        sx={styles.progressBarBG}
      />
      <Box sx={styles.innerBox}>
        <Stack justifyContent="center" alignItems="center">
          {currentQuantity === 10 && (
            <Typography variant="caption">Completed Inbound</Typography>
          )}
          <Typography variant="caption" fontSize={isMdBreakPoint ? 10 : 12}>
            Scanned
          </Typography>
          <Typography variant={isMdBreakPoint ? "h3" : "h2"}>
            {currentQuantity}
          </Typography>
          <Typography variant="caption" fontSize={isMdBreakPoint ? 10 : 12}>
            Total Expected Qty: 10
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
