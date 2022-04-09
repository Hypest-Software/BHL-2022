import Layout from "../components/Layout";
import {useLazyQuery} from "@apollo/client";
import { useSession } from "next-auth/react";
import Loading from "../components/Loading";
import { User } from "../services/models/User";
import NotAuthorised from "../components/NotAuthorised";
import TransactionsList from "../components/TransactionsList";
import React, {useEffect} from "react";
import {TransactionsListQuery} from "../services/graphql/queries";

const Transactions = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const [fetchTransactions, transactions] = useLazyQuery(TransactionsListQuery);

  useEffect(() => {
    // @ts-ignore
    if (session && session.user.id) {
      // @ts-ignore
      fetchTransactions({ variables: { userId: session.user.id } });
    }
  }, [fetchTransactions, session]);


  if (loading || transactions.loading) {
    return <></>;
  }

  if (!session) {
    return <NotAuthorised />;
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
            {!transactions.data || transactions.loading ? (
              <Loading />
            ) : (
              <TransactionsList transactions={transactions.data.transactions} />
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Transactions;
