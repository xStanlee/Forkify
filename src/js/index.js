import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

// ** Globabl state of the app

// * - Search object

// * - Current recipe object

// * - Shopping list object

// * - Liked recipes

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

        await state.search.getResult();

        // 5. Render results on UI

        clearLoader();
        searchView.renderResults(state.search.result);    
    }

}

elements.searchForm.addEventListener('submit', e => {

    e.preventDefault();
    controlSearch();
});

const search = new Search('pizza');

