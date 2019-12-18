import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from './views/base';

// ** Globabl state of the app

// * - Search object

// * - Current recipe object

// * - Shopping list object

// * - Liked recipes


/**
 *  SEARCH CONTROLER
 */

const state = {};

const controlSearch = async () => {

    // 1. Get query from view
    const query = searchView.getInput();
    

    if(query) {
        // 2. New search object and add it to the state

        state.search = new Search(query);

        // 3. Prepere UI for result
        renderLoader(elements.searchRes);
        searchView.clearInput();
        searchView.clearResults();

        //4. Search for recipes
        try {
            await state.search.getResult();
        // 5. Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);    
    }   catch (err) {
            alert('Something wrong with the search...');
    }

}
}

elements.searchForm.addEventListener('submit', e => {

    e.preventDefault();
    controlSearch();
});

const search = new Search('pizza');

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto); // setting data to specific pages
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
}); 

/**
 *  RECIPE CONTROLER
 */

const controlRecipe = async () => {

    // Get id from url
    const id = window.location.hash.replace('#', '');

    if(id) {
        // Prepere Ui for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        // Creating new recipie object
        state.recipe = new Recipe(id);

        // Highlight selected search item
        if (state.search) {
            searchView.highlightSelected(id);
        }
        try {
        // Get recipe data and parse ingredients    
        await state.recipe.getRecipe();
        console.log(state.recipe.ingredients);
        state.recipe.parseIngredients();

        // Calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();

        // Render recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe);

    } catch (err) {
        alert('Error processing recipe!');
        
        }   

    }
};
// window.addEventListener('hashchange', controlRecipe);      |
// window.addEventListener('load', controlRecipe);           \/  Same result by loop forEach

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')){   // Selecting btn-decrease and his child-elements decrease
        if(state.recipe.servings > 1){
        state.recipe.updateServings('dec');
        recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')){ // -||- but with increase by method matches
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
});