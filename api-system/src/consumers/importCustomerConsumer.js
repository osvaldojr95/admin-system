import amqp from "amqplib";
import customerImportServices from "../services/customerImportServices.js";

export async function importCustomerConsumer() {
    try {
        const queueName = 'import-customers';
        const connection = await amqp.connect(process.env.QUEUE_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });

        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                const messageContent = msg.content.toString();
                const parsed = JSON.parse(messageContent);
                await customerImportServices.importFile(parsed.id, parsed.path);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error(`Erro no consumer: ${error.message}`);
    }
}

