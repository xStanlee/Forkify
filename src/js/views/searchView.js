import { elements, elementString } from './base';

export const getInput = () => elements.searchInput.value; 

export const clearInput = () => {
        elements.searchInput.value = ""; // Cleaning object at the start
};

export const clearResults = () => {
    elements.searchResList.innerHTML = ''; // Method that cleaning result can't be more than one dinner
    elements.searchResPages.innerHTML = '';
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
                                                            // Better solution func for cutting name of meal
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
`;              // Class which is holding in LI element whole date of object from api at UI
    elements.searchResList.insertAdjacentHTML('beforeend', markup); // Method outputing result beforeend </li>
};

const createButton = (page, type) => 
    `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1 }</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right' }"></use>
    </svg>
    </button>
    `;
const renderButtons = (page, numResult, resPerPage ) => {
    
    const pages = Math.ceil( numResult / resPerPage );  // Math method rounding to the next intiger 4.2 makes 5

    let button;

    if (page === 1 && pages > 1){
        
        button = createButton(page, 'next');
    
    }   else if (page < pages){

        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `
        
    }   else if (page === pages && pages > 1){

        button = createButton(page, 'prev');

    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}


    

export const renderResults = (recipes, page = 1, resPerPage = 10) => {

    // Render result of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    
    recipes.slice(start, end).forEach(renderRecipe);          // Result forEach recpie API

    // Render pagination of recpies results
    
    renderButtons(page, recipes.length, resPerPage);
    };
