import { trpc } from "../utils/trpc";

function HelloComTRPC() {
  const helloQuery = trpc.hello.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  if (!helloQuery.data) {
    return (
      <h2>
        Loading...
      </h2>
    );
  }

  return (
    <h2>
      {helloQuery.data?.message}
    </h2>
  );
}

export default HelloComTRPC;
