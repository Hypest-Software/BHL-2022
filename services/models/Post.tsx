import { Author } from "./Author";

export interface Post {
  id: string;
  title: string;
  author: Author;
  image: string;
  published: boolean;
  content: string;
}
