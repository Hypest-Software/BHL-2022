import { Post } from "../services/models/Post";
import React from "react";
import { PostCard } from "./PostCard";

interface PostsListProps {
  posts: Post[];
}

export default function PostsList(props: PostsListProps) {
  if (props.posts.length == 0) {
    return (
      <div className="text-center">
        <span>No posts to display</span>
      </div>
    );
  }

  return (
    <>
      {props.posts.map((post) => (
        <div key={post.id} className="post">
          <PostCard post={post} />
        </div>
      ))}
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </>
  );
}
