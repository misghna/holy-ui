import { useEffect } from "react";

import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";

import GridView from "~/layouts/GridView";

function CategoryPages() {
  const params = useParams();
  useEffect(() => {
    document.title = params.category;
  }, [params?.category]);
  return (
    <Box sx={{ backgroundColor: "#F0F0F0" }}>
      <GridView />
    </Box>
  );
}

export default CategoryPages;
