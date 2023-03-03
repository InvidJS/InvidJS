export class Video {
    constructor(title, description, published, views, likes, dislikes, length, formats, adaptiveFormats) {
        this.title = title;
        this.description = description;
        this.published = published;
        this.views = views;
        this.likes = likes;
        this.dislikes = dislikes;
        this.length = length;
        this.formats = formats;
        this.adaptiveFormats = adaptiveFormats;
    }
}