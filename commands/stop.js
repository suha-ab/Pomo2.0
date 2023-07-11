const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const Pomo = require('../src/pomo');
const myPomos = require('../src/pomoArray')


function createNoSuchPomoEmbed(interaction){
    const noSuchPomoEmbed = new EmbedBuilder()
    .setTitle(`${interaction.member.nickname} has no existing Pomos.`)
    .setDescription(`You have no current pomos. Please use /start to begin a pomo.`)
    .setColor('ec3946')
    return noSuchPomoEmbed
}

function createPomoFoundEmbed(interaction){
    return new EmbedBuilder()
    .setTitle(`${interaction.member.nickname}'s Pomo has been stopped!`)
    .setDescription("Your Pomo has been stopped. You can start a new pomo using /start.")
    .setColor('ec3946')
}


module.exports = {
    data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('stops your current pomo timer.'),
    async execute(interaction){
        var found = false;
        if (myPomos.length == 0) await interaction.reply({embeds: [createNoSuchPomoEmbed(interaction)]})
        else{
            for(pomo of myPomos){
                if (pomo.interaction.user.username == interaction.user.username){
                    pomo.stopTimer(myPomos)
                    interaction.reply({embeds: [createPomoFoundEmbed(interaction)]})
                    found = true
                    break
                }
            }

            if(found == false) await interaction.reply({embeds: [createNoSuchPomoEmbed(interaction)]})
        }
    }

}