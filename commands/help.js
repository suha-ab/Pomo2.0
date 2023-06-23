const { ComponentType, InteractionResponse, EmbedFooterData, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, EmbedBuilder, ButtonStyle, ButtonInteraction } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('A list of Pomo\'s commands and their use.'),
    async execute(interaction){
        const response = await interaction.reply({embeds: [helpEmbed1], components: [row1]})

        // Component Collector 
        const collector = response.createMessageComponentCollector({componentType: ComponentType.Button, time : 3_600_000});

        // Event Listener
        collector.on('collect', async buttonInteraction => {
            const buttonId = buttonInteraction.customId;
            if (buttonId === 'next')
                await buttonInteraction.update({embeds: [helpEmbed2], components:[row2]})
            else
                await buttonInteraction.update({embeds: [helpEmbed1], components: [row1]})
        })


    }




}

// Building Buttons
const prev1 = new ButtonBuilder()
    .setCustomId('prev')
    .setLabel("◀️")
    .setStyle(ButtonStyle.Primary)
    .setDisabled(true);

const prev2 = new ButtonBuilder()
    .setCustomId('prev')
    .setLabel("◀️")
    .setStyle(ButtonStyle.Primary);



const next1 = new ButtonBuilder()
    .setCustomId("next")
    .setLabel("▶️")
    .setStyle(ButtonStyle.Primary);

const next2 = new ButtonBuilder()
    .setCustomId("next")
    .setLabel("▶️")
    .setStyle(ButtonStyle.Primary)
    .setDisabled(true);


 // Building Row
 const row1 = new ActionRowBuilder().addComponents(prev1,next1);
 const row2 = new ActionRowBuilder().addComponents(prev2,next2);

 // Building Footer
 //const helpFooter = new EmbedFooterData("Page 1 of 2")



 // Building Embed
const helpEmbed1 = new EmbedBuilder()
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


const helpEmbed2 = new EmbedBuilder()
.setTitle('Pomo\'s Commands')
.setDescription("A list of Pomo's supported commands:")
.setColor('ec3946')
.addFields(
    {name:"🍅 Time", value: "displays the remaining time in a current pomo (must have an active pomo).\n ➡️ Use \"/time\" to try me."},
    {name:"🍅 Resume",value: "resumes a paused pomo (must have an active pomo).\n ➡️ Use \"/resume\" to try me."},
    {name: "Page 2 of 2", value: " "}
)
