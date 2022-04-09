import React from 'react'
import {ActiveRideQuery, BoughtTicketQueries, UserQuery} from '../services/graphql/queries'
import {EndRideMutation, StartRideMutation,} from '../services/graphql/mutations'
import {useMutation, useQuery} from '@apollo/client'
import Loading from './Loading'
import {WifiIcon} from '@heroicons/react/outline'
import StartStopRideModal from "./StartStopRideModal";

interface StartStopRideProps {
    userId: string
}

export default function StartStopRide(props: StartStopRideProps) {
    const [isRideModalOpen, setIsRideModalOpen] = React.useState(false)

    const activeRide = useQuery(ActiveRideQuery, {
        variables: {
            userId: props.userId,
        },
    })

    const handleRideModalSubmit = (ticketId) => {
        setIsRideModalOpen(false)

        console.log(ticketId)

        startRide({
            variables: {
                userId: props.userId,
                ticketId: ticketId,
                start_lat: START_LAT,
                start_lng: START_LNG,
                conveyance: 'TRANSIT',
            },
        })
    }

    const [startRide, startRideMutation] = useMutation(StartRideMutation, {
        refetchQueries: [
            {
                query: ActiveRideQuery,
                variables: {
                    userId: props.userId,
                },
            },
            {
                query: BoughtTicketQueries,
                variables: {
                    userId: props.userId,
                },
            }
        ],
    })

    const [endRide, endRideMutation] = useMutation(EndRideMutation, {
        refetchQueries: [
            {
                query: ActiveRideQuery,
                variables: {
                    userId: props.userId,
                },
            },
            {
                query: UserQuery,
                variables: {
                    userId: props.userId,
                },
            },
        ],
    })

    if (activeRide.loading || !activeRide.data) {
        return <Loading/>
    }

    const isRideActive = Boolean(activeRide.data.activeRide)

    const START_LAT = 52.184028
    const START_LNG = 21.025121

    const END_LAT = 52.219795
    const END_LNG = 21.012449

    const handleStartStop = () => {
        if (!isRideActive) {
            setIsRideModalOpen(true)

        } else {
            endRide({
                variables: {
                    userId: props.userId,
                    rideId: activeRide.data.activeRide.id,
                    end_lat: END_LAT,
                    end_lng: END_LNG,
                },
            })
        }
    }

    const getTitle = () => {
        return isRideActive ? 'Zakończ przejazd' : 'Zbliż do czytnika, aby rozpocząć przejazd'
    }

    return (
        <div>
            <button
                className="bg-blue-50 border-solid border-gray-500 border-1 rounded-lg flex flex-col flex-grow justify-center items-center py-8 px-4"
                type="button" onClick={() => handleStartStop()}>
                <WifiIcon className="w-12 h-12 text-gray-400 rotate-90 mb-2"/>
                <div className="text-gray-400">
                    {getTitle()}
                </div>

            </button>
            <StartStopRideModal showModal={isRideModalOpen} setShowModal={setIsRideModalOpen}
                                submit={handleRideModalSubmit}/>
        </div>
    )
}
