import { Box, Typography, Divider } from "@mui/material";

const YouTubeDisplayer = (item, onDoubleClick, displayContent) => {
  return (
    <Box sx={{ cursor: "pointer" }} onDoubleClick={onDoubleClick}>
      {displayContent ? (
        <YouTubePlayer videoId={item.content} />
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

export const YouTubePlayer = (videoId) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

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
