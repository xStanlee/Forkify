import { elements } from './base';

export const getInput = () => elements.searchInput.value; 

export const clearInput = () => {
        elements.searchInput.value = ""; // Cleaning object at the start
};

export const clearResults = () => {
    elements.searchResList.innerHTML = ''; // Method that cleaning result can't be more than one dinner
};


/*const limitRecipeTitle = (recipe, limit = 17) => {

    const newTitle = [];
    
    if (title.length < limit){

        title.split(' ').reduce((acc,cur) => {
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // result of new Titles

        return `${newTitle.join(' ')} ...`;

    }
        return title;
    
} */

const limitRecipeTitle = (title, limit = 17) =>{
    if (title.length > limit){
      let newTitle=  title.split('').splice(0,limit);
                                                            // Better solution
      // Return New title
      return `${newTitle.join('')}...`;
 
      // Return the title containing less than 17 letters
    } return title;
}; 

const renderRecipe = recipe => {

    const markup = `
    <li>
    <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
                <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>          
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
`; // Class which is holding in LI element whole date of object from api at UI
    elements.searchResList.insertAdjacentHTML('beforeend', markup); // Method outputing result beforeend </li>
};
    

export const renderResults = recipes => {

    recipes.forEach(renderRecipe);          // Result forEach recpie API
        
    };
