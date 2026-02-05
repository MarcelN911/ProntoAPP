function createMenuCardLargeTemplate(dish, category) {
    const priceDisplay = getPriceDisplay(dish, category);
    return `
        <div class="menu-card-large">
            <img src="${dish.img}" class="menu-img-large" alt="${dish.name}" loading="lazy">
            <div class="menu-card-info">
                <div class="menu-name">${dish.name}</div>
                <div class="menu-description">${dish.description.join(', ')}</div>
                <div class="menu-price-large">${priceDisplay}</div>
                <button class="add-meal-large" onclick="handleAddButtonClick(this)" data-category="${category}" data-index="0">+</button>
            </div>
        </div>
    `;
}


function createMenuCardTemplate(dish, category, index) {
    const priceDisplay = getPriceDisplay(dish, category);
    return `
        <div class="menu-card">
            <img src="${dish.img}" class="menu-img" alt="${dish.name}" loading="lazy">
            <div class="menu-card-info">
                <div class="menu-name">${dish.name}</div>
                <div class="menu-description">${dish.description.join(', ')}</div>
                <div class="menu-price">${priceDisplay}</div>
                <button class="add-meal" onclick="handleAddButtonClick(this)" data-category="${category}" data-index="${index}">+</button>
            </div>
        </div>
    `;
}


function createMenuCardRowTemplate(d1, d2, category, idx1, idx2) {
    let card2 = '';
    if (d2) {
        card2 = createMenuCardTemplate(d2, category, idx2);
    }
    return `
        <div class="menu-card-row">
            ${createMenuCardTemplate(d1, category, idx1)}
            ${card2}
        </div>
    `;
}


function createEmptyBasketTemplate() {
    return `
        <div class='basket-empty'>
            <div class='empty-icon'>🛒</div>
            <h3>Dein Warenkorb ist noch leer!</h3>
            <p>Lass uns etwas Köstliches finden, das dich verlockt! 😋</p>
        </div>
    `;
}


function createBasketItemTemplate(item) {
    const totalPrice = item.price * item.quantity;
    let btnText = '<img src="./assets/img/delete.svg" class="basket-btn-icon" alt="Löschen">';
    let btnCall = `removeFromBasket(${item.id})`;
    if (item.quantity > 1) {
        btnText = "-";
        btnCall = `decreaseQuantity(${item.id})`;
    }
    const priceFormatted = totalPrice.toFixed(2);
    return `
        <div class='basket-item'>
            <div class='basket-item-content'>
                <img src='${item.img}' class='basket-item-img' alt='${item.name}' loading='lazy'>
                <div class='basket-item-info'>
                    <div class='basket-item-name'>${item.name}</div>
                    <div class='basket-item-price'>${priceFormatted} €
                        <div class='basket-item-quantity'>
                            <button class='basket-btn' onclick='${btnCall}'>${btnText}</button>
                            <span>${item.quantity}</span>
                            <button class='basket-btn' onclick='increaseQuantity(${item.id})'>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
