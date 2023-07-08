const { EmbedBuilder } = require('discord.js')
    module.exports  =     
    
    class Pomo {
        constructor(interaction, currTimeoutInterval, remainingTime, numOfPomos) {
            this.interaction = interaction;
            this.currTimeoutInterval = currTimeoutInterval;
            this.remainingTime = remainingTime;
            this.numOfPomos = numOfPomos;
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
    
        // Pomo = 25 - 5 - 25 - 5 - 25 - 5 - 25 - 15
        startTimer(myPomos){
            const finishEmbed = this.createFinishEmbed()

            // run timer for 25 mins
            this.currTimeoutInterval = setTimeout(()=>{
                this.incrementPomo()
                this.interaction.followUp({embeds: [finishEmbed]})
                myPomos.shift() // needs corrections <- If another pomo starts before this one finishes, it will be shifted
                //console.log(`myPomos after shift`)
                //console.log(myPomos)
            },(10000))
        }

        pauseTimer(myPomos){
            

        }

        getInteraction(){
            return this.interaction;
        }
    
        static printHello(){
            console.log("hello")
        }

        createFinishEmbed(){
            return new EmbedBuilder()
            .setTitle(`${this.interaction.member.nickname}'s Pomo has finished!`)
            .setDescription(`Your Pomo has just finished, time for a break!`)
            .setColor('ec3946')
        }
    

    }
