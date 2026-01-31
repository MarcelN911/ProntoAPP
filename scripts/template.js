document.addEventListener("DOMContentLoaded", function() {
    setupBasketButtons();
    renderCategorys();
    renderMenuCards();
    renderBasket();
    updateBasketSummary();
});

function setupBasketButtons() {
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("add-meal") || event.target.classList.contains("add-meal-large")) {
            const category = event.target.getAttribute("data-category");
            const dishIndex = event.target.dataset.index;
            const dish = menu[category].info[dishIndex];
            
            if (dish.variants && dish.variants.length > 0) {
                openVariantModal(dish.name, dish.variants, category, dishIndex);
            } else {
                addToBasket(dish);
            }
        }
    });
}
