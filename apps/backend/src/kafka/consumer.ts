import "dotenv/config";
import { KAFKA } from "./kafka.js";
import {sendWelcomeEmail} from "../services/email.service.js"
import { createServer } from "node:http";


const consumer = KAFKA.consumer({ groupId:"login-emp-group" });
const PORT = Number(process.env.PORT) || 10000;
// Small HTTP server so Render sees this as a healthy Web Service
const server = createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      status: "ok",
      service: "kafka-worker",
    })
  );
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Kafka Worker HTTP server running on port ${PORT}`);
});

await consumer.connect();
console.log("Kafka Consumer Connected");

await consumer.subscribe({
  topic:"employee-events", fromBeginning: false,
})

await consumer.run({
  eachMessage: async ({message})=>{
    if(!message.value){
      return
    }
    const event = JSON.parse(
      message.value.toString()
    )
    if(event.event === "employee.created"){
      const employee = event.employee;
      await sendWelcomeEmail({
        email:employee.email,
        firstName: employee.firstName,
        lastName:employee.lastName,
        role: employee.role,
      })
    }
  }
})