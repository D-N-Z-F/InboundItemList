import { DeleteOutline } from "@mui/icons-material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function TableData({ data, isDarkMode, onDeleteHandler }) {
  const styles = {
    table: {
      bgcolor: isDarkMode ? "#121212" : "#fff",
      boxShadow: `0 0 6px 3px rgba(${
        isDarkMode ? "255, 255, 255" : "0, 0, 0"
      }, 0.3)`,
      scrollbarWidth: "thin",
    },
    row: { "&:last-child td, &:last-child th": { border: 0 } },
    cell: { color: isDarkMode ? "#fff" : "#121212" },
  };
  return (
    <TableContainer component={Paper} sx={styles.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={styles.cell}>
              Item
            </TableCell>
            <TableCell align="center" sx={styles.cell}>
              Qty
            </TableCell>
            <TableCell align="center" sx={styles.cell}>
              Location
            </TableCell>
            <TableCell align="center" sx={styles.cell}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((each) => (
            <TableRow key={each.id} sx={styles.row}>
              <TableCell align="center" sx={styles.cell}>
                {each.barcode}
              </TableCell>
              <TableCell align="center" sx={styles.cell}>
                {each.quantity}
              </TableCell>
              <TableCell align="center" sx={styles.cell}>
                {each.location}
              </TableCell>
              <TableCell align="center" sx={styles.cell}>
                <DeleteOutline
                  onClick={() => onDeleteHandler(each.id)}
                  className="transition hover:cursor-pointer hover:text-red-500 hover:scale-125"
                />
              </TableCell>
            </TableRow>
          ))}
          {!data.length && (
            <TableRow sx={styles.row}>
              <TableCell colSpan={4} sx={styles.cell}>
                No data to display.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
