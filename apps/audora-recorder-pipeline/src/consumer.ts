import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: "my-app3",
});

// const consumer2 = kafka.consumer({
//   groupId: "test-group2",
// });

// const runConsumer = async () => {
//   await consumer.connect();
//   await consumer.subscribe({
//     topic: "quickstart-events",
//     fromBeginning: true,
//   });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       if (!message.value) {
//         return;
//       }

//       console.log({
//         topic,
//         partition,
//         offset: message.offset,
//         value: message.value.toString(),
//       });
//     },
//   });
// };

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "recording-chunks",
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
