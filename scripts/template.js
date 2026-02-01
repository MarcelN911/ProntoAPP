document.addEventListener("DOMContentLoaded", function() {
    setupBasketButtons();
    setupKeyboardShortcuts();
    renderCategories();
    renderMenuCards();
    renderBasket();
    updateBasketSummary();
});


function setupKeyboardShortcuts() {
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            const modal = document.getElementById("variant-modal");
            const basketModal = document.getElementById("basket-modal");
            const orderModal = document.getElementById("order-modal");
            
            if (!modal.classList.contains("hidden")) {
                closeVariantModal();
            } else if (!basketModal.classList.contains("hidden")) {
                closeBasketModal();
            } else if (!orderModal.classList.contains("hidden")) {
                closeOrderModal();
            }
        }
    });
}


function setupBasketButtons() {
    document.addEventListener("click", function(event) {
        const addBtn = event.target.classList.contains("add-meal");
        const addLargeBtn = event.target.classList.contains("add-meal-large");
        if (!addBtn && !addLargeBtn) return;

        const category = event.target.getAttribute("data-category");
        const dishIndex = event.target.dataset.index;
        const dish = menu[category].info[dishIndex];

        if (dish.sizes && Object.keys(dish.sizes).length > 0) {
            openSizeModal(dish.name, dish.sizes, category, dishIndex);
        } else if (dish.variants && dish.variants.length > 0) {
            openVariantModal(dish.name, dish.variants, category, dishIndex);
        } else {
            addToBasket(dish);
        }
    });
}
