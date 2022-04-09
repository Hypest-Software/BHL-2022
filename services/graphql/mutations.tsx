import gql from "graphql-tag";

export const TopUpBalanceMutation = gql`
  mutation TopUpBalanceMutation($id: String!, $amount: Float!) {
    topUpBalance(id: $id, amount: $amount) {

export const UpdateBalanceMutation = gql`
  mutation UpdateBalanceMutation($id: String!, $amount: Float!) {
    updateBalance(id: $id, amount: $amount) {
      id
      balance
    }
  }
`;

export const TransactionCreateMutation = gql`
  mutation TransactionCreateMutation(
    $type: TransactionType!
    $userId: String!
    $amount: Float!
  ) {
    createTransaction(type: $type, userId: $userId, amount: $amount) {
      id
      type
      amount
    }
  }
`;
