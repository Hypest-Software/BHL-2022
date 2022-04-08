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

export const RideQuery = gql`
  query RideQuery($rideId: String!) {
    ride(rideId: $rideId) {
      id
      start_lat
      start_lng
      end_lat
      end_lng
      time
      distance
      conveyance
      points

      air_co
      air_no
      air_no2
      air_o3
      air_so2
      air_pm2_5
      air_pm10
      air_nh3
    }
  }
`;
