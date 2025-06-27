import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

// const runProducer = async () => {
//   try {
//     await producer.connect();
//     console.log("🚀 Kafka producer connected");

//     await producer.send({
//       topic: "quickstart-events",
//       messages: [
//         {
//           key: "test-key", // optional but good for partitioning consistency
//           value: "Hello, Kafka! ",
//         },
//       ],
//     });

//     console.log("✅ Message sent to Kafka");
//   } catch (error) {
//     console.error("❌ Producer error:", error);
//   } finally {
//     await producer.disconnect();
//     console.log("🛑 Kafka producer disconnected");
//   }
// };

const runProducer = async () => {
  try {
    await producer.connect();
    console.log("🚀 Kafka producer connected");

    await producer.send({
      topic: "recording-chunks",
      messages: [
        {
          //   key: "test-key", // optional but good for partitioning consistency
          value: "Recording chunk",
        },
      ],
    });

    console.log("✅ Message sent to Kafka");
  } catch (error) {
    console.error("❌ Producer error:", error);
  } finally {
    await producer.disconnect();
    console.log("🛑 Kafka producer disconnected");
  }
};

runProducer();
