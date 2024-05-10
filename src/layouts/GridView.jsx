import { useCallback, useEffect, useState } from "react";

import { Box, CircularProgress, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";

import { axiosPrivate } from "~/_api";
import CardView from "~/components/Card";
import Loading from "~/components/Loading";
import NoData from "~/components/NoData";
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";

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

const PAGE_SIZE = 9;

export default function GridView() {
  const classes = useStyles();
  const { category = "home" } = useParams();
  const { personalSetting } = useGlobalSetting();
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [dataOffset, setDataOffset] = useState(0);

  const fetchData = useCallback(
    (infiniteFetch) => {
      if (!infiniteFetch) {
        setLoading(true);
      }
      axiosPrivate
        .get(`/api/${currentConfig.contentData}`, {
          params: {
            content_category: category,
            lang: personalSetting.language,
            start: infiniteFetch ? dataOffset + PAGE_SIZE : dataOffset,
            limit: PAGE_SIZE
          }
        })
        .then(({ data }) => {
          if (infiniteFetch) {
            setDataOffset((prevState) => prevState + PAGE_SIZE);
            if (data.length === 0) {
              setHasMore(false);
            }
          }
          setCardData((prevState) => {
            return [...prevState, ...data];
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("error :>> ", err);
          setHasMore(false);
          setLoading(false);
        });
    },
    [category, dataOffset, personalSetting.language]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchData, [category, personalSetting.language]);

  if (loading) {
    return <Loading />;
  }
  if (!loading && cardData.length === 0) {
    return <NoData />;
  }
  return (
    <InfiniteScroll
      dataLength={cardData.length} //This is important field to render the next data
      next={() => fetchData(true)}
      hasMore={hasMore}
      hasChildren={false}
      loader={
        <Box display="flex" py={4} justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
          <CircularProgress />
        </Box>
      }
    >
      <Grid container className={classes.grid}>
        {cardData.length > 0 &&
          cardData.map((data) => (
            <Grid item xs={12} sm={6} lg={4} key={data.id}>
              <CardView data={data} />
            </Grid>
          ))}
      </Grid>
    </InfiniteScroll>
  );
}
