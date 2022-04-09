import Layout from '../components/Layout'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { User } from '../services/models/User'
import NotAuthorised from '../components/NotAuthorised'
import React, { useEffect } from 'react'
import { BuyTicketMutation } from '../services/graphql/mutations'
import { TicketsQuery, UserQuery } from '../services/graphql/queries'

const BuyTicket = () => {
  const [ticket, setTicket] = React.useState()

  const { data: session, status } = useSession()

  const [fetchUserData, userData] = useLazyQuery(UserQuery)
  const [fetchTickets, tickets] = useLazyQuery(TicketsQuery)

  const [buyTicket, buyTicketMutation] = useMutation(BuyTicketMutation)

  useEffect(() => {
    // @ts-ignore
    if (session && session.user.id) {
      // @ts-ignore
      fetchUserData({ variables: { userId: session.user.id } })
    }
  }, [fetchUserData, session])

  useEffect(() => {
    if (session) {
      fetchTickets()
    }
  }, [fetchTickets, session])

  if (tickets.loading) {
    return <></>
  }

  if (!session) {
    return <NotAuthorised />
  }

  if (tickets.error) {
    return <div>Error! {tickets.error.message}</div>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (ticket) {
      buyTicket({
        variables: {
          ticketId: ticket.id,
          userId: session.user.id,
        },
        refetchQueries: [
          { query: UserQuery, variables: { userId: session.user.id } },
        ],
      })
    }
  }

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
              {ticket ? ticket.name : 'Select a ticket'}
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
                        setTicket(ticket)
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
  )
}

export default BuyTicket
