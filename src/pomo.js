
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
            // run timer for 25 mins
            setTimeout(()=>{
                this.incrementPomo();
                this.interaction.followUp("First timer finished.")
            },(10000))
        }
    
        static printHello(){
            console.log("hello")
        }
    

    }
