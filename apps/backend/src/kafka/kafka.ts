import "dotenv/config";
import fs from "node:fs";
import {Kafka} from "kafkajs"


export const KAFKA = new Kafka({
  clientId : "employee-management",
  brokers: [process.env.KAFKA_BROKER!],
  ssl:{
    ca:[process.env.KAFKA_CA_CERT!]
  },
  sasl:{
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME!,
    password: process.env.KAFKA_PASSWORD!,
  }
}) 