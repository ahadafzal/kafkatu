import {Kafka} from 'kafkajs';
// import eventType from 'eventType.js';

const host = "localhost:9092"
// const host = "b-1.uat-growth-kafka.su43fi.c2.kafka.ap-south-1.amazonaws.com:9092,b-2.uat-growth-kafka.su43fi.c2.kafka.ap-south-1.amazonaws.com:9092,b-3.uat-growth-kafka.su43fi.c2.kafka.ap-south-1.amazonaws.com:9092"
// const host = "localhost:9092"
const kafkaClient = new Kafka({
  clientId: 'afzal-drip-service',
  brokers: host.split(",")
})
const groupId = "consumer1"
const consumer = kafkaClient.consumer({ groupId });
await consumer.connect()
await consumer.subscribe({ topic: 'push.ucc_generation_complete1' })
await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    })
  },
})

// var consumer = new Kafka.KafkaConsumer({
//   'group.id': 'uat-drip-service-push.ucc_generation_complete',
//   'metadata.broker.list': host,
// }, {});

// console.log("trying to connect...")
// consumer.connect();
// console.log("completed.")

// consumer.on('ready', () => {
//   console.log('consumer ready..')
//   consumer.subscribe(['push.ucc_generation_complete']);
//   consumer.consume();
// }).on('data', function(data) {
//   console.log(`received message: ${data.value}`);
// });