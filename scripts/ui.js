const CATEGORY_ICONS = {
    "Kolumbianisch": "🇨🇴",
    "Burger": "🍔",
    "Pizza": "🍕",
    "Pasta": "🍝",
    "Salat": "🥗",
    "Getränke": "🥤"
};


function createCategoryButton(category) {
    const button = document.createElement("button");
    const icon = CATEGORY_ICONS[category] || "📌";
    button.textContent = `${icon} ${category}`;
    button.classList.add("category-btn");
    button.addEventListener("click", () => {
        const id = `category-headline-${category}`;
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    });
    return button;
}


function renderCategories() {
    const container = document.getElementById("category-selection");
    container.innerHTML = "";
    Object.keys(menu).forEach(category => {
        container.appendChild(createCategoryButton(category));
    });
}


function createMenuCardLargeTemplate(dish, category) {
    const priceDisplay = getPriceDisplay(dish, category);
    return `
        <div class="menu-card-large">
            <img src="${dish.img}" class="menu-img-large" alt="${dish.name}" loading="lazy">
            <div class="menu-card-info">
                <div class="menu-name">${dish.name}</div>
                <div class="menu-description">${dish.description.join(', ')}</div>
                <div class="menu-price-large">${priceDisplay}</div>
                <button class="add-meal-large" data-category="${category}" data-index="0">+</button>
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
                <button class="add-meal" data-category="${category}" data-index="${index}">+</button>
            </div>
        </div>
    `;
}


function createMenuCardRowTemplate(d1, d2, category, idx1, idx2) {
    const card2 = d2 ? createMenuCardTemplate(d2, category, idx2) : '';
    return `
        <div class="menu-card-row">
            ${createMenuCardTemplate(d1, category, idx1)}
            ${card2}
        </div>
    `;
}


function renderMenuCardLarge(container, dish, category) {
    container.innerHTML += createMenuCardLargeTemplate(dish, category);
}


function renderMenuCardRows(container, dishes, category, startIdx) {
    for (let i = startIdx; i < dishes.length; i += 2) {
        const html = createMenuCardRowTemplate(
            dishes[i],
            dishes[i + 1],
            category,
            i,
            i + 1
        );
        container.innerHTML += html;
    }
}


function renderCategoryHeadline(container, category) {
    const h2 = document.createElement("h2");
    h2.className = "category-headline";
    h2.id = `category-headline-${category}`;
    const icon = CATEGORY_ICONS[category] || "📌";
    h2.textContent = `${icon} ${category}`;
    container.appendChild(h2);
}


function renderMenuCardsForCategory(parent, category) {
    const container = document.createElement("div");
    container.id = `items-container-${category}`;
    container.classList.add("item-container");
    parent.appendChild(container);

    renderCategoryHeadline(container, category);

    const dishes = menu[category].info;
    if (dishes.length === 0) return;

    renderMenuCardLarge(container, dishes[0], category);
    renderMenuCardRows(container, dishes, category, 1);
}


function renderMenuCards() {
    const mainContainer = document.getElementById("menu-main-container");
    mainContainer.innerHTML = "";
    Object.keys(menu).forEach(category => {
        renderMenuCardsForCategory(mainContainer, category);
    });
}

function getPriceDisplay(dish, category) {
    if (category === "Pizza" && dish.sizes) {
        const minPrice = Math.min(...Object.values(dish.sizes));
        return `ab ${minPrice} €`;
    }
    return `${dish.price} €`;
}


function openBasketModal() {
    const modal = document.getElementById("basket-modal");
    modal.classList.remove("hidden");
    modal.removeAttribute("inert");
    renderBasketModal();
}


function closeBasketModal() {
    const modal = document.getElementById("basket-modal");
    modal.classList.add("hidden");
    modal.setAttribute("inert", "");
}


function openVariantModal(dishName, variants, category, dishIndex) {
    const modal = document.getElementById("variant-modal");
    document.getElementById("variant-title").innerHTML = `${dishName} - <br>Variante wählen`;
    const options = document.getElementById("variant-options");
    options.innerHTML = "";
    const buttons = [];
    
    variants.forEach(variant => {
        const btn = document.createElement("button");
        btn.className = "variant-btn";
        btn.textContent = variant;
        btn.onclick = () => selectVariant(variant, category, dishIndex);
        options.appendChild(btn);
        buttons.push(btn);
    });
    
    modal.classList.remove("hidden");
    modal.removeAttribute("inert");
    if (buttons.length > 0) {
        buttons[0].focus();
    }
}


function closeVariantModal() {
    const modal = document.getElementById("variant-modal");
    modal.classList.add("hidden");
    modal.setAttribute("inert", "");
}


function createEmptyBasketTemplate() {
    return `
        <div class="basket-empty">
            <div class="empty-icon">🛒</div>
            <h3>Dein Warenkorb ist noch leer!</h3>
            <p>Lass uns etwas Köstliches finden, das dich verlockt. Dein Bauch wird es dir danken! 😋</p>
        </div>
    `;
}


function openSizeModal(dishName, sizes, category, dishIndex) {
    const modal = document.getElementById("variant-modal");
    document.getElementById("variant-title").innerHTML = `${dishName} - <br>Größe wählen`;
    const options = document.getElementById("variant-options");
    options.innerHTML = "";
    const buttons = [];
    
    Object.entries(sizes).forEach(([size, price]) => {
        const btn = document.createElement("button");
        btn.className = "variant-btn";
        btn.textContent = `${size} - ${price} €`;
        btn.onclick = () => selectSize(size, price, category, dishIndex);
        options.appendChild(btn);
        buttons.push(btn);
    });
    
    modal.classList.remove("hidden");
    modal.removeAttribute("inert");
    if (buttons.length > 0) {
        buttons[0].focus();
    }
}


function calculateMealPrice(price, quantity) {
    return price * quantity;
}


function createBasketItemTemplate(item) {
    const totalPrice = calculateMealPrice(item.price, item.quantity);
    const isFirst = item.quantity > 1;
    const btnText = isFirst ? '-' : '✕';
    const btnCall = isFirst ? `decreaseQuantity(${item.id})` : `removeFromBasket(${item.id})`;
    return `
        <div class="basket-item">
            <div class="basket-item-content"> 
                <img src="${item.img}" class="basket-item-img" alt="${item.name}" loading="lazy">
                <div class="basket-item-info">
                    <div class="basket-item-name">${item.name}</div>
                    <div class="basket-item-price">${totalPrice.toFixed(2)} €
                        <div class="basket-item-quantity">
                            <button class="basket-btn" onclick="${btnCall}">${btnText}</button>
                            <span>${item.quantity}</span>
                            <button class="basket-btn" onclick="increaseQuantity(${item.id})">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function renderBasketItems(container, items) {
    if (items.length === 0) {
        container.innerHTML = createEmptyBasketTemplate();
        return;
    }
    items.forEach(item => {
        container.innerHTML += createBasketItemTemplate(item);
    });
}


function renderBasket() {
    const container = document.getElementById("basket-container");
    container.innerHTML = "";
    renderBasketItems(container, basket);
    updateMobileBar();
}


function updateBasketModalPrices() {
    if (basket.length === 0) {
        document.getElementById("mobile-subtotal-price").textContent = "0,00 €";
        document.getElementById("mobile-delivery-price").textContent = "0,00 €";
        document.getElementById("mobile-order-total-price").textContent = "0,00 €";
        return;
    }

    const sum = (s, item) => s + (item.price * item.quantity);
    const subtotal = basket.reduce(sum, 0);
    const deliveryCost = subtotal >= 30 || deliveryMode !== "delivery" ? 0 : 3.99;
    const total = subtotal + deliveryCost;

    document.getElementById("mobile-subtotal-price").textContent = subtotal.toFixed(2) + " €";
    document.getElementById("mobile-delivery-price").textContent = deliveryCost.toFixed(2) + " €";
    document.getElementById("mobile-order-total-price").textContent = total.toFixed(2) + " €";
}


function renderBasketModal() {
    const container = document.getElementById("mobile-basket-container");
    container.innerHTML = "";
    renderBasketItems(container, basket);
    updateBasketModalPrices();
}



