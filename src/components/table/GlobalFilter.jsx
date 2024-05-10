import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { alpha } from "@mui/material/styles";
import { styled } from "@mui/system";
import PropTypes from "prop-types";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  border: "2px solid #f4f4f4",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0
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
    width: "100%"
  }
}));

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Input
        value={globalFilter || ""}
        onChange={(e) => {
          setGlobalFilter(e.target.value || undefined);
        }}
        placeholder={"Search"}
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.array,
  globalFilter: PropTypes.string.isRequired,
  setGlobalFilter: PropTypes.func.isRequired
};

export default GlobalFilter;
