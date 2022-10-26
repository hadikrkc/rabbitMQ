const amqp = require("amqplib")

const message = {
    description: "Bu bir test mesajidir.."
}

connect_rabbitmq();

async function connect_rabbitmq(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue("jobsQueue")

        console.log("Message waitnig ...")
        channel.consume("jobsQueue", message => {
            console.log("Message", message.content.toString());
            channel.ack(message);
        })

    } catch (error) {
     console.log("Error", error);   
    }
}