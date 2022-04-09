import Layout from "../components/Layout";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { User } from "../services/models/User";
import NotAuthorised from "../components/NotAuthorised";
import React, { useEffect } from "react";
import {
  UpdateBalanceMutation,
  TransactionCreateMutation,
} from "../services/graphql/mutations";
import { TicketsQuery, UserQuery } from "../services/graphql/queries";

const BuyTicket = () => {
  const [ticketPrice, setTicketPrice] = React.useState(0);
  const [ticketName, setTicketName] = React.useState("");

  const { data: session, status } = useSession();

  const [fetchUserData, userData] = useLazyQuery(UserQuery);
  const [fetchTickets, tickets] = useLazyQuery(TicketsQuery);

  useEffect(() => {
    // @ts-ignore
    if (session && session.user.id) {
      // @ts-ignore
      fetchUserData({ variables: { userId: session.user.id } });
    }
  }, [fetchUserData, session]);

  useEffect(() => {
    if (session) {
      fetchTickets();
    }
  }, [fetchTickets, session]);

  const [charge, { data, loading, error }] = useMutation(UpdateBalanceMutation);
  const [createTransaction, { data: tData, loading: tLoading, error: tError }] =
    useMutation(TransactionCreateMutation);
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
    charge({
      variables: {
        amount: -Number(ticketPrice),
        id: userData.data.user.id,
      },
    }).then(() => {
      createTransaction({
        variables: {
          amount: -Number(ticketPrice),
          userId: userData.data.user.id,
          type: "SINGLE_RIDE",
        },
      });
    });
  };

  return (
    <Layout user={session.user as User}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Buy a ticket</h1>
        </div>
      </header>
      <main className="bg-gray-200 shadow">
        <div className="bg-gray-100 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 border-t border-gray-200">
          <div className="dropdown">
            <label tabIndex={Number(0)} className="btn m-1">
              {ticketName ? ticketName : "Select a ticket"}
            </label>
            <ul
              tabIndex={Number(0)}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {tickets.data &&
                tickets.data.tickets.map((ticket) => (
                  <li key={ticket.id}>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        setTicketPrice(ticket.price);
                        setTicketName(ticket.name);
                      }}
                    >
                      {ticket.name}
                    </a>
                  </li>
                ))}
            </ul>
            <button onClick={handleSubmit} className="btn btn-primary">
              Buy
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default BuyTicket;
