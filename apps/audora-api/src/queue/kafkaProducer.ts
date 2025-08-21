import { Kafka } from "kafkajs";

export const kafkaProducer = async (
  sessionId: string,
  data: Buffer,
  isFinal: boolean
) => {
  const producer = new Kafka({
    clientId: "audora-api",
    brokers: ["localhost:9092"],
  }).producer();

  await producer.connect();
  await producer.send({
    topic: "recording-chunks",
    messages: [{ value: JSON.stringify({ sessionId, data, isFinal }) }],
  });
};
