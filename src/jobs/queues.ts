import { Queue } from "bullmq";

const connection = {
  host: process.env.REDIS_HOST ?? "localhost",
  port: Number(process.env.REDIS_PORT ?? 6379),
};

export const linkCheckQueue = new Queue("link-check", { connection });
export const analyticsSyncQueue = new Queue("analytics-sync", { connection });
