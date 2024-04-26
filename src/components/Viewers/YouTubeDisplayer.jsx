import { Box, Typography, Divider } from "@mui/material";
import { object, bool, func, array } from "prop-types";

const YouTubeDisplayer = ({ item, onDoubleClick, displayContent }) => {
  return (
    <Box sx={{ cursor: "pointer" }} onDoubleClick={onDoubleClick}>
      {displayContent ? (
        item.media_link.map((video, index) => <YouTubePlayer videoId={video} key={index} />)
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
export default YouTubeDisplayer;

export const YouTubePlayer = ({ videoId }) => {
  const url = new URL(videoId.file_name);
  const embedUrl = `https://www.youtube.com/embed${url.pathname}`;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%", // Responsive width
        paddingTop: "56.25%", // 16:9 Aspect Ratio
        "& iframe": {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }
      }}
    >
      <iframe
        src={embedUrl}
        // frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube"
      />
    </Box>
  );
};

YouTubeDisplayer.propTypes = {
  item: object,
  displayContent: bool,
  onDoubleClick: func
};

YouTubePlayer.propTypes = {
  videoId: array
};
