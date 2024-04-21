import { useEffect, useState } from "react";

import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";

import { axiosPrivate } from "~/_api";
import CardView from "~/components/Card";

import config from "../constants/endpoints.json";

const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  grid: {
    width: "100%",
    justifyContent: "center"
  }
}));

export default function GridView() {
  const classes = useStyles();
  const { category = "home" } = useParams();
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axiosPrivate
      .get(`/api/${currentConfig.contentData}`, {
        params: {
          content_category: category,
          lang: "english"
        }
      })
      .then(({ data }) => {
        setCardData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error :>> ", err);
        setLoading(false);
      });
  };

  useEffect(fetchData, [category]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "calc(100dvh - 7.25rem)",
          width: "100%",
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!loading && cardData.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "calc(100dvh - 7.25rem)",
          width: "100%",
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: 500,
            color: "text.secondary"
          }}
        >
          Unable to Fetch Data
        </Typography>
      </Box>
    );
  }
  return (
    <Grid container className={classes.grid}>
      {!loading &&
        cardData.length > 0 &&
        cardData.map((data) => (
          <Grid item xs={12} sm={6} lg={4} key={data.id}>
            <CardView data={data} />
          </Grid>
        ))}
    </Grid>
  );
}
