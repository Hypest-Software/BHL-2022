import { Transaction } from '../services/models/Transaction'
import React from 'react'
import { TransactionCard } from './TransactionCard'

interface TransactionsListProps {
  transactions: Transaction[]
}

export default function TransactionsList(props: TransactionsListProps) {
  if (props.transactions.length == 0) {
    return (
      <div className="text-center">
        <span>No transactions to display</span>
      </div>
    )
  }

  return (
    <>
      {props.transactions.map((transaction) => (
        <div key={transaction.id} className="transaction">
          <TransactionCard transaction={transaction} />
        </div>
      ))}
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </>
  )
}
