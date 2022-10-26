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

        channel.consume("jobsQueue", message => {
            console.log("Message", message.content.toString());
        })

    } catch (error) {
     console.log("Error", error);   
    }
}