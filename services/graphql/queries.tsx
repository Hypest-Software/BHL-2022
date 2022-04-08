import gql from "graphql-tag";

export const DraftsQuery = gql`
    query DraftsQuery {
        drafts {
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

export const FeedQuery = gql`
    query FeedQuery {
        feed {
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

export const PostQuery = gql`
    query PostQuery($postId: String!) {
        post(postId: $postId) {
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

export const UserQuery = gql`
    query UserQuery($userId: String!) {
        user(userId: $userId) {
            id
            balance
        }
    }
`;

export const TransitInfoQuery = gql`
    query TransitInfoQuery($waypointId: String!, $originLat: Float!, $originLng: Float!) {
        transitInfo(waypointId: $waypointId, originLat: $originLat, originLng: $originLng) {
            arrivalTime
            departureTime
            distance
            duration
            travelMode
        }
    }
`;

export const WaypointsQuery = gql`
    query WaypointsQuery($authorId: String!) {
        favoriteWaypoints(authorId: $authorId) {
            id
            name
            lat
            lng
        }
    }
`;

export const TransactionQuery = gql`
  query TransactionQuery($transactionId: String!) {
    transaction(transactionId: $transactionId) {
      id
      type
      amount
      createdAt
    }
  }
`;
export const TransactionsListQuery = gql`
  query TransactionsListQuery {
    transactions {
      id
      type
      amount
      createdAt
    }
  }
`;
