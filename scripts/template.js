function renderCategorys() {
    const categorysContent = document.getElementById("category-selection");
    categorysContent.innerHTML = "";

    const categorys = Object.keys(menu);

    for (let index = 0; index < categorys.length; index++) {
        const category = categorys[index];
        const categoryButton = document.createElement("button");
        categoryButton.textContent = category;
        categoryButton.classList.add("category-btn");
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

                mainContainer.innerHTML += `<h2 class="category-headline">${category}</h2>`;

                const itemsContainer = document.createElement("div");
                itemsContainer.id = `items-container-${category}`;
                itemsContainer.classList.add("item-container");
                mainContainer.appendChild(itemsContainer);

                const dishes = menu[category].info;

                // Große Karte oben
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

                // Restliche Karten immer zu zweit in einer Zeile
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
            addToBasket(dish);
        }
    });
}

function addToBasket(dish) {
    const existingItem = basket.find(item => item.name === dish.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        basket.push({
            id: Date.now(),
            name: dish.name,
            price: dish.price,
            img: dish.img,
            quantity: 1
        });
    }

    renderBasket();
}

function renderBasket() {
    const basketContainer = document.getElementById("basket-container");
    basketContainer.innerHTML = "";

    basket.forEach(item => {
        basketContainer.innerHTML += `
            <div class="basket-item">
                <div class="basket-item-content"> 
                    <img src="${item.img}" class="basket-item-img" alt="${item.name}">
                    <div class="basket-item-info">
                        <div class="basket-item-name">${item.name}</div>
                    
                        <div class="basket-item-price">${item.price} €
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
}

function removeFromBasket(itemId) {
    basket = basket.filter(item => item.id !== itemId);
    renderBasket();
}

function increaseQuantity(itemId) {
    const item = basket.find(item => item.id === itemId);
    if (item) {
        item.quantity += 1;
        renderBasket();
    }
}

function decreaseQuantity(itemId) {
    const item = basket.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        renderBasket();
    } else {
        removeFromBasket(itemId);
    }
}  

document.addEventListener("DOMContentLoaded", function() {
    setupBasketButtons();
});


