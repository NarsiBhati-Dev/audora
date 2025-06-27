import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const runProducer = async () => {
  try {
    await producer.connect();
    console.log("🚀 Kafka producer connected");

    await producer.send({
      topic: "recording-chunks",
      messages: [
        {
          key: "test-key",
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
