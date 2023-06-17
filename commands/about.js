const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('learn more about Pomo!'),
    async execute(interaction){
        await interaction.reply(`${interaction.user.username} used the about command.`)
    }





}