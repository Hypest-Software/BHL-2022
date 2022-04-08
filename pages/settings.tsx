import React, {useEffect} from "react";
import Layout from "../components/Layout";
import {useSession} from "next-auth/react";
import {User} from "../services/models/User";
import NotAuthorised from "../components/NotAuthorised";
import {useLazyQuery} from "@apollo/client";
import {WaypointsQuery} from "../services/graphql/queries";
import Loading from "../components/Loading";
import WaypointsList from "../components/WaypointsList";
;
function Settings(props) {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    const [fetchWaypoints, waypoints] = useLazyQuery(WaypointsQuery);

    useEffect(() => {
        // @ts-ignore
        if (session && session.user.id) {
            console.log(session)
            // @ts-ignore
            fetchWaypoints({variables: {authorId: session.user.id}});
        }
    }, [fetchWaypoints, session]);

    if (loading || waypoints.loading) {
        return <></>;
    }

    if (!session) {
        return <NotAuthorised/>;
    }

    return (
        <Layout user={session.user as User}>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                </div>
            </header>
            <main className="bg-gray-200 shadow">
                <div className="bg-gray-100 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 border-t border-gray-200">
                    <div className="layout">
                        <h2 className="text-3xl font-bold text-gray-900">Favorite waypoints</h2>
                        <div>add waypoint</div>
                        {!waypoints.data || waypoints.loading ? <Loading/> : <WaypointsList waypoints={waypoints.data.favoriteWaypoints}/>}
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default Settings;
