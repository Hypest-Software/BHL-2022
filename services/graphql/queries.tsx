import gql from 'graphql-tag'

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
`

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
`

export const UserQuery = gql`
  query UserQuery($userId: String!) {
    user(userId: $userId) {
      id
      balance
    }
  }
`

export const TransitInfoQuery = gql`
  query TransitInfoQuery(
    $waypointId: String!
    $originLat: Float!
    $originLng: Float!
  ) {
    transitInfo(
      waypointId: $waypointId
      originLat: $originLat
      originLng: $originLng
    ) {
      arrivalTime
      departureTime
      distance
      duration
      travelMode
    }
  }
`

export const WaypointsQuery = gql`
  query WaypointsQuery($userId: String!) {
    favoriteWaypoints(userId: $userId) {
      id
      name
      lat
      lng
      address
    }
  }
`

export const TransactionQuery = gql`
  query TransactionQuery($transactionId: String!) {
    transaction(transactionId: $transactionId) {
      id
      type
      amount
      createdAt
    }
  }
`
export const TransactionsListQuery = gql`
  query TransactionsListQuery($userId: String!) {
    transactions(userId: $userId) {
      id
      type
      amount
      createdAt
    }
  }
`

export const RideQuery = gql`
  query RideQuery($rideId: String!) {
    ride(rideId: $rideId) {
      id
      start_lat
      start_lng
      end_lat
      end_lng
      distance
      start_time
      end_time
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
`

export const ActiveRideQuery = gql`
  query ActiveRideQuery($userId: String!) {
    activeRide(userId: $userId) {
      id
      start_lat
      start_lng
      end_lat
      end_lng
      distance
      start_time
      end_time
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
`

export const RidesQuery = gql`
  query RidesQuery($userId: String!) {
    rides(userId: $userId) {
      id
      start_lat
      start_lng
      end_lat
      end_lng
      distance
      start_time
      end_time
      points
      conveyance
    }
  }
`

export const TicketsQuery = gql`
  query TicketsQuery {
    tickets {
      id
      name
      price
      duration
    }
  }
`

export const PollutionQuery = gql`
  query PollutionQuery {
    pollutionStatus {
      average
      carbonMonoxide
      particulateMatter10
    }
    pollution {
      carbonMonoxide
      particulateMatter10
    }
  }
`

export const StartRideMutation = gql`
  mutation StartRideMutation(
    $userId: String!
    $start_lat: Float!
    $start_lng: Float!
  ) {
    startRide(userId: $userId, start_lat: $start_lat, start_lng: $start_lng) {
      id
      start_lat
      start_lng
      end_lat
      end_lng
      distance
      start_time
      end_time
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
`

export const EndRideMutation = gql`
  mutation EndRideMutation(
    $rideId: String!
    $userId: String!
    $end_lat: Float!
    $end_lng: Float!
    $conveyance: Conveyance!
  ) {
    endRide(
      rideId: $rideId
      userId: $userId
      end_lat: $end_lat
      end_lng: $end_lng
      conveyance: $conveyance
    ) {
      id
      start_lat
      start_lng
      end_lat
      end_lng
      distance
      start_time
      end_time
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
`
