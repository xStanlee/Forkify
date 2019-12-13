import axios from 'axios';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe() {
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            const apiGetData = res.data.recipe;
            
            this.title = apiGetData.title;
            this.author = apiGetData.publisher;
            this.image = apiGetData.image_url;
            this.url = apiGetData.source_url;
            this.ingredients = apiGetData.ingredients;
        } catch (error) {
            console.log(error)
                alert('Something went wrong!');
            
        }
    }

    calcTime() {
        // 15 min for every 3 iingredients

        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }
}