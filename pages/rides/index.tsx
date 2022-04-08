import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import { SessionUser, User } from "../../services/models/User";
import NotAuthorised from "../../components/NotAuthorised";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { RideQuery, RidesQuery } from "../../services/graphql/queries";


const RideListItem = ({ ride }) => {
    const {start_lat, start_lng, end_lat, end_lng, distance, conveyance, points} = ride;
    return (
        <li>
            <div className="mx-auto my-2 card w-96 bg-base-100 shadow-sm">
                <div className="card-body">
                    <p>{distance.toFixed(2)} km</p>
                    <p>{conveyance}</p>
                </div>
            </div>
        </li>
    )
}

const RidesPage = () => {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    console.log(session);

    const {
        loading: queryLoading,
        error,
        data,
    } = useQuery(RidesQuery, {
        variables: { userId: (session?.user as SessionUser)?.id },
    });

    if (loading) {
        return <></>;
    }
    if (error) {
        return <div>Error</div>
    }
    if (!session) {
        return <NotAuthorised />;
    }
    return (
        <Layout user={session.user as User}>
            {queryLoading ? <div>Loading...</div> : <ul>{data.rides.map(ride => {
                return <RideListItem ride={ride} key={ride.id} />
            })}</ul>}
        </Layout>
    )
}

export default RidesPage