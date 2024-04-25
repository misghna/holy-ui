import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { alpha } from "@mui/material/styles";
import { styled } from "@mui/system";
import PropTypes from "prop-types";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  width: theme.spacing(7),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const Input = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  padding: theme.spacing(1, 1, 1, 7),
  transition: theme.transitions.create("width"),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: 200
  }
}));

const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
  const count = preGlobalFilteredRows.length;

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Input
        value={globalFilter || ""}
        onChange={(e) => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} records...`}
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.array.isRequired,
  globalFilter: PropTypes.string.isRequired,
  setGlobalFilter: PropTypes.func.isRequired
};

export default GlobalFilter;
