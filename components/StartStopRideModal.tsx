import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BoughtTicketQueries, TicketsQuery } from '../services/graphql/queries'
import { useSession } from 'next-auth/react'

interface ModalProps {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
  submit: (ticketId: string) => void
}

export default function StartStopRideModal(props: ModalProps) {
  const [ticket, setTicket] = React.useState()
  const [fetchTickets, tickets] = useLazyQuery(TicketsQuery)
  const [fetchBoughtTickets, boughtTickets] = useLazyQuery(BoughtTicketQueries)

  const { data: session, status } = useSession()

  useEffect(() => {
    if (session) {
      fetchTickets({
        variables: {
          userId: session.user.id,
        },
      })
      fetchBoughtTickets({
        variables: {
          userId: session.user.id,
        },
      })
    }
  }, [fetchTickets, fetchBoughtTickets, session])

  const getBoughtTickets = () => {
    return boughtTickets.data.boughtTickets
      .filter((boughtTicket) => boughtTicket.ticketCount > 0)
      .map((boughtTicket) => {
        return {
          ...boughtTicket,
          ...tickets.data.tickets.find(
            (ticket) => ticket.id === boughtTicket.ticketId
          ),
        }
      })
  }

  return (
    <>
      {props.showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Rozpocznij przejazd
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="form-control w-full max-w-xs">
                    <div className="dropdown">
                      <label tabIndex={Number(0)} className="btn m-1">
                        {ticket
                          ? ticket.name + ' - ' + 'x' + ticket.ticketCount
                          : tickets.data && getBoughtTickets().length !== 0
                          ? 'Wybierz bilet'
                          : 'Brak biletów'}
                      </label>
                      <ul
                        tabIndex={Number(0)}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        {tickets.data &&
                          getBoughtTickets().map((ticket) => (
                            <li key={ticket.id}>
                              <a
                                className="dropdown-item"
                                onClick={() => {
                                  setTicket(ticket)
                                }}
                              >
                                {ticket.name} - {'x' + ticket.ticketCount}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    Anuluj
                  </button>
                  <button
                    disabled={
                      boughtTickets.data && getBoughtTickets().length == 0
                    }
                    className="disabled:opacity-50 disabled:cursor-not-allowed bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      props.submit(ticket.id)
                      setTicket(null)
                    }}
                  >
                    Rozpocznij
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
