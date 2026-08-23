import { KAFKA } from "./kafka.js";

const producer = KAFKA.producer();

export const connectProducer = async () => {
  await producer.connect();

  console.log("Kafka Producer Connected");
};
export const sendEmployeeEmail = async (employee:{
  id:string,
  email:string,
  firstName: string,
  lastName:string,
  role:string
})=>{

  await producer.send({
    topic: "employee-events",
    messages:[
      {
        value: JSON.stringify({
          event: "employee.created",
          employee
        })
      }
    ]
  })
}