import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@mui/styles";
import { shape, string } from "prop-types";

import DynamicModal from "./Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  card: {
    margin: theme.spacing(2)
  },
  cardTitle: {
    padding: theme.spacing(1)
  }
}));
function CardView({ data }) {
  console.log("{data} :>> ", { data });
  const classes = useStyles();
  const handleModalClose = () => {
    console.log('"object" :>> ', "object");
  };
  return (
    <>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            height={200}
            component="img"
            alt="Contemplative Reptile"
            image={data?.backgroundImg}
            title={data?.title}
          />
        </CardActionArea>
        <CardContent>
          <Typography
            sx={{
              fontWeight: 300,
              fontSize: "1.25rem",
              textTransform: "uppercase",
              color: "#696969"
            }}
            className={classes.cardTitle}
          >
            {data?.title}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.875rem",
              lineHeight: 1.5,
              color: "#999999"
            }}
            className={classes.cardTitle}
          >
            {data?.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button fullWidth onClick={() => alert("More button clicked!")}>
            More
          </Button>
        </CardActions>
      </Card>
      <DynamicModal open={false} handleClose={handleModalClose}>
        <span>Modal</span>
      </DynamicModal>
    </>
  );
}
CardView.propTypes = {
  data: shape({
    backgroundImg: string,
    title: string.isRequired,
    content: string
  })
};
export default CardView;
