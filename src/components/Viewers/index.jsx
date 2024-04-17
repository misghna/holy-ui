import { object, bool } from "prop-types";

import AudioTrackDisplay from "./AudioPlayer";
import ImageDisplayer from "./ImageDisplayer";
import PdfDisplayer from "./PdfDisplayer";
import TextDisplayer from "./TextDisplayer";
import VideoDisplayer from "./VideoDisplayer";
import YouTubeDisplayer from "./YouTubeDisplayer";

const ContentViewer = ({ item, displayContent }) => {
  if (!displayContent && ["image"].includes(item.type)) {
    return item.media_link[0]; // Assuming item.content is an array of URLs
  }

  const mapping = {
    html: <TextDisplayer item={item} displayContent={displayContent} />,
    image: <ImageDisplayer item={item} displayContent={displayContent} />,
    audio: <AudioTrackDisplay item={item} displayContent={displayContent} />,
    youtube: <YouTubeDisplayer item={item} displayContent={displayContent} />,
    video: <VideoDisplayer item={item} displayContent={displayContent} />,
    pdf: <PdfDisplayer item={item} displayContent={displayContent} />
  };
  return mapping[item.type] || <div>Unsupported content type</div>;
};

ContentViewer.propTypes = {
  item: object,
  displayContent: bool
};

export default ContentViewer;
