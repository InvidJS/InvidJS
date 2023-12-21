/**
 * @name Comment
 * @description Comment object.
 *
 * @param {string} author - Author username.
 * @param {string} author_id - Author ID.
 * @param {string} text - Comment text.
 */
export class Comment {
  public author: string;
  public author_id: string;
  public text: string;
  constructor(author: string, author_id: string, text: string) {
    this.author = author;
    this.author_id = author_id;
    this.text = text;
  }
}
