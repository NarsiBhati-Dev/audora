import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "audora-recorder-pipeline",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "audora-recorder-pipeline" });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "audora-recorder-pipeline",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) {
        return;
      }

      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

runConsumer().catch(console.error);
