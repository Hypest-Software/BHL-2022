import Layout from "../components/Layout";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Loading from "../components/Loading";
import { User } from "../services/models/User";
import NotAuthorised from "../components/NotAuthorised";
import TransactionsList from "../components/TransactionsList";
import React from "react";
import { TransactionsListQuery } from "../services/graphql/queries";

const Transactions = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const {
    loading: queryLoading,
    error,
    data,
  } = useQuery(TransactionsListQuery);

  if (loading) {
    return <></>;
  }

  if (!session) {
    return <NotAuthorised />;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <Layout user={session.user as User}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Your transactions
          </h1>
        </div>
      </header>
      <main className="bg-gray-200 shadow">
        <div className="bg-gray-100 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 border-t border-gray-200">
          <div className="layout">
            {queryLoading ? (
              <Loading />
            ) : (
              <TransactionsList transactions={data.transactions} />
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Transactions;
