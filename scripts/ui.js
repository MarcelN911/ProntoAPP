// UI Rendering Functions

function renderCategorys() {
    const categorysContent = document.getElementById("category-selection");
    categorysContent.innerHTML = "";

    const categorys = Object.keys(menu);

    for (let index = 0; index < categorys.length; index++) {
        const category = categorys[index];
        const categoryButton = document.createElement("button");
        categoryButton.textContent = category;
        categoryButton.classList.add("category-btn");
        
        categoryButton.addEventListener("click", function() {
            document.getElementById(`category-headline-${category}`).scrollIntoView({ behavior: "smooth" });
        });
        
        categorysContent.appendChild(categoryButton);
    }
}

function renderMenuCards() {
        const mainContainer = document.getElementById("menu-main-container");
        mainContainer.innerHTML = "";
        const categorys = Object.keys(menu);

        categorys.forEach(category => {

                const itemsContainer = document.createElement("div");
                itemsContainer.id = `items-container-${category}`;
                itemsContainer.classList.add("item-container");
                mainContainer.appendChild(itemsContainer);

                const headline = document.createElement("h2");
                headline.className = "category-headline";
                headline.id = `category-headline-${category}`;
                headline.textContent = category;
                itemsContainer.appendChild(headline);

                const dishes = menu[category].info;

                if (dishes.length > 0) {
                        const first = dishes[0];
                        itemsContainer.innerHTML += `
                                <div class="menu-card-large">
                                    <img src="${first.img}" class="menu-img-large" alt="${first.name}">
                                    <div class="menu-card-info">
                                        <div class="menu-name">${first.name}</div>
                                        <div class="menu-description">${first.description.join(', ')}</div>
                                        <div class="menu-price-large">${first.price} €</div>
                                        <button class="add-meal-large" data-category="${category}" data-index="0">+</button>
                                    </div>
                                </div>
                        `;
                }

                for (let i = 1; i < dishes.length; i += 2) {
                        const dish1 = dishes[i];
                        const dish2 = dishes[i + 1];
                        itemsContainer.innerHTML += `
                                <div class="menu-card-row">
                                    <div class="menu-card">
                                        <img src="${dish1.img}" class="menu-img" alt="${dish1.name}">
                                        <div class="menu-card-info">
                                            <div class="menu-name">${dish1.name}</div>
                                            <div class="menu-description">${dish1.description.join(', ')}</div>
                                            <div class="menu-price">${dish1.price} €</div>
                                            <button class="add-meal" data-category="${category}" data-index="${i}">+</button>
                                        </div>
                                    </div>
                                    ${dish2 ? `
                                    <div class="menu-card">
                                        <img src="${dish2.img}" class="menu-img" alt="${dish2.name}">
                                        <div class="menu-card-info">
                                            <div class="menu-name">${dish2.name}</div>
                                            <div class="menu-description">${dish2.description.join(', ')}</div>
                                            <div class="menu-price">${dish2.price} €</div>
                                            <button class="add-meal" data-category="${category}" data-index="${i + 1}">+</button>
                                        </div>
                                    </div>
                                    ` : ''}
                                </div>
                        `;
                }
        });
}

function renderBasket() {
    const basketContainer = document.getElementById("basket-container");
    basketContainer.innerHTML = "";

    if (basket.length === 0) {
        basketContainer.innerHTML = `
            <div class="basket-empty">
                <div class="empty-icon">🛒</div>
                <h3>Dein Warenkorb ist noch leer!</h3>
                <p>Lass uns etwas Köstliches finden, das dich verlockt. Dein Bauch wird es dir danken! 😋</p>
            </div>
        `;
        updateMobileBar();
        return;
    }

    basket.forEach(item => {
        const totalPrice = calculateMealPrice(item.price, item.quantity);
        basketContainer.innerHTML += `
            <div class="basket-item">
                <div class="basket-item-content"> 
                    <img src="${item.img}" class="basket-item-img" alt="${item.name}">
                    <div class="basket-item-info">
                        <div class="basket-item-name">${item.name}</div>
                    
                        <div class="basket-item-price">${totalPrice.toFixed(2)} €
                            <div class="basket-item-quantity">
                                <button class="basket-btn" onclick="${item.quantity > 1 ? `decreaseQuantity(${item.id})` : `removeFromBasket(${item.id})`}">
                                    ${item.quantity > 1 ? '-' : '✕'}
                                </button>
                                <span>${item.quantity}</span>
                                <button class="basket-btn" onclick="increaseQuantity(${item.id})">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    updateMobileBar();
}

function renderBasketModal() {
    const basketContainer = document.getElementById("mobile-basket-container");
    basketContainer.innerHTML = "";

    if (basket.length === 0) {
        basketContainer.innerHTML = `
            <div class="basket-empty">
                <div class="empty-icon">🛒</div>
                <h3>Dein Warenkorb ist noch leer!</h3>
                <p>Lass uns etwas Köstliches finden, das dich verlockt. Dein Bauch wird es dir danken! 😋</p>
            </div>
        `;
        
        document.getElementById("mobile-subtotal-price").textContent = "0,00 €";
        document.getElementById("mobile-delivery-price").textContent = "0,00 €";
        document.getElementById("mobile-order-total-price").textContent = "0,00 €";
        return;
    }

    basket.forEach(item => {
        const totalPrice = calculateMealPrice(item.price, item.quantity);
        basketContainer.innerHTML += `
            <div class="basket-item">
                <div class="basket-item-content"> 
                    <img src="${item.img}" class="basket-item-img" alt="${item.name}">
                    <div class="basket-item-info">
                        <div class="basket-item-name">${item.name}</div>
                    
                        <div class="basket-item-price">${totalPrice.toFixed(2)} €
                            <div class="basket-item-quantity">
                                <button class="basket-btn" onclick="${item.quantity > 1 ? `decreaseQuantity(${item.id})` : `removeFromBasket(${item.id})`}">
                                    ${item.quantity > 1 ? '-' : '✕'}
                                </button>
                                <span>${item.quantity}</span>
                                <button class="basket-btn" onclick="increaseQuantity(${item.id})">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    // Update Mobile summary
    const subtotal = basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let deliveryCost = 0;
    if (deliveryMode === "delivery") {
        deliveryCost = subtotal >= 30 ? 0 : 3.99;
    }
    const total = subtotal + deliveryCost;

    document.getElementById("mobile-subtotal-price").textContent = subtotal.toFixed(2) + " €";
    document.getElementById("mobile-delivery-price").textContent = deliveryCost.toFixed(2) + " €";
    document.getElementById("mobile-order-total-price").textContent = total.toFixed(2) + " €";
}

function openBasketModal() {
    document.getElementById("basket-modal").classList.remove("hidden");
    renderBasketModal();
}

function closeBasketModal() {
    document.getElementById("basket-modal").classList.add("hidden");
}

function openVariantModal(dishName, variants, category, dishIndex) {
    document.getElementById("variant-title").textContent = `${dishName} - Variante wählen`;
    const variantOptions = document.getElementById("variant-options");
    variantOptions.innerHTML = "";
    
    variants.forEach(variant => {
        const btn = document.createElement("button");
        btn.className = "variant-btn";
        btn.textContent = variant;
        btn.onclick = () => selectVariant(variant, category, dishIndex);
        variantOptions.appendChild(btn);
    });
    
    document.getElementById("variant-modal").classList.remove("hidden");
}

function closeVariantModal() {
    document.getElementById("variant-modal").classList.add("hidden");
}
