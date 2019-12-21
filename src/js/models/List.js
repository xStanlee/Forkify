import uniqid from 'uniqid';

export default class List{
    constructor() {
        this.items = [];
    }


    addItem (count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }

        this.items.push(item);
        return item;
    }

    deleteItem (id) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1); // take one item from element in the arrey of items [mutateArr]
    };

    updateCount(id, newCount) {
        
        this.items.find(el => el.id === id).count = newCount;
    };
}