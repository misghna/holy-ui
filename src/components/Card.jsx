import { useState } from "react";

import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@mui/styles";
import { shape, string } from "prop-types";
import { useNavigate } from "react-router-dom";

import DynamicModal from "./Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  card: {
    margin: theme.spacing(2),
    minHeight: "93%"
  },
  cardTitle: {
    padding: 0,
    color: "#696969",
    textTransform: "uppercase"
  },
  cardBody: {
    color: "#999999"
  }
}));
function CardView({ data }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [modal, setModalData] = useState({ open: false });
  const handleModalClose = () => {
    setModalData({});
  };
  return (
    <>
      <Card className={classes.card}>
        <CardActionArea
          onClick={() => {
            setModalData({
              open: true,
              data
            });
          }}
        >
          <CardMedia
            height={200}
            component="img"
            alt="Contemplative Reptile"
            image={data?.backgroundImg}
            title={data?.title}
          />
        </CardActionArea>
        <CardHeader
          title={data.title}
          titleTypographyProps={{
            variant: "h6",
            fontWeight: 300,
            lineHeight: "1.5rem"
          }}
          classes={{
            root: classes.cardTitle
          }}
        />
        <CardContent classes={{ root: classes.cardBody }}>
          <Typography p={0} lineHeight="1.5rem" className={classes.cardBody} fontSize="body2.fontSize">
            {data?.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button fullWidth onClick={() => navigate(`/${data.contentCategory}`)}>
            More
          </Button>
        </CardActions>
      </Card>
      <DynamicModal open={modal.open} handleClose={handleModalClose} header="test">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A, aliquam officia. Saepe quibusdam culpa quos quod
        neque. Minima vero sed, modi, eius, nobis dolorem quidem provident quas iusto deserunt autem! Lorem ipsum dolor,
        sit amet consectetur adipisicing elit. Atque incidunt amet cumque omnis earum minima a! Accusamus placeat nulla
        commodi, facilis harum reprehenderit dicta, voluptate voluptatibus, corporis omnis assumenda sunt? Lorem ipsum
        dolor sit amet, consectetur adipisicing elit. Enim aut aliquam consequatur consequuntur dolores. Reprehenderit
        dolor non amet voluptatem, doloremque ab. Expedita ipsum iste aliquid quidem sapiente autem nesciunt fugit?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A, aliquam officia. Saepe quibusdam culpa quos quod
        neque. Minima vero sed, modi, eius, nobis dolorem quidem provident quas iusto deserunt autem! Lorem ipsum dolor,
        sit amet consectetur adipisicing elit. Atque incidunt amet cumque omnis earum minima a! Accusamus placeat nulla
        commodi, facilis harum reprehenderit dicta, voluptate voluptatibus, corporis omnis assumenda sunt? Lorem ipsum
        dolor sit amet, consectetur adipisicing elit. Enim aut aliquam consequatur consequuntur dolores. Reprehenderit
        dolor non amet voluptatem, doloremque ab. Expedita ipsum iste aliquid quidem sapiente autem nesciunt fugit?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A, aliquam officia. Saepe quibusdam culpa quos quod
        neque. Minima vero sed, modi, eius, nobis dolorem quidem provident quas iusto deserunt autem! Lorem ipsum dolor,
        sit amet consectetur adipisicing elit. Atque incidunt amet cumque omnis earum minima a! Accusamus placeat nulla
        commodi, facilis harum reprehenderit dicta, voluptate voluptatibus, corporis omnis assumenda sunt? Lorem ipsum
        dolor sit amet, consectetur adipisicing elit. Enim aut aliquam consequatur consequuntur dolores. Reprehenderit
        dolor non amet voluptatem, doloremque ab. Expedita ipsum iste aliquid quidem sapiente autem nesciunt fugit?
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
