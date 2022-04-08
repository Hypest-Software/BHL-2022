import React, {useState} from "react";
import Layout from "../components/Layout";
import {useSession} from "next-auth/react";
import {User} from "../services/models/User";
import NotAuthorised from "../components/NotAuthorised";

function Settings(props) {
    const {data: session, status} = useSession();
    const loading = status === "loading";

    if (loading) {
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
                        test
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default Settings;
