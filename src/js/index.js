import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
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
window.state = state;

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
        state.recipe.parseIngredients();

        // Calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();

        // Render recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe);
        if (state.likes) likesView.toggleLikeBtn(state.likes.isLiked(state.recipe.id));

    }  catch (err) {
        console.log(err);
        alert('Error processing recipe!');
        
        }   

    }
};
// window.addEventListener('hashchange', controlRecipe);      |
// window.addEventListener('load', controlRecipe);           \/  Same result by loop forEach

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
 *  LIST CONTROLLER
 */

const controlList = () => {
  //Add each ingredients to the list and UI
    if (!state.list) state.list = new List();
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    state.recipe.ingredients.forEach(el =>{
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

// Handle delete and update list item events

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button

    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);

        // Handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
})

/**
 *  LIKE CONTROLLER
 */
// Testing
state.likes = new Likes()
likesView.toggleLikeMenu(state.likes.getNumLikes());
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    
    // User has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)){
    
    // User has liked current recipe
    
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
            // Toggle btn
            likesView.toggleLikeBtn(true);

            // Add to the ui

           // likesView.renderLike(newLike); NOT WORKING!
    }
    else {
        state.likes.deleteLike(currentID);
            // Toggle btn
        likesView.toggleLikeBtn(false);
        
       // likesView.deleteLike(currentID); NOT WORKING
    }
}; 

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
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        // Add ingredients to shopping list
        controlList();
    }else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controller
        controlLike();
    //}
    }
});

window.l = new List();
