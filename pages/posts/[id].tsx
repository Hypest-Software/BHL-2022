import Layout from "../../components/Layout";
import Router, { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import Loading from "../../components/Loading";
import { User } from "../../services/models/User";
import { useSession } from "next-auth/react";
import {
  DraftsQuery,
  FeedQuery,
  PostQuery,
} from "../../services/graphql/queries";
import {
  DeleteMutation,
  PublishMutation,
} from "../../services/graphql/mutations";
import React from "react";
import NotAuthorised from "../../components/NotAuthorised";

function PostPage() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const postId = useRouter().query.id;
  const {
    loading: queryLoading,
    error,
    data,
  } = useQuery(PostQuery, {
    variables: { postId },
  });

  const [publish] = useMutation(PublishMutation, {
    refetchQueries: [{ query: DraftsQuery }, { query: FeedQuery }],
  });
  const [deletePost] = useMutation(DeleteMutation, {
    refetchQueries: [{ query: DraftsQuery }, { query: FeedQuery }],
  });

  const getPostTitle = () => {
    let title = data.post.title;
    if (!data.post.published) {
      title = `${title} (Draft)`;
    }
    return title;
  };

  const getAuthorName = () => {
    return data.post.author ? data.post.author.name : "Unknown author";
  };

  if (loading) {
    return <></>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!session) {
    return <NotAuthorised />;
  }

  return (
    <Layout user={session.user as User}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
        </div>
      </header>
      <main className="bg-gray-200 shadow">
        <div className="bg-gray-100 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 border-t border-gray-200">
          <div className="layout">
            <main>
              {queryLoading ? (
                <Loading />
              ) : (
                <div>
                  <h2>{getPostTitle()}</h2>
                  <p>By {getAuthorName()}</p>
                  <p>{data.post.content}</p>
                  {!data.post.published && (
                    <button
                      onClick={async (e) => {
                        await publish({
                          variables: {
                            postId,
                          },
                        });
                        Router.push("/");
                      }}
                    >
                      Publish
                    </button>
                  )}
                  <button
                    onClick={async (e) => {
                      await deletePost({
                        variables: {
                          postId,
                        },
                      });
                      Router.push("/");
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </main>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
}

export default PostPage;
