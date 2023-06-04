// Importing Modules
const {Client, Events, GatewayIntentBits} = require('discord.js');
const { token } = require('../config.json');

// Creating the Client
const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, c => {
    console.log("***********************************");
    console.log("Pomo is logged in and ready to go!");
    console.log("***********************************");
})

client.login(token);
