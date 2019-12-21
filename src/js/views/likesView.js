import { elements } from './base';

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
    // <use href="img/icons.svg#icon-heart-outlined"></use>
};

export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = like => {
    const markup = `
                <li>
                    <a class="likes__link" href="${like.id}">
                        <figure class="likes__fig">
                            <img src="${like.img}" alt="${like.title}">
                        </figure>
                        <div class="likes__data">
                            <h4 class="${like.title}">Pasta with Tomato ...</h4>
                            <p class="${like.author}">The Pioneer Woman</p>
                        </div>
                    </a>
                </li>
    `;

    elements.likesList.insertAdjacentHTML('beforeend', markup);
}
    export const deleteLike = id => {
        const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;            //document.querySelector(`a[href="#${[id]}"]`).classList.add('results__link--active');
    if (el) el.parentElement.removeChild(el);
    }
