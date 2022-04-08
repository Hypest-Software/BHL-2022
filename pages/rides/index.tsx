import {useSession} from "next-auth/react";
import Layout from "../../components/Layout";
import {SessionUser, User} from "../../services/models/User";
import NotAuthorised from "../../components/NotAuthorised";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { RideQuery,RidesQuery } from "../../services/graphql/queries";

const RidesPage = ()=>{
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
    if(error){
        return <div>Error</div>
    }
    if (!session) {
        return <NotAuthorised />;
    }
    return (
        <Layout user={session.user as User}>
            { queryLoading ? <div>Loading...</div> : <div>{data.rides.map(ride => <div>{ride.id}</div>)}</div> }
        </Layout>
    )
}

export default RidesPage