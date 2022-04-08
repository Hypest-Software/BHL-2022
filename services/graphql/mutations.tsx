import gql from "graphql-tag";

export const CreateDraftMutation = gql`
  mutation CreateDraftMutation(
    $title: String!
    $content: String
    $authorEmail: String!
  ) {
    createDraft(title: $title, content: $content, authorEmail: $authorEmail) {
      id
      title
      content
      published
      author {
        id
        name
      }
    }
  }
`;

export const SignupMutation = gql`
  mutation SignupMutation($name: String, $email: String!) {
    signupUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const TransactionCreateMutation = gql`
  mutation TransactionCreateMutation(
    $type: String!
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
