export class Video {
    constructor(title, description, published, views, likes, dislikes, length) {
        this.title = title;
        this.description = description;
        this.published = published;
        this.views = views;
        this.likes = likes;
        this.dislikes = dislikes;
        this.length = length;
    }
}

export class PlaylistVideo {
    constructor(title, id, length) {
        this.title = title;
        this.id = id;
        this.length = length;
    }
}