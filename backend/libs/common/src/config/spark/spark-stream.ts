import eclairjs from 'eclairjs';
const KafkaUtils = eclairjs.streaming.kafka.KafkaUtils;
const spark = new eclairjs();
const { StreamingContext, SparkConf } = spark;

const startSparkStream = (topic: string): void => {
  const sparkConf = new SparkConf().setAppName("CalibrateService").setMaster("local[*]");
  const ssc = new StreamingContext(sparkConf, new spark.Duration(2000));

  const kafkaParams = { "bootstrap.servers": process.env.KAFKA_BROKER! };
  const topics = [topic];
  const stream = KafkaUtils.createDirectStream(ssc, kafkaParams, topics);

  stream.map((record: any) => {
      console.log(record.value());
  });

  ssc.start();
  ssc.awaitTermination();
};

export default startSparkStream;