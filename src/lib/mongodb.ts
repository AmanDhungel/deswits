import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable. Add it to .env.local");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function connect(): Promise<MongoClient> {
  return new MongoClient(uri!).connect();
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Reuse the client across HMR reloads in dev so we don't exhaust
  // connections. If the initial connection attempt fails (e.g. the local
  // Mongo instance wasn't up yet), clear the cache so the next request
  // retries instead of replaying the same rejected promise forever.
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = connect().catch((err) => {
      global._mongoClientPromise = undefined;
      throw err;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = connect();
}

export default clientPromise;

export async function getDb() {
  const client = await clientPromise;
  return client.db();
}
