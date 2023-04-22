import { Format, Image } from "../api/classes";

export function addFormats(formats: any) {
  let formatArray: Array<Format> = [];
  formats.forEach((format: any) => {
    let container = format.container
      ? format.container
      : format.type.split("/")[1].split(";")[0];
    if (!format.type.startsWith("audio")) {
      formatArray.push(
        new Format(format.url, format.itag, format.type, container)
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
          format.audioChannels
        )
      );
    }
  });
  return formatArray;
}

export function addThumbnails(thumbnails: any) {
  let thumbnailsArray: Array<Image> = [];
  thumbnails.forEach((thumb: any) => {
    thumbnailsArray.push(
      new Image(thumb.url, thumb.width, thumb.height, thumb.quality)
    );
  });
  return thumbnailsArray;
}

export function fillMixData(author: any, author_id: any, description: any) {
  let mixAuthor = author ? author : "SYSTEM";
  let authorId = author_id ? author_id : "-1";
  let mixDescription = description
    ? description
    : "This playlist was created by the system.";
  return { mixAuthor, authorId, mixDescription };
}
