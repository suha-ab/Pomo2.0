const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const myPomos = require('../src/pomoArray')

function createPomoFoundEmbed(interaction){
    return new EmbedBuilder()
    .setTitle(`${interaction.member.nickname}'s Pomo has been resumed!`)
    .setDescription("Your Pomo has been resumed. Keep up the good work!🎾")
    .setColor('ec3946')
}

function createPomoNotPausedEmbed(interaction){
    const noSuchPomoEmbed = new EmbedBuilder()
    .setTitle(`${interaction.member.nickname}'s Pomo is not paused.`)
    .setDescription(`Your pomo is not paused. Use /pause to pause the timer or /time to see the remaining time in the current inerval.`)
    .setColor('ec3946')
    return noSuchPomoEmbed
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
    .setName('resume')
    .setDescription('Resume current timer if paused.'),
    async execute(interaction){
        var found = false;
        if (myPomos.length == 0) await interaction.reply({embeds: [createNoSuchPomoEmbed(interaction)]})
        else{
            // 1. Search for matching pomo
            // 2. If It Exists, pause the timer. Else, return "no pomo exists" message
            for(pomo of myPomos){
                if (pomo.interaction.user.username == interaction.user.username){
                    var resume = pomo.resumeTimer(myPomos)
                    if(resume) interaction.reply({embeds: [createPomoFoundEmbed(interaction)]})
                    else interaction.reply({embeds: [createPomoNotPausedEmbed(interaction)]})
                    found = true
                    break
                }
            }

            if(found == false) await interaction.reply({embeds: [createNoSuchPomoEmbed(interaction)]})
        }
    }

}