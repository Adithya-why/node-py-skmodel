//this file contains functions exposed to the user
//exports a class that contains methods to do stuff
//same stuff as index but in a class and callable



class PyModel{
    //defines all values needed to call python script
    modelpath;
    

    //get the modelpath or pkl file
    constructor(modelpath){
        this.modelpath = modelpath
    }


    //function to prepare data and return
    //divides map to two arrays
    //one for keys, one for values

    //called inside predict to prep data
    prepData(data){
        let names = [];
        let features = [];

        data.forEach((val,key) => {
            names.push(key);
            features.push(val);
        });



        return {names, features}
    }


    //function that spawns process and passes data
    //loads model
    //returns prediction

    async predict(data){
        //used to make async stuff of exec easier
        //no shitty callbacks needed
        const util = require('util');
        const exec = util.promisify(require('child_process').exec);



        //prep the data before passing it to py script
        let { names, features } = this.prepData(data);
        
       


        //create names array string to be included in cmd 
        //remove last comma -1
        let nstring = "";
        names.forEach((name) => {
            nstring+=name + ',';
        });
        nstring = nstring.slice(0, -1);




        //created features string
        //add every keyname and value and a space
        //remove last space
        
        //if features[i] is array, then it is auto passed as val1,val2..
        let fstring = ""
        for(let i = 0; i<names.length; i++){
            fstring += `--${names[i]}=${features[i]} `
        }
        fstring = fstring.slice(0,-1);


        //build the cmd string
        //coantains names and featuresvals
        let args = `--modelpath=${this.modelpath} --names=${nstring} ${fstring}`
        // console.log(args);

        //main cmd argument
        //location of model file is important
        
        
        let main = `python model.py`;

        //excute the process
        try{
            
            //get the results of the process back
            //the working firectory of the cmd is current folder (package folder)
            //--dirname makes sure cmd run from current location
            //so direct access to model.py since same directors
            const { stdout ,stderr } = await exec(`${main} ${args}`, {cwd: __dirname});

            if(stdout){
                //return the output
                //array of results
                return stdout
            }
            if(stderr){
                return stderr
            }

        }catch(err){
            return err;
        }

        


    }

   
}




module.exports = PyModel;



