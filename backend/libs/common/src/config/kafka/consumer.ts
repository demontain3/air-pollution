import kafka from './kafka-config';
const consumer = kafka.consumer({ groupId: 'calibrate-group' });

const consumeMessages = async (topic: string): Promise<void> => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
};

export default consumeMessages;