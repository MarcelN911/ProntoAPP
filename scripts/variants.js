var itemIdCounter = 0;

function findDishInMenu(categoryName, dishIndex) {
    const dishes = menu[categoryName].info;
    if (dishIndex >= 0 && dishIndex < dishes.length) {
        return dishes[dishIndex];
    }
    return null;
}


function findSizePrice(dish, selectedSize) {
    for (let index = 0; index < dish.sizes.length; index++) {
        if (dish.sizes[index].size === selectedSize) {
            return dish.sizes[index].price;
        }
    }
    return dish.price;
}


function createDishWithVariant(dish, variant) {
    itemIdCounter = itemIdCounter + 1;
    return {
        id: itemIdCounter,
        name: dish.name,
        price: dish.price,
        img: dish.img,
        variant: variant
    };
}


function createDishWithSize(dish, size, price) {
    itemIdCounter = itemIdCounter + 1;
    return {
        id: itemIdCounter,
        name: dish.name,
        price: price,
        img: dish.img,
        size: size
    };
}


function selectVariant(variant, category, dishIndex) {
    const dish = findDishInMenu(category, dishIndex);
    const dishWithVariant = createDishWithVariant(dish, variant);
    addToBasket(dishWithVariant);
    closeVariantModal();
}


function selectSize(size, price, category, dishIndex) {
    const dish = findDishInMenu(category, dishIndex);
    const dishWithSize = createDishWithSize(dish, size, price);
    addToBasket(dishWithSize);
    closeVariantModal();
}

