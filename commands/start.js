const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { printHello } = require('../src/pomo.js');
require('../src/pomo.js')
//import {myPomos} from '../src/pomo.js'

const myPomos = [];


function startCommad(interaction){
        const currTime = Date.now()
        console.log(myPomos);
        console.log(printHello)
        const newPomo = createPomo(interaction)
        myPomos.push(newPomo)
        myPomos[myPomos.length - 1].startTimer();
}


module.exports = {
    data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Starts 1 Pomodoro timer.'),
    async execute(interaction){
        startCommad(interaction)
        await interaction.reply("Timer has begun.");

    }




}