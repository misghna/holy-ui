import { object, bool } from "prop-types";

import AudioTrackDisplay from "./AudioPlayer";
import ImageDisplayer from "./ImageDisplayer";
import PdfDisplayer from "./PdfDisplayer";
import TextDisplayer from "./TextDisplayer";
import VideoDisplayer from "./VideoDisplayer";
import YouTubeDisplayer from "./YouTubeDisplayer";

const ContentViewer = ({ item, displayContent }) => {
  if (!displayContent && ["image"].includes(item.type)) {
    return item.mediaLink[0]; // Assuming item.content is an array of URLs
  }
  
  switch (item.type) {
    case "html":
      return <TextDisplayer item={item} displayContent={displayContent} />;
    case "image":
      return <ImageDisplayer item={item} displayContent={displayContent} />;
    case "audio":
      return <AudioTrackDisplay item={item} displayContent={displayContent} />;
    case "youtube":
      return <YouTubeDisplayer item={item} displayContent={displayContent} />;
    case "video":
      return <VideoDisplayer item={item} displayContent={displayContent} />;
    case "pdf":
      return <PdfDisplayer item={item} displayContent={displayContent} />;
    default:
      return <div>Unsupported content type</div>;
  }
};

ContentViewer.propTypes = {
  item: object,
  displayContent: bool
};

export default ContentViewer;
