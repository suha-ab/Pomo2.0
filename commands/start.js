const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Pomo = require('../src/pomo');
//import {myPomos} from '../src/pomo.js'

const myPomos = require('../src/pomoArray')

function startCommad(interaction,myPomos){
        myPomos.push(new Pomo(interaction, 0, 0, 0, 8))
        //console.log(`myPomos after push`)
        //console.log(myPomos)
        myPomos[myPomos.length - 1].startTimer(myPomos);
}
function createstartEmbed(interaction){
    //console.log(interaction.member)
    const startEmbed = new EmbedBuilder()
    .setTitle(`${interaction.member.nickname}'s Pomo has been initialized!`)
    .setDescription("Your Pomo has just started. Time to get the show on the road!")
    .setColor('ec3946')
    return startEmbed;
}

function createalreadyExistsEmbed(interaction){
    const alreadyExistsEmbed = new EmbedBuilder()
    .setTitle(`${interaction.member.nickname}'s Pomo already exits.`)
    .setDescription("Your Pomo already exists. You can start a new pomo using /restart.")
    .setColor('ec3946')
    return alreadyExistsEmbed;
}




module.exports = {
    data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Starts 1 Pomodoro timer.'),
    async execute(interaction){
        const userName = interaction.user.username
        //console.log(userName)
        var found = false;

        // check if user already has an open pomo
        for (pomo of myPomos){
            if (pomo.interaction.user.username === userName){
                interaction.reply({embeds: [createalreadyExistsEmbed(interaction)]})
                found = true;
                break;
            }
        }

        if (found == false){
        // if user has no existing pomo
        startCommad(interaction,myPomos)
        await interaction.reply({embeds: [createstartEmbed(interaction)]});
        }
    }




}