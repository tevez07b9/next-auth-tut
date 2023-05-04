import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config";
import { Provider } from "@/components/ProviderBtns";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center text-gray-700">
      <div className="p-3 bg-gray-200 rounded-lg min-w-[40%]">
        {Object.values(providers).map((provider) => (
          <Provider key={provider.name} provider={provider} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: {
      providers: providers ?? [],
    },
  };
}
