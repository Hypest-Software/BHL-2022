import Layout from '../components/Layout'
import Modal from 'react-modal'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { User } from '../services/models/User'
import NotAuthorised from '../components/NotAuthorised'
import React, { useEffect } from 'react'
import { TicketsQuery, UserQuery } from '../services/graphql/queries'
import {router} from "next/client";
import {BuyTicketMutation} from "../services/graphql/mutations";

const BuyTicket = () => {
  const [ticket, setTicket] = React.useState()
  const [showModal, setShowModal] = React.useState(false)
  const [showSuccess, setShowSuccess] = React.useState(false)

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
      if (ticket.price > userData.data.user.balance) {
        handleModalShow(e)
        return
      }

      buyTicket({
        variables: {
          ticketId: ticket.id,
          userId: session.user.id,
        },
        refetchQueries: [
          { query: UserQuery, variables: { userId: session.user.id } },
        ],
      })

      handleSuccessShow(e)
    }
    else {
      handleModalShow(e)
    }
  }

  const handleModalShow = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  const handleModalClose = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  const handleSuccessShow = (e) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => {
      // router.push('/')
    }, 3000)
  }

  const handleSuccessClose = (e) => {
    e.preventDefault()
    setShowSuccess(false)
  }


  return (
    <Layout user={session.user as User}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Kup bilet</h1>
        </div>
      </header>
      <main className="bg-gray-200 shadow">
        <div className="bg-gray-100 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 border-t border-gray-200">
          <div className="dropdown">
            <label tabIndex={Number(0)} className="btn m-1">
              {ticket ? ticket.name + " - " + ticket.price: 'Select a ticket'}
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
                      {ticket.name} - {ticket.price}zł
                    </a>
                  </li>
                ))}
            </ul>
            <button onClick={handleSubmit} className="btn btn-primary">
              Kup
            </button>
            <Modal isOpen={showModal} onRequestClose={handleModalClose}>
              <div>
                <h2>
                  Błąd przy zakupie biletu: Brak wystarczającej ilości pieniędzy
                </h2>
                <button onClick={handleModalClose} className="btn btn-primary">
                  Zamknij
                </button>
              </div>
              </Modal>
            <Modal
                isOpen={showSuccess}
                onRequestClose={handleSuccessClose}
            >
              <div>
                {ticket && <h2>Kupiono bilet {ticket.name} za {ticket.price}zł</h2>}
              </div>
            </Modal>

          </div>
        </div>
      </main>
    </Layout>
  )
}

export default BuyTicket
