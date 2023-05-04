import { ClientSafeProvider, signIn } from "next-auth/react";
import React from "react";
import { GitHub } from "react-feather";

const Github: React.FC<{ provider: ClientSafeProvider }> = ({ provider }) => {
  return (
    <div className="w-full flex justify-center mb-2">
      <div
        className="flex items-center space-x-2 bg-stone-800 hover:bg-stone-900 text-white px-4 py-2 rounded-lg cursor-pointer"
        onClick={() => signIn(provider.id)}
      >
        <GitHub />
        <p>Github</p>
      </div>
    </div>
  );
};

export const Provider: React.FC<{ provider: ClientSafeProvider }> = ({
  provider,
}) => {
  if (provider.name === "GitHub") return <Github provider={provider} />;
  return <></>;
};
