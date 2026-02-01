function selectVariant(variant, category, dishIndex) {
    const dish = menu[category].info[dishIndex];
    const dishWithVariant = {
        ...dish,
        variant: variant,
        id: Date.now()
    };
    addToBasket(dishWithVariant);
    closeVariantModal();
}

function selectSize(size, price, category, dishIndex) {
    const dish = menu[category].info[dishIndex];
    const dishWithSize = {
        ...dish,
        size: size,
        price: price,
        id: Date.now()
    };
    addToBasket(dishWithSize);
    closeVariantModal();
}
