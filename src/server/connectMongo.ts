import { connect } from "mongoose";

export const connectMongo = async () => connect(process.env.MONGO_URI!);
