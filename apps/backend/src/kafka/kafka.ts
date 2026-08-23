import "dotenv/config";
import fs from "node:fs";
import {Kafka} from "kafkajs"

export const KAFKA = new Kafka({
  clientId : "employee-management",
  brokers: [process.env.KAFKA_BROKER!],
  ssl:{
    ca: [fs.readFileSync("./src/certs/ca.pem","utf-8")]
  },
  sasl:{
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME!,
    password: process.env.KAFKA_PASSWORD!,
  }
}) 