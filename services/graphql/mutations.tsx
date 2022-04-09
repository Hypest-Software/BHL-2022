import gql from 'graphql-tag'

export const UpdateBalanceMutation = gql`
  mutation UpdateBalanceMutation($id: String!, $amount: Float!) {
    updateBalance(id: $id, amount: $amount) {
      id
      balance
    }
  }
`

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
`

export const StartRideMutation = gql`
  mutation StartRideMutation(
    $userId: String!
    $start_lat: Float!
    $start_lng: Float!
    $conveyance: Conveyance!
  ) {
    startRide(
      userId: $userId
      start_lat: $start_lat
      start_lng: $start_lng
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

export const EndRideMutation = gql`
  mutation EndRideMutation(
    $rideId: String!
    $userId: String!
    $end_lat: Float!
    $end_lng: Float!
  ) {
    endRide(
      rideId: $rideId
      userId: $userId
      end_lat: $end_lat
      end_lng: $end_lng
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

export const DeleteWaypointMutation = gql`
  mutation DeleteWaypointMutation($waypointId: String!) {
    deleteWaypoint(waypointId: $waypointId) {
      id
    }
  }
`