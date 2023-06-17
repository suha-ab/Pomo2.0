// Importing Modules
const fs = require('node:fs')
const {Client, Collection, Events, GatewayIntentBits} = require('discord.js');
const { token } = require('../config.json');

// Creating the Client
const client = new Client({intents: [GatewayIntentBits.Guilds]});

// Client Commands Collection will allow easy use of the bot's commands
client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands')
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if ('data' in command && 'execute' in command){
        client.command.set(command.data.name, command)
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);

    }
}


client.once(Events.ClientReady, c => {
    console.log("***********************************");
    console.log("Pomo is logged in and ready to go!");
    console.log("***********************************");
})

// Command Handler (Command Event Listener)
client.on(Events.InteractionCreate, async interaction => {
    if(interaction.isChatInputCommand()){
        const command = interaction.client.commands.get(interaction.commandName)
        
        // Match command to collection
        if(!command) {
            console.error(`No command named ${interaction.commandName} was found.`)
        }
        else {
            try{
                await command.execute(interaction)
            }
            catch (error) {
                console.error(error)
            }
        }

    }
})

client.login(token);
