import Layout from "../components/Layout";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Loading from "../components/Loading";
import { User } from "../services/models/User";
import NotAuthorised from "../components/NotAuthorised";
import React, { useEffect } from "react";
import { UserQuery } from "../services/graphql/queries";

const Blog = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

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

  if (userData.error) {
    return <div>Error: {userData.error.message}</div>;
  }

  return (
    <Layout user={session.user as User}>
      <header className="bg-white">
        <div className="flex justify-between mx-auto py-6 px-4 items-center max-w-screen-xl">
          <div className="max-w-7xl mx-autosm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-800"><span className="font-normal">Witaj</span> {session.user.name}!</h1>
            <h3 className="text-gray-600">Twoje saldo: <span className="font-semibold">{userData.data ? userData.data.user.balance : 0}zł</span></h3>
          </div>
          <div className="flex-shrink-0">
            <img className="h-14 w-14 rounded-full" src={session.user.image} alt=""/>
          </div>
        </div>
      </header>
      <main className="bg-white shadow">
        <div className="max-w-7xl mx-4 space-y-4 py-4 sm:px-8 lg:px-8">
          <DestinationCard destination_name="Bukowińska 26C" destination_id={1} />
          <DestinationCard destination_name="Politechnika Warszawska" destination_id={2} />
        </div>
      </main>
    </Layout>
  );
};

export default Blog;
