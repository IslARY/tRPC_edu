import express from "express";
import cors from "cors";
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

const t = initTRPC.create();

//! Express Related Initializations
const app = express();
//! END

const appRouter = t.router({
	greet: t.procedure.query(() => {
		return "Well, Hello There!!";
	}),
	validateAndLog: t.procedure.input((v) => {
		if (typeof v === "string") return v;
		throw new Error("Invalid Input: Expected String");
	}).mutation(req => {
		console.log(`Client says: ${req.input}`);
		return "Valid";
	})
})

app.use(cors({origin: "http://localhost:5173"})); //? Cross Origin Resource Sharing
app.use("/trpc", createExpressMiddleware({router: appRouter}));
app.listen(3000);

export type AppRouter = typeof appRouter