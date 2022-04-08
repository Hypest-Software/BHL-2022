import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { User } from "../services/models/User";
import NotAuthorised from "../components/NotAuthorised";
import { CreateDraftMutation } from "../services/graphql/mutations";
import { DraftsQuery } from "../services/graphql/queries";

function Draft(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  const { data: session, status } = useSession();
  const loading = status === "loading";

  const [createDraft, { loading: queryLoading, error, data }] = useMutation(
    CreateDraftMutation,
    {
      refetchQueries: [{ query: DraftsQuery }],
    }
  );

  if (loading) {
    return <></>;
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
            <div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  await createDraft({
                    variables: {
                      title,
                      content,
                      authorEmail,
                    },
                  });
                  Router.push("/drafts");
                }}
              >
                <h1>Create Draft</h1>
                <input
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  type="text"
                  value={title}
                />
                <input
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="Author (email adress)"
                  type="text"
                  value={authorEmail}
                />
                <textarea
                  cols={50}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Content"
                  rows={8}
                  value={content}
                />
                <input
                  disabled={!content || !title || !authorEmail}
                  type="submit"
                  value="Create"
                />
                <a className="back" href="#" onClick={() => Router.push("/")}>
                  or Cancel
                </a>
              </form>
            </div>
          </div>
        </div>
      </main>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
}

export default Draft;
