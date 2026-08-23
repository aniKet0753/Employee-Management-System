import "dotenv/config";
import fs from "node:fs";
import {Kafka} from "kafkajs"
import { fileURLToPath } from "node:url";


const caPath = fileURLToPath(
  new URL("../../src/certs/ca.pem", import.meta.url)
);

export const KAFKA = new Kafka({
  clientId : "employee-management",
  brokers: [process.env.KAFKA_BROKER!],
  ssl:{
    ca: [fs.readFileSync(caPath, "utf-8")],
  },
  sasl:{
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME!,
    password: process.env.KAFKA_PASSWORD!,
  }
}) 