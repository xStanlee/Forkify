import axios from 'axios';
export default class Search {
    constructor(query){
        this.query = query;
    }


async  getResult() {
    
    // Do not need try&catch method because there's no API key

        try {

        const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`); // Ajax call by axios function something like fetch it's handling older browser and give back less err.
        
        this.result = res.data.recipes; // object which is holding an arrey of data from API
        //console.log(this.result);
        } catch (error){
            alert(error);
        }
        }


    }