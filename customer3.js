// const Kafka = require('node-rdkafka');
import * as Kafka from 'node-rdkafka';
// import eventType from 'eventType.js';

var consumer = new Kafka.KafkaConsumer({
  'group.id': 'consumer3',
  'metadata.broker.list': 'localhost:9092',
}, {});

console.log("trying to connect...")
consumer.connect();
console.log("completed.")

consumer.on('ready', () => {
  console.log('consumer ready..')
  consumer.subscribe(['push.ucc_generation_complete1']);
  consumer.consume();
}).on('data', function(data) {
  console.log(`received message: ${data.value}`);
});