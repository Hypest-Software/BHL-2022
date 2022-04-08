export interface Author {
  id: string;
  name: string;
  email: string;
}

export interface Post {
  id: string;
  title: string;
  author: Author;
  image: string;
  published: boolean;
  content: string;
}
