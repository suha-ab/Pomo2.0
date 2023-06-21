const { EmbedFooterData, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, EmbedBuilder, ButtonStyle } = require('discord.js')

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

 // Building Footer
 //const helpFooter = new EmbedFooterData("Page 1 of 2")



 // Building Embed
const helpEmbed = new EmbedBuilder()
.setTitle('Pomo\'s Commands')
.setDescription("A list of Pomo's supported commands:")
.setColor('ec3946')
.addFields(
    {name:"🍅 About", value: "learn more about Pomo!\n ➡️ Use \"/about\" to try me."},
    {name:"🍅 Help",value: "displays a list of Pomo's commands\n ➡️ Use \"/help\" to try me."},
    {name:"🍅 Start", value:"start one pomodoro cycle (4 pomodoros, 25 mins each, with 5 min break between each pomodoro followed by a 15 min break after the fourth pomodoro.)\n➡️ Use \"/start\" to try me."},
    {name:"🍅 Stop", value: "stops the user's current pomodoro cycle (must have an active cycle). \n ➡️ Use \"/stop\" to try me."},
    {name: "🍅 Pause", value: "pauses the user's current pomodoro cycle (must have an active cycle). \n ➡️ Use \"/pause\" to try me."},
    {name:"🍅 Restart", value: "restarts the user's current pomodoro cycle (must have an active cycle).\n  Use \"/restart\" to try me."},
    {name: "Page 1 of 2", value: " "}
)
