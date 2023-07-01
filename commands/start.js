const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Pomo = require('../src/pomo');
//import {myPomos} from '../src/pomo.js'

const myPomos = [];


function startCommad(interaction){
        const currTime = Date.now()
        //console.log(myPomos);
        Pomo.printHello()
        myPomos.push(new Pomo(interaction))
        myPomos[myPomos.length - 1].startTimer();
        //console.log(myPomos)

}
function createstartEmbed(interaction){
    //console.log(interaction.member)
    const startEmbed = new EmbedBuilder()
    .setTitle(`${interaction.member.nickname}'s Pomo has been initialized!`)
    .setDescription("Your Pomo has just started. Time to get the show on the road!")
    .setColor('ec3946')
    return startEmbed;
}




module.exports = {
    data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Starts 1 Pomodoro timer.'),
    async execute(interaction){
        startCommad(interaction)
        await interaction.reply({embeds: [createstartEmbed(interaction)]});

    }




}