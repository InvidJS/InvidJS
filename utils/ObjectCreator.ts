import { Format } from "../api/classes/Format.js";
import { Image } from "../api/classes/Image.js";

export const addFormats = (formats: any): Format[] => {
  const formatArray: Array<Format> = [];
  formats.forEach((format: any) => {
    const container = format.container
      ? format.container
      : format.type.split("/")[1].split(";")[0];
    if (!format.type.startsWith("audio")) {
      formatArray.push(
        new Format(format.url, format.itag, format.type, container),
      );
    } else {
      formatArray.push(
        new Format(
          format.url,
          format.itag,
          format.type,
          container,
          format.audioQuality,
          format.audioSampleRate,
          format.audioChannels,
        ),
      );
    }
  });
  return formatArray;
};

export const addThumbnails = (thumbnails: any): Image[] => {
  const thumbnailsArray: Array<Image> = [];
  thumbnails.forEach((thumb: any) => {
    thumbnailsArray.push(
      new Image(thumb.url, thumb.width, thumb.height, thumb.quality),
    );
  });
  return thumbnailsArray;
};

export const fillMixData = (author: any, author_id: any, description: any) => {
  const mixAuthor = author ? author : "SYSTEM";
  const authorId = author_id ? author_id : "-1";
  const mixDescription = description
    ? description
    : "This playlist was created by the system.";
  return { mixAuthor, authorId, mixDescription };
};
