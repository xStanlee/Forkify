import axios from 'axios';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe() {
        
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            console.log(error)
                alert('Something went wrong!');
            
        }
    }   

    calcTime() {
        // 15 min for every 3 ingredients

        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    };


parseIngredients() {

    const unitsLong = ['tablespoons', 'tabelspoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitsShort, 'kg', 'g'];
    
    const newIngredients = this.ingredients.map(el => {
        // 1) Uniform units of data
        let ingredient = el.toLowerCase();
        unitsLong.forEach((unit, i) => {
            ingredient = ingredient.replace(unit, unitsShort[i]);
        });


        // 2) Remove parentheses
        ingredient = ingredient.replace(/ *\([^)]*\) */g, ''); // remove parentheses
    

        // 3) Parse ingredients into count unit and ingredient

        const arrIng = ingredient.split(' ');
        const unitIndex = arrIng.findIndex(el2 => units.includes(el2));


        let objIng = {};

        if (unitIndex > - 1) {
            // There is a unit
            const arrCount = arrIng.slice(0, unitIndex); // Exaple 2 1/2 cups arrCount is [2, 1/2];
            
            let count;
            if (arrCount.length === 1){
                count = eval(arrIng[0].replace('-', '+'));
            
            
            objIng = {
                count,
                unit: arrIng[unitIndex],
                ingredient: arrIng.slice(unitIndex + 1).join(' ')
            }
        }
            else {
                count = eval(arrIng.slice(0, unitIndex).join('+'));
            }
        } else if (parseInt(arrIng[0], 10)) {
            objIng = {
                count: parseInt(arrIng[0], 10),
                unit: '',
                ingredient: arrIng.slice(1).join(' ')
            }// There is no unit, but 1st element is number
        } 
        
        else if (unitIndex === -1) {
        objIng = {
            count: 1,
            unit: '',
            ingredient  // Es 6 let us putting variable into object as it is declared b4
         }   // There's no unit and no number at 1st possition of an arrey
        }
    
    return objIng;
    });
    this.ingredients = newIngredients;
};

    updateServings (type) {
        //Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        //Ingredients
        this.ingredients.forEach(ing => {
            ing.count = ing.count * (newServings / this.servings);
        });
        this.servings = newServings;
    };
}