import React from "react";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";

const User = ({ session }: { session: Session }) => {
  return (
    <div className="flex space-x-2">
      <img
        src={session?.user?.image || ""}
        alt={session?.user?.name || ""}
        className="rounded-full w-12 h-12"
      />
      <div className="flex flex-col">
        <p>Signed in as:</p>
        <span>{session?.user?.name || session?.user?.email}</span>
      </div>
    </div>
  );
};

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full bg-gray-200 mt-2 rounded-md flex justify-between items-center p-2">
      {!session ? <p>You are not signed in</p> : <User session={session} />}
      <button
        onClick={() => (session ? signOut() : signIn())}
        className="px-3 py-2 text-white font-semibold rounded-md bg-blue-500"
      >
        Sign {session ? "Out" : "In"}
      </button>
    </div>
  );
};

export default Header;
