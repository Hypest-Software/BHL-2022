import Link from "next/link";
import React from "react";
import { Post } from "../services/models/Post";

interface PostCardProps {
  post: Post;
}

export const PostCard = (props: PostCardProps) => (
  <Link href="/posts/[id]" as={`/posts/${props.post.id}`}>
    <a>
      <h2>{props.post.title}</h2>
      <small>
        By {props.post.author ? props.post.author.name : "Unknown Author"}
      </small>
      <p>{props.post.content}</p>
      <style jsx>{`
        a {
          text-decoration: none;
          color: inherit;
          padding: 2rem;
          display: block;
        }
      `}</style>
    </a>
  </Link>
);
