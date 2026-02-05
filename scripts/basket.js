var itemIdCounter = 0;

function createItemName(dish) {
    if (dish.size) return `${dish.name} (${dish.size})`;
    if (dish.variant) return `${dish.name} (${dish.variant})`;
    return dish.name;
}


function createBasketItem(dish, itemName) {
    itemIdCounter = itemIdCounter + 1;
    return {
        id: itemIdCounter,
        name: itemName,
        originalName: dish.name,
        variant: dish.variant || null,
        size: dish.size || null,
        price: dish.price,
        img: dish.img,
        quantity: 1
    };
}


function findBasketItemByName(itemName) {
    for (let index = 0; index < basket.length; index++) {
        if (basket[index].name === itemName) {
            return basket[index];
        }
    }
    return null;
}


function addToBasket(dish) {
    const itemName = createItemName(dish);
    const existing = findBasketItemByName(itemName);
    if (existing) {
        existing.quantity = existing.quantity + 1;
    } else {
        basket.push(createBasketItem(dish, itemName));
    }
    renderBasket();
    updateBasketSummary();
}


function removeFromBasket(itemId) {
    const newBasket = [];
    for (let index = 0; index < basket.length; index++) {
        if (basket[index].id !== itemId) {
            newBasket.push(basket[index]);
        }
    }
    basket = newBasket;
    renderBasket();
    renderBasketModal();
    updateBasketSummary();
}


function increaseQuantity(itemId) {
    let item = null;
    for (let index = 0; index < basket.length; index++) {
        if (basket[index].id === itemId) {
            item = basket[index];
            break;
        }
    }
    if (item) {
        item.quantity = item.quantity + 1;
        renderBasket();
        renderBasketModal();
        updateBasketSummary();
    }
}


function findBasketItemById(itemId) {
    for (let index = 0; index < basket.length; index++) {
        if (basket[index].id === itemId) {
            return basket[index];
        }
    }
    return null;
}


function decreaseQuantity(itemId) {
    const item = findBasketItemById(itemId);
    if (item && item.quantity > 1) {
        item.quantity = item.quantity - 1;
        renderBasket();
        renderBasketModal();
        updateBasketSummary();
    } else {
        removeFromBasket(itemId);
    }
}


function calculateSubtotal() {
    let subtotal = 0;
    for (let index = 0; index < basket.length; index++) {
        const item = basket[index];
        subtotal = subtotal + (item.price * item.quantity);
    }
    return subtotal;
}


function calculateDeliveryCost(subtotal) {
    if (basket.length > 0 && deliveryMode === "delivery" && subtotal < 30) {
        return 3.99;
    }
    return 0;
}


function calculateBasketSummary() {
    const subtotal = calculateSubtotal();
    const deliveryCost = calculateDeliveryCost(subtotal);
    return {
        subtotal: subtotal,
        deliveryCost: deliveryCost,
        total: subtotal + deliveryCost
    };
}


function updateDeliveryTimeDisplay() {
    const desktopTimeRow = document.getElementById("delivery-time-row-desktop");
    const mobileTimeRow = document.getElementById("delivery-time-row-mobile");
    if (deliveryMode === "delivery") {
        desktopTimeRow.style.display = "flex";
        mobileTimeRow.style.display = "flex";
    } else {
        desktopTimeRow.style.display = "none";
        mobileTimeRow.style.display = "none";
    }
}


function updateBasketSummary() {
    const summary = calculateBasketSummary();
    document.getElementById("subtotal-price").textContent = summary.subtotal.toFixed(2) + " €";
    document.getElementById("delivery-price").textContent = summary.deliveryCost.toFixed(2) + " €";
    document.getElementById("total-price").textContent = summary.total.toFixed(2) + " €";
    
    const modalPrice = document.getElementById("modal-total-price");
    if (modalPrice) {
        modalPrice.textContent = summary.total.toFixed(2).replace(".", ",") + " €";
    }
    
    updateDeliveryTimeDisplay();
    updateMobileBar();
}


function updateMobileBar() {
    const totalPrice = document.getElementById("total-price").textContent;
    let itemCount = 0;
    for (let index = 0; index < basket.length; index++) {
        itemCount = itemCount + basket[index].quantity;
    }
    let label = " Artikel";
    document.getElementById("mobile-total-price").textContent = totalPrice;
    document.getElementById("mobile-item-count").textContent = itemCount + label;
}


function renderBasket() {
    const container = document.getElementById("basket-container");
    container.innerHTML = "";
    if (basket.length === 0) {
        container.innerHTML = createEmptyBasketTemplate();
        return;
    }
    for (let index = 0; index < basket.length; index++) {
        const item = basket[index];
        const template = createBasketItemTemplate(item);
        container.innerHTML = container.innerHTML + template;
    }
}


function renderBasketModal() {
    const container = document.getElementById("mobile-basket-container");
    container.innerHTML = "";
    if (basket.length === 0) {
        container.innerHTML = createEmptyBasketTemplate();
    } else {
        for (let index = 0; index < basket.length; index++) {
            const item = basket[index];
            const template = createBasketItemTemplate(item);
            container.innerHTML = container.innerHTML + template;
        }
    }
    updateBasketModalPrices();
}


function updateBasketModalPrices() {
    if (basket.length === 0) {
        document.getElementById("mobile-subtotal-price").textContent = "0,00 €";
        document.getElementById("mobile-delivery-price").textContent = "0,00 €";
        document.getElementById("mobile-order-total-price").textContent = "0,00 €";
        return;
    }
    const summary = calculateBasketSummary();
    document.getElementById("mobile-subtotal-price").textContent = summary.subtotal.toFixed(2) + " €";
    document.getElementById("mobile-delivery-price").textContent = summary.deliveryCost.toFixed(2) + " €";
    document.getElementById("mobile-order-total-price").textContent = summary.total.toFixed(2) + " €";
}
