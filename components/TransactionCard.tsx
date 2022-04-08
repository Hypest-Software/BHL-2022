import React from "react";
import { Transaction } from "../services/models/Transaction";

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard = (props: TransactionCardProps) => (
  <a>
    <table>
      <tr>
        <td>{props.transaction.type}</td>
        <td>{props.transaction.date}</td>
        <td>{props.transaction.amount}zł</td>
      </tr>
    </table>
  </a>
);
