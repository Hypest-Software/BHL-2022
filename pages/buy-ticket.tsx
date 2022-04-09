import Layout from '../components/Layout'
import Modal from 'react-modal'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { User } from '../services/models/User'
import NotAuthorised from '../components/NotAuthorised'
import React, { useEffect } from 'react'
import {
  UpdateBalanceMutation,
  TransactionCreateMutation,
} from '../services/graphql/mutations'
import { TicketsQuery, UserQuery } from '../services/graphql/queries'
import {router} from "next/client";

const BuyTicket = () => {
  const [ticketPrice, setTicketPrice] = React.useState(0)
  const [ticketName, setTicketName] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const [showSuccess, setShowSuccess] = React.useState(false)

  const { data: session, status } = useSession()

  const [fetchUserData, userData] = useLazyQuery(UserQuery)
  const [fetchTickets, tickets] = useLazyQuery(TicketsQuery)

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

  const [charge, { data, loading, error }] = useMutation(UpdateBalanceMutation)
  const [createTransaction, { data: tData, loading: tLoading, error: tError }] =
    useMutation(TransactionCreateMutation)
  if (loading || tLoading) {
    return <></>
  }

  if (!session) {
    return <NotAuthorised />
  }

  if (error) {
    return <div>Error! {error.message}</div>
  }

  if (tError) {
    return <div>Error! {tError.message}</div>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (ticketPrice > userData.data.user.balance) {
      handleModalShow(e)
      return
    }
    handleSuccessShow(e)

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
          type: 'SINGLE_RIDE',
        },
      })
    })
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
      router.push('/')
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
              {ticketName ? ticketName + " - " + ticketPrice + "zł" : 'Wybierz bilet'}
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
                        setTicketPrice(ticket.price)
                        setTicketName(ticket.name)
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
            <Modal
                isOpen={showModal}
                onRequestClose={handleModalClose}
            >
              <div>
                <h2>Błąd przy zakupie biletu: Brak wystarczającej ilości pieniędzy</h2>
                <button onClick={handleModalClose} className="btn btn-primary">Zamknij</button>
              </div>
              </Modal>
            <Modal
                isOpen={showSuccess}
                onRequestClose={handleSuccessClose}
            >
              <div>
                <h2>Kupiono bilet {ticketName} za {ticketPrice}zł</h2>
              </div>
            </Modal>

          </div>
        </div>
      </main>

    </Layout>

  )
}

export default BuyTicket
