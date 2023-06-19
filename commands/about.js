const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('learn more about Pomo!'),
    async execute(interaction){
        await interaction.reply({embeds: [aboutEmbed]})
    }

}

const aboutEmbed = new EmbedBuilder()
.setTitle('About Pomo')
.setDescription("Pomo is a time management bot based on The Pomodoro Technique (developed by [Francesco Cirillo](https:\/\/francescocirillo.com\/) in the 1980s). The Pomodoro Technique is a time managment method that uses a timer to break work into intervals of, typically, 25 minutes. These intervals are separated by short breaks, typically 5 minutes.")
.setColor('ec3946')
.addFields(
    {name: "ㅤ", value: "Pomo was coded and developed by [Alcor](https://github.com/suha-ab) using discordJS."}
)
