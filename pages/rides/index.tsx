import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import { SessionUser, User } from "../../services/models/User";
import NotAuthorised from "../../components/NotAuthorised";
import React, { useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { RideQuery, RidesQuery } from "../../services/graphql/queries";
import moment from "moment";

const RideListItem = ({ ride }) => {
  const {
    start_lat,
    start_lng,
    end_lat,
    end_lng,
    distance,
    time,
    conveyance,
    points,
  } = ride;

  let date = moment(time).format("DD.MM");
  console.log(time);

  return (
    <div className="bg-gray-100 rounded-lg flex justify-between items-center p-4">
      <div className="flex flex-grow align-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{points} pkt.</h1>
          <h4 className="text-gray-600 font-light">{distance.toFixed(2)}km</h4>
        </div>
        <div className="flex flex-col items-end justify-between">
          <span className="font-light text-gray-600">{conveyance}</span>
          <span className="font-medium">{date}</span>
        </div>
      </div>
    </div>
  );
};

const RidesPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  console.log(session);

  const [fetchRidesData, ridesData] = useLazyQuery(RidesQuery);

  useEffect(() => {
    // @ts-ignore
    if (session && session.user.id) {
      // @ts-ignore
      fetchRidesData({ variables: { userId: session.user.id } });
    }
  }, [fetchRidesData, session]);

  if (!ridesData.called || ridesData.loading) {
    return <></>;
  }

  if (!session) {
    return <NotAuthorised />;
  }

  return (
    <Layout user={session.user as User}>
      <main className="pt-4 px-4">
        <h1 className="font-bold text-3xl">Twoje podróże</h1>
        <div className="space-y-2 flex-col mt-4">
          {ridesData.data.rides.map((ride) => {
            return <RideListItem ride={ride} key={ride.id} />;
          })}
        </div>
      </main>
    </Layout>
  );
};

export default RidesPage;
