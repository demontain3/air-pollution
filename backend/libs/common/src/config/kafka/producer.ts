import kafkaConfig from './kafka-config';
const producer = kafkaConfig.producer();

const sendMessage = async (topic: string, message: Record<string, unknown>): Promise<void> => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }]
  });
  await producer.disconnect();
};

export default sendMessage;