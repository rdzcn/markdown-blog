import { styled } from "@mui/material";

export const GridWrapper = styled("div")<{
  $isAutoHeight?: boolean;
  $isRowClickable: boolean;
}>`${({ theme, $isAutoHeight = false }) => ({
  height: $isAutoHeight ? "unset" : "718px",
  width: "100%",
  background: theme.palette.common.white,
  borderRadius: "8px",
})};

  .MuiTablePagination-spacer {
    display: none;
  }

  .MuiTablePagination-displayedRows {
    display: none;
  }

  .MuiDataGrid-row:hover {
    cursor: ${({ $isRowClickable }) => ($isRowClickable ? "pointer" : "default")};
  }
}`;
