
function getModalElement(elementId) {
    return document.getElementById(elementId);
}


function showModal(modal) {
    modal.classList.remove("hidden");
    modal.removeAttribute("inert");
    document.body.style.overflow = "hidden";
}


function hideModal(modal) {
    modal.classList.add("hidden");
    modal.setAttribute("inert", "");
    document.body.style.overflow = "auto";
}


function setupModalClickHandler(modal, closeFunction) {
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeFunction();
        }
    };
}


function setupModalBackgroundClose() {
    const variantModal = document.getElementById("variant-modal");
    const basketModal = document.getElementById("basket-modal");
    const orderModal = document.getElementById("order-modal");
    
    setupModalClickHandler(variantModal, closeVariantModal);
    setupModalClickHandler(basketModal, closeBasketModal);
    setupModalClickHandler(orderModal, closeOrderModal);
}


document.addEventListener("DOMContentLoaded", function() {
    renderCategories();
    renderAllMenuCards();
    setupBasketButtons();
    setupKeyboardShortcuts();
    setupModalBackgroundClose();
    renderBasket();
    updateBasketSummary();
});


function createCategoryButton(category) {
    const button = document.createElement("button");
    button.classList.add("category-btn");
    const icon = CATEGORY_ICONS[category] || "📌";
    button.textContent = `${icon} ${category}`;
    button.onclick = function() {
        const id = `category-headline-${category}`;
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    };
    return button;
}


function renderCategories() {
    const container = document.getElementById("category-selection");
    container.innerHTML = "";
    const allCategories = Object.keys(menu);
    for (let index = 0; index < allCategories.length; index++) {
        const category = allCategories[index];
        const button = createCategoryButton(category);
        container.appendChild(button);
    }
}


function renderAllMenuCards() {
    const container = document.getElementById("menu-main-container");
    container.innerHTML = "";
    const allCategories = Object.keys(menu);
    for (let index = 0; index < allCategories.length; index++) {
        const category = allCategories[index];
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "category-section";
        renderCategoryHeadline(categoryDiv, category);
        renderCategoryDishes(categoryDiv, category);
        container.appendChild(categoryDiv);
    }
}


function renderCategoryHeadline(container, category) {
    const h2 = document.createElement("h2");
    h2.className = "category-headline";
    h2.id = "category-headline-" + category;
    const icon = CATEGORY_ICONS[category] || "📌";
    h2.textContent = icon + " " + category;
    container.appendChild(h2);
}


function renderCategoryDishes(container, category) {
    const dishes = menu[category].info;
    if (dishes.length === 0) return;
    const largeHtml = createMenuCardLargeTemplate(dishes[0], category);
    container.innerHTML = container.innerHTML + largeHtml;
    renderMenuCardRows(container, dishes, category);
}


function renderMenuCardRows(container, dishes, category) {
    for (let index = 1; index < dishes.length; index = index + 2) {
        const d1 = dishes[index];
        const d2 = dishes[index + 1] || null;
        const rowHtml = createMenuCardRowTemplate(d1, d2, category, index, index + 1);
        container.innerHTML = container.innerHTML + rowHtml;
    }
}


function getPriceDisplay(dish, category) {
    if (category === "Pizza" && dish.sizes) {
        let minPrice = null;
        const sizes = Object.values(dish.sizes);
        for (let index = 0; index < sizes.length; index++) {
            if (minPrice === null || sizes[index] < minPrice) {
                minPrice = sizes[index];
            }
        }
        return "ab " + minPrice + " €";
    }
    return dish.price + " €";
}


function createOptionButton(text, onClickHandler) {
    const btn = document.createElement("button");
    btn.className = "variant-btn";
    btn.textContent = text;
    btn.onclick = onClickHandler;
    return btn;
}


function createButtonHandler(isSizeMode, item, items, category, dishIndex) {
    if (isSizeMode) {
        return function() {
            selectSize(item, items[item], category, dishIndex);
        };
    } else {
        return function() {
            selectVariant(item, category, dishIndex);
        };
    }
}


function getButtonText(item, items, isSizeMode, dishPrice) {
    if (isSizeMode) {
        const price = items[item];
        return item + " - " + price + " €";
    }
    return item + " - " + dishPrice + " €";
}


function addButtonToContainer(optionsContainer, buttons, item, items, isSizeMode, category, dishIndex, dishPrice) {
    const text = getButtonText(item, items, isSizeMode, dishPrice);
    const handler = createButtonHandler(isSizeMode, item, items, category, dishIndex);
    const btn = createOptionButton(text, handler);
    optionsContainer.appendChild(btn);
    buttons.push(btn);
}


function renderModalOptions(optionsContainer, items, isSizeMode, category, dishIndex, dishPrice) {
    const buttons = [];
    optionsContainer.innerHTML = "";
    let itemsArray = items;
    if (isSizeMode) {
        itemsArray = Object.keys(items);
    }
    for (let index = 0; index < itemsArray.length; index++) {
        const item = itemsArray[index];
        addButtonToContainer(optionsContainer, buttons, item, items, isSizeMode, category, dishIndex, dishPrice);
    }
    return buttons;
}


function setupModalDisplay(modal, buttons) {
    showModal(modal);
    if (buttons.length > 0) buttons[0].focus();
}


function openBasketModal() {
    const modal = getModalElement("basket-modal");
    showModal(modal);
    renderBasketModal();
}


function closeBasketModal() {
    const modal = getModalElement("basket-modal");
    hideModal(modal);
}


function openVariantModal(dishName, variants, category, dishIndex) {
    const modal = getModalElement("variant-modal");
    const dish = menu[category].info[dishIndex];
    const title = document.getElementById("variant-title");
    title.innerHTML = dishName + " - <br>Variante wählen";
    const options = document.getElementById("variant-options");
    const buttons = renderModalOptions(options, variants, false, category, dishIndex, dish.price);
    setupModalDisplay(modal, buttons);
}


function closeVariantModal() {
    const modal = getModalElement("variant-modal");
    hideModal(modal);
}


function openSizeModal(dishName, sizes, category, dishIndex) {
    const modal = getModalElement("variant-modal");
    const title = document.getElementById("variant-title");
    title.innerHTML = dishName + " - <br>Größe wählen";
    const options = document.getElementById("variant-options");
    const buttons = renderModalOptions(options, sizes, true, category, dishIndex, 0);
    setupModalDisplay(modal, buttons);
}


function setupBasketButtons() {
    // Buttons now have onclick="handleAddButtonClick(this)" in HTML templates
}


function handleAddButtonClick(btn) {
    const category = btn.getAttribute("data-category");
    const dishIndex = btn.getAttribute("data-index");
    const dish = menu[category].info[dishIndex];
    if (dish.sizes && Object.keys(dish.sizes).length > 0) {
        openSizeModal(dish.name, dish.sizes, category, dishIndex);
    } else if (dish.variants && dish.variants.length > 0) {
        openVariantModal(dish.name, dish.variants, category, dishIndex);
    } else {
        addToBasket(dish);
    }
}


function setupKeyboardShortcuts() {
    document.onkeydown = function(event) {
        if (event.key === "Escape") {
            closeModalsOnEscape();
        }
    };
}


function closeModalsOnEscape() {
    const variantModal = getModalElement("variant-modal");
    const basketModal = getModalElement("basket-modal");
    const orderModal = getModalElement("order-modal");
    if (!variantModal.classList.contains("hidden")) {
        closeVariantModal();
    } else if (!basketModal.classList.contains("hidden")) {
        closeBasketModal();
    } else if (!orderModal.classList.contains("hidden")) {
        closeOrderModal();
    }
}
