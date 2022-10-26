const amqp = require("amqplib")

const message = {
    description: "This is a test message,,"
}

const queueName = process.argv[2] || "jobsQueue"

connect_rabbitmq();

async function connect_rabbitmq(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queueName)
    
        setInterval(() => {
            message.description = new Date().getTime()
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)))
            console.log("Sent messages: ", message);
        }, 1000);
    } catch (error) {
     console.log("Error", error);   
    }
}