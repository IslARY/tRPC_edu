import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/src/api"

const client = createTRPCProxyClient<AppRouter>({
	links: [httpBatchLink({
		url: "http://localhost:3000/trpc"
	})]
})

async function main() {
	const result = await client.greet.query();
	const validated = await client.validateAndLog.mutate("Am I a String?");

	//! Logging Out The Results
	console.log(`Server Responds: ${result}`);
	console.log(`Server Validates: ${validated}`);
}

main()