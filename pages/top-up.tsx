import Layout from "../components/Layout";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { User } from "../services/models/User";
import NotAuthorised from "../components/NotAuthorised";
import React, { useEffect } from "react";
import {
  TopUpBalanceMutation,
  TransactionCreateMutation,
} from "../services/graphql/mutations";
import { UserQuery } from "../services/graphql/queries";

const TopUp = () => {
  const [value, setValue] = React.useState(null);

  const { data: session, status } = useSession();

  const [fetchUserData, userData] = useLazyQuery(UserQuery);

  useEffect(() => {
    // @ts-ignore
    if (session && session.user.id) {
      // @ts-ignore
      fetchUserData({ variables: { userId: session.user.id } });
    }
  }, [fetchUserData, session]);

    const [topUp, {data, loading, error}] = useMutation(UpdateBalanceMutation);
    const [createTransaction, {data: tData, loading: tLoading, error: tError}] = useMutation(TransactionCreateMutation);
    if (loading || tLoading) {
        return <></>;
    }

  if (!session) {
    return <NotAuthorised />;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  if (tError) {
    return <div>Error! {tError.message}</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    topUp({
      variables: {
        amount: Number(value),
        id: userData.data.user.id,
      },
    }).then(() => {
      createTransaction({
        variables: {
          amount: Number(value),
          userId: userData.data.user.id,
          type: "TOP_UP",
        },
      });
    });
  };

  return (
    <Layout user={session.user as User}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Top up your balance
          </h1>
        </div>
      </header>
      <main className="bg-gray-200 shadow">
        <div className="bg-gray-100 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 border-t border-gray-200">
          <div>
            <input
              type="number"
              placeholder="Enter top-up amount"
              className="input input-bordered w-full max-w-xs"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
            <button onClick={handleSubmit} className="btn btn-primary">
              Top up
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default TopUp;
