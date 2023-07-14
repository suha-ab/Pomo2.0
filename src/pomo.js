const { EmbedBuilder } = require('discord.js');
const myPomos = require('./pomoArray');
    module.exports  =     
    
    class Pomo {
        constructor(interaction, currTimeoutInterval, currStartTime, currEndTime, remainingTime, numOfPomos) {
            this.interaction = interaction;
            this.currTimeoutInterval = currTimeoutInterval;
            this.currStartTime = currStartTime;
            this.currEndTime = currEndTime;
            this.remainingTime = remainingTime;
            this.numOfPomos = numOfPomos;
        }

        static getLongBreakTime(){
            return (2 * 60 * 1000)
        }

        static getshortBreakTime(){
            return (1 * 60 * 1000)
        }

        static getPomoTime(){
            return (3 * 60 * 1000)
        }
    
        decrementPomo() {
            this.numOfPomos -= 1;
        }
    
        // Pomo = 25 - 5 - 25 - 5 - 25 - 5 - 25 - 15
        startTimer(myPomos){
            if(this.numOfPomos == 0) return this.interaction.followUp({embeds: [this.createFinishEmbed()]})
            else if (this.numOfPomos == 1){
                this.currStartTime = Date.now()
                this.currEndTime = this.currStartTime + Pomo.getLongBreakTime()

                // numOfPomos: Odd + == 1 -> 15 Min (long break)
                this.currTimeoutInterval = setTimeout(()=>{
                    this.decrementPomo()
                    myPomos.shift() // needs corrections <- If another pomo starts before this one finishes, it will be shifted
                    this.startTimer(myPomos)
                },(Pomo.getLongBreakTime()))
            }
            else if (this.numOfPomos % 2 == 0){
                this.currStartTime = Date.now()
                this.currEndTime = this.currStartTime + Pomo.getPomoTime()

                // numOfPomos: Even -> 25 Min (pomodoro)
                this.currTimeoutInterval = setTimeout(()=>{
                    this.decrementPomo()
                    if(this.numOfPomos == 1) this.interaction.followUp({embeds : [this.createLongBreakEmbed()]})
                    else this.interaction.followUp({embeds: [this.createShortBreakEmbed()]})
                    this.startTimer(myPomos)
                },(Pomo.getPomoTime()))
            }
            else{
                this.currStartTime = Date.now()
                this.currEndTime = this.currStartTime + Pomo.getshortBreakTime()

                // numOfPomos: Odd + == 1 -> 5 Min (short break)
                this.currTimeoutInterval = setTimeout(()=>{
                    this.decrementPomo()
                    this.interaction.followUp({embeds: [this.createPomoEmbed()]})
                    this.startTimer(myPomos)
                },(Pomo.getshortBreakTime()))
            }
        }

        pauseTimer(){
            var now = Date.now()

            // already paused
            if(this.remainingTime != 0) return false
            // update remainingTime, clear interval, send embed
            clearInterval(this.currTimeoutInterval)
            this.remainingTime = this.currEndTime - now
            //console.log(`Remaining Time (${this.remainingTime}) = ${this.currEndTime} - ${this.currStartTime}`)
            return true;
        }
        
        resumeTimer(myPomos){
            // do remaining time in current timer then call startTimer
            var afterResumeEmbed = new EmbedBuilder()
            
            if((this.numOfPomos - 1) == 1){
                afterResumeEmbed = this.createLongBreakEmbed()
            }
            else if ((this.numOfPomos -1 ) % 2 == 0){
                afterResumeEmbed = this.createPomoEmbed()
            }
            else{
                afterResumeEmbed = this.createShortBreakEmbed()
            }

            this.currStartTime = Date.now()
            this.currEndTime = this.currStartTime + this.remainingTime
            this.currTimeoutInterval = setTimeout(()=> {
                this.decrementPomo()
                this.interaction.followUp({embeds: [afterResumeEmbed]})
                this.startTimer(myPomos)
            },(this.remainingTime))
        }

        stopTimer(myPomos){
            clearInterval(this.currTimeoutInterval)
            myPomos.shift()
        }

        restartTimer(myPomos){
            this.numOfPomos = 8
            this.remainingTime = 0
            clearInterval(this.currTimeoutInterval)
            this.startTimer(myPomos)
        }

        remainingInTimer(){
            var millis = 0
            // paused timer
            if(this.remainingTime > 0 ) millis = this.remainingTime
            else {
                var now = Date.now()
                millis = this.currEndTime - now
            }
           
            var minutes = Math.floor(millis / 60000)
            var seconds = ((millis % 60000) / 1000).toFixed(0)
            return (seconds == 60 ? ((minutes + 1) + ":00") : minutes + ":" + (seconds < 10 ? "0" : "") + seconds)
        }

        getInteraction(){
            return this.interaction;
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
