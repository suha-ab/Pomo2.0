    // Pomo = 25 - 5 - 25 - 5 - 25 - 5 - 25 - 15
    function createPomo(interac) {
        const interaction = interac;
    /*  
        const username = user;
        const startTime = start;
        const endTime = end;
        const numOfPomos = numOPomos; 
    */
    }

    function incrementPomo() {
        numOfPomos += 1;
    }

    function startTimer(){
        // run timer for 25 mins
        setTimeout(()=>{
            incrementPomo();
            interaction.followUp("First timer finished.")
        },(1000 * 60 * 1))
    }

    function printHello(){
        console.log("hello")
    }

    module.exports  = {
        createPomo,
        incrementPomo,
        startTimer,
        printHello
    }