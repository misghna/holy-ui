import { Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import CardView from "~/components/Card";
const backgroundImages = [
  "https://picsum.photos/id/102/4320/3240",
  "https://picsum.photos/id/103/2592/1936",
  "https://picsum.photos/id/104/3840/2160",
  "https://picsum.photos/id/106/2592/1728",
  "https://picsum.photos/id/107/5000/3333",
  "https://picsum.photos/id/108/2000/1333",
  "https://picsum.photos/id/109/4287/2392",
  "https://picsum.photos/id/110/5000/3333",
  "https://picsum.photos/id/111/4400/2656",
  "https://picsum.photos/id/112/4200/2800",
  "https://picsum.photos/id/113/4168/2464",
  "https://picsum.photos/id/114/3264/2448",
  "https://picsum.photos/id/115/1500/1000",
  "https://picsum.photos/id/116/3504/2336",
  "https://picsum.photos/id/117/1544/1024",
  "https://picsum.photos/id/118/1500/1000",
  "https://picsum.photos/id/119/3264/2176",
  "https://picsum.photos/id/120/4928/3264",
  "https://picsum.photos/id/121/1600/1067",
  "https://picsum.photos/id/122/4147/2756",
  "https://picsum.photos/id/123/4928/3264",
  "https://picsum.photos/id/124/3504/2336",
  "https://picsum.photos/id/125/1500/1000",
  "https://picsum.photos/id/126/4272/2511",
  "https://picsum.photos/id/127/4032/2272",
  "https://picsum.photos/id/128/3823/2549",
  "https://picsum.photos/id/129/4910/3252",
  "https://picsum.photos/id/130/3807/2538",
  "https://picsum.photos/id/131/4698/3166",
  "https://picsum.photos/id/132/1600/1066",
  "https://picsum.photos/id/133/2742/1828",
  "https://picsum.photos/id/134/4928/3264",
  "https://picsum.photos/id/135/2560/1920",
  "https://picsum.photos/id/136/4032/2272",
  "https://picsum.photos/id/137/4752/3168",
  "https://picsum.photos/id/139/3465/3008",
  "https://picsum.photos/id/140/2448/2448",
  "https://picsum.photos/id/141/2048/1365",
  "https://picsum.photos/id/142/4272/2848",
  "https://picsum.photos/id/143/3600/2385",
  "https://picsum.photos/id/144/4912/2760",
  "https://picsum.photos/id/145/4288/2848",
  "https://picsum.photos/id/146/5000/3333",
  "https://picsum.photos/id/147/2448/2448",
  "https://picsum.photos/id/149/3454/2288",
  "https://picsum.photos/id/151/4288/3216",
  "https://picsum.photos/id/152/3888/2592",
  "https://picsum.photos/id/153/4763/3155",
  "https://picsum.photos/id/154/3264/2176",
  "https://picsum.photos/id/155/3264/2176",
  "https://picsum.photos/id/156/2177/3264",
  "https://picsum.photos/id/157/5000/3914",
  "https://picsum.photos/id/158/4836/3224",
  "https://picsum.photos/id/159/5000/2460",
  "https://picsum.photos/id/160/3200/2119",
  "https://picsum.photos/id/161/4240/2832",
  "https://picsum.photos/id/162/1500/998",
  "https://picsum.photos/id/163/2000/1333",
  "https://picsum.photos/id/164/1200/800",
  "https://picsum.photos/id/165/2000/1333",
  "https://picsum.photos/id/166/1280/720",
  "https://picsum.photos/id/167/2896/1944",
  "https://picsum.photos/id/168/1920/1280",
  "https://picsum.photos/id/169/2500/1662",
  "https://picsum.photos/id/170/2500/1667",
  "https://picsum.photos/id/171/2048/1536",
  "https://picsum.photos/id/172/2000/1325",
  "https://picsum.photos/id/173/1200/737",
  "https://picsum.photos/id/174/1600/589",
  "https://picsum.photos/id/175/2896/1944",
  "https://picsum.photos/id/176/2500/1662",
  "https://picsum.photos/id/177/2515/1830",
  "https://picsum.photos/id/178/2592/1936",
  "https://picsum.photos/id/179/2048/1365",
  "https://picsum.photos/id/180/2400/1600",
  "https://picsum.photos/id/181/1920/1189",
  "https://picsum.photos/id/182/2896/1944",
  "https://picsum.photos/id/183/2316/1544",
  "https://picsum.photos/id/184/4288/2848",
  "https://picsum.photos/id/185/3995/2662",
  "https://picsum.photos/id/186/2048/1275",
  "https://picsum.photos/id/187/4000/2667",
  "https://picsum.photos/id/188/2896/1936",
  "https://picsum.photos/id/189/2048/1536",
  "https://picsum.photos/id/190/2048/1365",
  "https://picsum.photos/id/191/2560/1707",
  "https://picsum.photos/id/192/2352/2352",
  "https://picsum.photos/id/193/3578/2451",
  "https://picsum.photos/id/194/2000/1325",
  "https://picsum.photos/id/195/768/1024",
  "https://picsum.photos/id/196/2048/1536",
  "https://picsum.photos/id/197/4272/2848",
  "https://picsum.photos/id/198/3456/2304",
  "https://picsum.photos/id/199/2592/1728",
  "https://picsum.photos/id/200/1920/1280",
  "https://picsum.photos/id/201/5000/3333",
  "https://picsum.photos/id/202/2392/1260",
  "https://picsum.photos/id/203/4032/3024",
  "https://picsum.photos/id/204/5000/3333",
  "https://picsum.photos/id/206/2880/1800"
];

const shuffledBackgroundImages = [...backgroundImages].sort(() => Math.random() - 0.5);
const cardData = [
  {
    id: 1,
    type: "text",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "First Post",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    mediaLink: shuffledBackgroundImages.shift(),
    contentCategory: "News"
  },
  {
    id: 2,
    type: "image",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Second Post with Image",
    content: "This is a post with an image.",
    mediaLink: shuffledBackgroundImages.shift(),
    contentCategory: "Pictures"
  },
  {
    id: 3,
    type: "video",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Third Post with Video",
    content: "This is a post with a video.",
    mediaLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    contentCategory: "Video"
  },
  {
    id: 4,
    type: "text",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Fourth Post - Donate",
    content: "You can donate here.",
    mediaLink: "",
    contentCategory: "Donate"
  },
  {
    id: 5,
    type: "text",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Fifth Post - Prayer",
    content: "Let us join in prayer.",
    mediaLink: "",
    contentCategory: "Prayer"
  },
  {
    id: 6,
    type: "text",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Sixth Post - Bible Verse",
    content:
      "John 3:16 For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    mediaLink: "",
    contentCategory: "Bible"
  },
  {
    id: 7,
    type: "text",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Seventh Post - Home",
    content: "Welcome to our homepage.",
    mediaLink: "",
    contentCategory: "Home"
  },
  {
    id: 8,
    type: "text",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Eighth Post - News",
    content: "Breaking news: The world is round.",
    mediaLink: "",
    contentCategory: "News"
  },
  {
    id: 9,
    type: "text",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Ninth Post - Text",
    content: "This is the ninth post with text content.",
    mediaLink: "",
    contentCategory: "Home"
  },
  {
    id: 10,
    type: "image",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Tenth Post with Image",
    content: "",
    mediaLink: shuffledBackgroundImages.shift(),
    contentCategory: "Pictures"
  },
  {
    id: 11,
    type: "video",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Eleventh Post with Video",
    content: "",
    mediaLink: "https://www.youtube.com/embed/kjgFJ598t2s",
    contentCategory: "Video"
  },
  {
    id: 12,
    type: "text",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Twelfth Post - Donate",
    content: "",
    mediaLink: "",
    contentCategory: "Donate"
  },
  {
    id: 13,
    type: "text",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Thirteenth Post - Prayer",
    content: "",
    mediaLink: "",
    contentCategory: "Prayer"
  },
  {
    id: 14,
    type: "text",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Fourteenth Post - Bible Verse",
    content: "",
    mediaLink: "",
    contentCategory: "Bible"
  },
  {
    id: 15,
    type: "text",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Fifteenth Post - Home",
    content: "",
    mediaLink: "",
    contentCategory: "Home"
  },
  {
    id: 16,
    type: "image",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Sixteenth Post with Image",
    content: "",
    mediaLink: shuffledBackgroundImages.shift(),
    contentCategory: "Pictures"
  },
  {
    id: 17,
    type: "video",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Seventeenth Post with Video",
    content: "",
    mediaLink: "https://www.youtube.com/embed/pQRstvTDS0w",
    contentCategory: "Video"
  },
  {
    id: 18,
    type: "text",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Eighteenth Post - Donate",
    content: "",
    mediaLink: "",
    contentCategory: "Donate"
  },
  {
    id: 19,
    type: "text",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Nineteenth Post - Prayer",
    content: "",
    mediaLink: "",
    contentCategory: "Prayer"
  },
  {
    id: 20,
    type: "text",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Twentieth Post - Bible Verse",
    content: "",
    mediaLink: "",
    contentCategory: "Bible"
  },
  {
    id: 21,
    type: "text",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Twenty-first Post - Home",
    content: "",
    mediaLink: "",
    contentCategory: "Home"
  },
  {
    id: 22,
    type: "image",
    backgroundImg: shuffledBackgroundImages.shift(),
    title: "Twenty-second Post with Image",
    content: "",
    mediaLink: "https://example.com/image22.png",
    contentCategory: "Pictures"
  }
];

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  grid: {
    width: "100%"
  }
}));

export default function GridView() {
  const classes = useStyles();

  return (
    <Box>
      <Grid container className={classes.grid}>
        {cardData.map((data) => (
          <Grid item xs={12} sm={4} key={data.id}>
            <CardView data={data} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
