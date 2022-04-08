import Layout from "../components/Layout";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Loading from "../components/Loading";
import { User } from "../services/models/User";
import NotAuthorised from "../components/NotAuthorised";
import PostsList from "../components/PostsList";
import React, { useEffect } from "react";
import { FeedQuery, UserQuery } from "../services/graphql/queries";

const Blog = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const feed = useQuery(FeedQuery);
  const [fetchUserData, userData] = useLazyQuery(UserQuery);

  useEffect(() => {
    // @ts-ignore
    if (session && session.user.id) {
      // @ts-ignore
      fetchUserData({ variables: { userId: session.user.id } });
    }
  }, [fetchUserData, session]);

  if (loading) {
    return <></>;
  }

  if (!session) {
    return <NotAuthorised />;
  }

  console.log(userData.data);

  if (feed.error) {
    return <div>Error: {feed.error.message}</div>;
  }

  if (userData.error) {
    return <div>Error: {userData.error.message}</div>;
  }

  console.log(userData.data);

  return (
    <Layout user={session.user as User}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Witaj {session.user.name}!
          </h1>
          <h3 className="text-gray-900">
            Twoje saldo skarbonki:{" "}
            {userData.data && userData.data.user.balance}zł
          </h3>
        </div>
      </header>
      <main className="bg-gray-200 shadow">
        <div className="bg-gray-100 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 border-t border-gray-200">
          <div className="layout">
            {feed.loading ? <Loading /> : <PostsList posts={feed.data.feed} />}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Blog;
