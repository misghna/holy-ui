import { Box, Typography, Divider } from "@mui/material";
import { object, bool, func, string } from "prop-types";

const VideoDisplayer = ({ item, onDoubleClick, displayContent }) => {
  const videosArray = item.mediaLink;
  return (
    <Box sx={{ cursor: "pointer" }} onDoubleClick={onDoubleClick}>
      {displayContent ? (
        videosArray.map((video, index) => <VideoPlayer videoSrc={video} key={index} />)
      ) : (
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" display="block" gutterBottom>
            {item.date}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" gutterBottom>
            {item.description}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
export default VideoDisplayer;

export const VideoPlayer = ({ videoSrc }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        // Adjust dimensions as needed
        height: 360, // Default height, but consider making this responsive
        width: "100%", // This makes the video player responsive
        "& video": {
          maxHeight: "100%",
          maxWidth: "100%"
        }
      }}
    >
      <video controls src={videoSrc} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
};

VideoDisplayer.propTypes = {
  item: object,
  displayContent: bool,
  onDoubleClick: func
};

VideoPlayer.propTypes = {
  videoSrc: string
};
