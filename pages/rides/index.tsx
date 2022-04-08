import {useSession} from "next-auth/react";
import Layout from "../../components/Layout";
import {User} from "../../services/models/User";
import NotAuthorised from "../../components/NotAuthorised";
import React from "react";
import { useQuery } from "@apollo/client";
import { RideQuery } from "../../services/graphql/queries";

const RidesPage = ()=>{
    const { data: session, status } = useSession();
    const loading = status === "loading";

	const {
		loading: queryLoading,
		error,
		data,
	  } = useQuery(RideQuery, {
		variables: { userId: session.user. },
	  });

    if (loading) {
        return <></>;
    }
    if (!session) {
        return <NotAuthorised />;
    }

    return (
        <Layout user={session.user as User}>
            
        </Layout>
    )
}

export default RidesPage