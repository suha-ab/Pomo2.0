const { ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, EmbedBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('A list of Pomo\'s commands and their use.'),
    async execute(interaction){
        await interaction.reply({embeds: [helpEmbed], components: [row]})
    }




}

// Building Buttons
const prev = new ButtonBuilder()
    .setCustomId('prev')
    .setLabel("◀️")
    .setStyle(ButtonStyle.Primary);

const next = new ButtonBuilder()
    .setCustomId("next")
    .setLabel("▶️")
    .setStyle(ButtonStyle.Primary);


 // Building Row
 const row = new ActionRowBuilder().addComponents(prev,next);

 

 // Building Embed
const helpEmbed = new EmbedBuilder()
.setTitle('Pomo\'s Commands')
.setDescription("A list of Pomo's supported commands:")
.setColor('ec3946')
.addFields(
    {name: "🍅 About", value: "learn more about Pomo!\b ➡️ Use /about to try me."}
)
