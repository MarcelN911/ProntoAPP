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

document.addEventListener("DOMContentLoaded", function() {
    renderCategorys();
});

function renderMenuCards() {
        const mainContainer = document.getElementById("menu-main-container");
        mainContainer.innerHTML = "";
        const categorys = Object.keys(menu);

        categorys.forEach(category => {

                mainContainer.innerHTML += `<h2 class="category-headline" id="category-headline-${category}">${category}</h2>`;

                const itemsContainer = document.createElement("div");
                itemsContainer.id = `items-container-${category}`;
                itemsContainer.classList.add("item-container");
                mainContainer.appendChild(itemsContainer);

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

document.addEventListener("DOMContentLoaded", function() {
    renderMenuCards();
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

function addToBasket(dish) {

    const itemName = dish.variant ? `${dish.name} (${dish.variant})` : dish.name;
    const existingItem = basket.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        basket.push({
            id: dish.id || Date.now(),
            name: itemName,
            originalName: dish.name,
            variant: dish.variant || null,
            price: dish.price,
            img: dish.img,
            quantity: 1
        });
    }

    renderBasket();
    updateBasketSummary();
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
                                    ${item.quantity > 1 ? '-' : '<img src="../assets/img/delete.svg" alt="Delete">'}
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
}

function removeFromBasket(itemId) {
    basket = basket.filter(item => item.id !== itemId);
    renderBasket();
    updateBasketSummary();
}

function increaseQuantity(itemId) {
    const item = basket.find(item => item.id === itemId);
    if (item) {
        item.quantity += 1;
        renderBasket();
        updateBasketSummary();
    }
}

function decreaseQuantity(itemId) {
    const item = basket.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        renderBasket();
        updateBasketSummary();
    } else {
        removeFromBasket(itemId);
    }
}

function calculateMealPrice(price, quantity) {
    return price * quantity;
}

let deliveryMode = "delivery";

function setDeliveryMode(mode) {
    deliveryMode = mode;
    
    document.getElementById("delivery-btn").classList.toggle("active", mode === "delivery");
    document.getElementById("pickup-btn").classList.toggle("active", mode === "pickup");
    
    updateBasketSummary();
}

function updateBasketSummary() {

    const subtotal = basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let deliveryCost = 0;
    if (deliveryMode === "delivery") {
        deliveryCost = subtotal >= 30 ? 0 : 3.99;
    }
    
    const total = subtotal + deliveryCost;
    
    document.getElementById("subtotal-price").textContent = subtotal.toFixed(2) + " €";
    document.getElementById("delivery-price").textContent = deliveryCost.toFixed(2) + " €";
    document.getElementById("total-price").textContent = total.toFixed(2) + " €";
}

function submitOrder() {
    if (basket.length === 0) {
        alert("🛒 Dein Warenkorb ist noch leer!\n\nLass uns etwas Köstliches zusammenstellen, bevor du bestellst! 😋");
        return;
    }

    const deliveryText = deliveryMode === "delivery" ? "🚗 Lieferung" : "📦 Abholung";
    document.getElementById("modal-delivery-mode").textContent = deliveryText;
    document.getElementById("modal-total-price").textContent = document.getElementById("total-price").textContent;
    document.getElementById("order-modal").classList.remove("hidden");
}

function closeOrderModal() {
    document.getElementById("order-modal").classList.add("hidden");

    basket = [];
    renderBasket();
    updateBasketSummary();
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

document.addEventListener("DOMContentLoaded", function() {
    setupBasketButtons();
    renderBasket();
    updateBasketSummary();
});


