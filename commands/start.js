const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Pomo = require('../src/pomo');
//import {myPomos} from '../src/pomo.js'

const myPomos = [];


function startCommad(interaction){
        const currTime = Date.now()
        console.log(myPomos);
        Pomo.printHello()
        myPomos.push(new Pomo(interaction))
        myPomos[myPomos.length - 1].startTimer();
        console.log(myPomos)

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