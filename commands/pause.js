const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const myPomos = require('../src/pomoArray')

function createNoSuchPomoEmbed(interaction){
    const noSuchPomoEmbed = new EmbedBuilder()
    .setTitle(`${interaction.member.nickname} has no existing Pomos.`)
    .setDescription(`You have no current pomos. Please use /start to begin a pomo.`)
    .setColor('ec3946')
    return noSuchPomoEmbed
}

function createPomoPausedEmbed(interaction){
    const noSuchPomoEmbed = new EmbedBuilder()
    .setTitle(`${interaction.member.nickname}'s Pomo is already paused.`)
    .setDescription(`Your pomo is already paused. Please use /resume to continue working.`)
    .setColor('ec3946')
    return noSuchPomoEmbed
}

function createPomoFoundEmbed(interaction){
    const pomoFoundEmbed = new EmbedBuilder()
    .setTitle(`${interaction.member.nickname}'s Pomo has been paused.`)
    .setDescription(`Your pomo has been paused. Please use /resume to continue working.`)
    .setColor('ec3946')
    return pomoFoundEmbed
}



module.exports = {
    data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause current timer if running.'),
    async execute(interaction){
        var found = false;
        if (myPomos.length == 0) await interaction.reply({embeds: [createNoSuchPomoEmbed(interaction)]})
        else{
            // 1. Search for matching pomo
            // 2. If It Exists, pause the timer. Else, return "no pomo exists" message
            for(pomo of myPomos){
                if (pomo.interaction.user.username == interaction.user.username){
                    var pause = pomo.pauseTimer()
                    if(pause) interaction.reply({embeds: [createPomoFoundEmbed(interaction)]})
                    else interaction.reply({embeds: [createPomoPausedEmbed(interaction)]})
                    found = true
                    break
                }
            }

            if(found == false) await interaction.reply({embeds: [createNoSuchPomoEmbed(interaction)]})
        }

        //console.log(myPomos)
    }

}