import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

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
    // console.log(query); // Just for testing

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
            clearLoader();
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

        // Creating new recipie object
        state.recipe = new Recipe(id);
        // Get recipe data

        try {
            // Get recipe
            await state.recipe.getRecipe();
            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            // Render recipe
    
            console.log(state.recipe);
        } catch (err) {
            alert('Error processing recipe!');
        }

    }
}

// window.addEventListener('hashchange', controlRecipe);      |
// window.addEventListener('load', controlRecipe);           \/  Same result by loop forEach

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));