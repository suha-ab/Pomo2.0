const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const myPomos = require('../src/pomoArray')

function createPomoFoundEmbed(interaction){
    return new EmbedBuilder()
    .setTitle(`${interaction.member.nickname}'s Pomo has been restarted!`)
    .setDescription("Your Pomo has been restarted. <insert # of restarts>'s the charm!")
    .setColor('ec3946')
}

function createNoSuchPomoEmbed(interaction){
    const noSuchPomoEmbed = new EmbedBuilder()
    .setTitle(`${interaction.member.nickname} has no existing Pomos.`)
    .setDescription(`You have no current pomos. Please use /start to begin a pomo.`)
    .setColor('ec3946')
    return noSuchPomoEmbed
}


module.exports = {
    data: new SlashCommandBuilder()
    .setName('restart')
    .setDescription('restarts your current pomo.'),
    async execute(interaction){
        var found = false;
        if (myPomos.length == 0) await interaction.reply({embeds: [createNoSuchPomoEmbed(interaction)]})
        else{
            for(pomo of myPomos){
                if (pomo.interaction.user.username == interaction.user.username){
                    pomo.restartTimer(myPomos)
                    interaction.reply({embeds: [createPomoFoundEmbed(interaction)]})
                    found = true
                    break
                }
            }

            if(found == false) await interaction.reply({embeds: [createNoSuchPomoEmbed(interaction)]})
        }
    }

}