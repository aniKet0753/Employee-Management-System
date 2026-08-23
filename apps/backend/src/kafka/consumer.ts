import "dotenv/config";
import { KAFKA } from "./kafka.js";
import {sendWelcomeEmail} from "../services/email.service.js"

const consumer = KAFKA.consumer({ groupId:"login-emp-group" });
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