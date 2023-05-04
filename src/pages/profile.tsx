import React from "react";
import Header from "@/components/Header";
import { authOptions } from "@/config";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";

const Profile = ({
  user,
  expires,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="w-screen h-screen text-gray-700 bg-white flex justify-center">
      <div className="w-2/3 flex flex-col">
        <Header />
        <div className="mt-3">
          {<pre>{JSON.stringify({ user, expires }, null, 2)}</pre>}
        </div>
      </div>
    </div>
  );
};

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return { redirect: { destination: "/" } };
  }
  return {
    props: {
      user: session.user,
      expires: session.expires,
    },
  };
}

export default Profile;
