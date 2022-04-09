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
        <span>Brak transakcji do wyświetlenia.</span>
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
    </>
  )
}
