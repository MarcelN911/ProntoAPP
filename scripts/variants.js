// Variant Selection Functions

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
