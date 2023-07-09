const { EmbedBuilder } = require('discord.js')
    module.exports  =     
    
    class Pomo {
        constructor(interaction, currTimeoutInterval, currStartTime, remainingTime, numOfPomos) {
            this.interaction = interaction;
            this.currTimeoutInterval = currTimeoutInterval;
            this.currStartTime = currStartTime;
            this.remainingTime = remainingTime;
            this.numOfPomos = numOfPomos;
        /*  
            const username = user;
            const startTime = start;
            const endTime = end;
            const numOfPomos = numOPomos; 
        */
        }
    
        decrementPomo() {
            this.numOfPomos -= 1;
        }
    
        // Pomo = 25 - 5 - 25 - 5 - 25 - 5 - 25 - 15
        startTimer(myPomos){
            if(this.numOfPomos == 0) return this.interaction.followUp({embeds: [this.createFinishEmbed()]})
            else if (this.numOfPomos == 1){
                this.currStartTime = Date.now()

                // numOfPomos: Odd + == 1 -> 15 Min (long break)
                this.currTimeoutInterval = setTimeout(()=>{
                    this.decrementPomo()
                    myPomos.shift() // needs corrections <- If another pomo starts before this one finishes, it will be shifted
                    this.startTimer(myPomos)
                },(2 * 60 * 1000))
            }
            else if (this.numOfPomos % 2 == 0){
                this.currStartTime = Date.now()

                // numOfPomos: Even -> 25 Min (pomodoro)
                this.currTimeoutInterval = setTimeout(()=>{
                    this.decrementPomo()
                    if(this.numOfPomos == 1) this.interaction.followUp({embeds : [this.createLongBreakEmbed()]})
                    else this.interaction.followUp({embeds: [this.createShortBreakEmbed()]})
                    this.startTimer(myPomos)
                },(3 * 60 * 1000))
            }
            else{
                this.currStartTime = Date.now()

                // numOfPomos: Odd + == 1 -> 5 Min (short break)
                this.currTimeoutInterval = setTimeout(()=>{
                    this.decrementPomo()
                    this.interaction.followUp({embeds: [this.createPomoEmbed()]})
                    this.startTimer(myPomos)
                },(1 * 60 * 1000))
            }
        }

        pauseTimer(){
            // update remainingTime, clear interval, send embed
            this.remainingTime = Date.now() - this.currStartTime
            clearInterval(this.currTimeoutInterval)
        }
        
        resumeTimer(){
            // do remaining time in current timer then call startTimer

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
            .setDescription(`You just finished your Pomo session! Well done 👏 You can start a new one using /start.`)
            .setColor('ec3946')
        }

        createPomoEmbed(){
            return new EmbedBuilder()
            .setTitle(`${this.interaction.member.nickname}'s Pomo has finished!`)
            .setDescription(`Your break has just finished. It's time to get back to work!`)
            .setColor('ec3946')
        }

        createShortBreakEmbed(){
            return new EmbedBuilder()
            .setTitle(`${this.interaction.member.nickname}'s Pomo has finished!`)
            .setDescription(`Your Pomo has just finished, time for a break!`)
            .setColor('ec3946')
        }

        createLongBreakEmbed(){
            return new EmbedBuilder()
            .setTitle(`${this.interaction.member.nickname}'s Pomo has finished!`)
            .setDescription(`Your Pomo has just finished, it's time for a longer break!`)
            .setColor('ec3946')
            
        }

    }
