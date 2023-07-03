const { EmbedBuilder } = require('discord.js')
    module.exports  =     
    // Pomo = 25 - 5 - 25 - 5 - 25 - 5 - 25 - 15
    class Pomo {
        constructor(interaction) {
            this.interaction = interaction;
        /*  
            const username = user;
            const startTime = start;
            const endTime = end;
            const numOfPomos = numOPomos; 
        */
        }
    
        incrementPomo() {
            this.numOfPomos += 1;
        }
    
        startTimer(){
            const finishEmbed = new EmbedBuilder()
            .setTitle(`${this.interaction.member.nickname}'s Pomo has finished!`)
            .setDescription(`Your Pomo has just finished, time for a break!`)
            .setColor('ec3946')

            // run timer for 25 mins
            setTimeout(()=>{
                this.incrementPomo();
                this.interaction.followUp({embeds: [finishEmbed]})
            },(10000))
        }
    
        static printHello(){
            console.log("hello")
        }
    

    }
