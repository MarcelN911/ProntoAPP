function createItemName(dish) {
    if (dish.size) return `${dish.name} (${dish.size})`;
    if (dish.variant) return `${dish.name} (${dish.variant})`;
    return dish.name;
}


function createBasketItem(dish, itemName) {
    return {
        id: dish.id || Date.now(),
        name: itemName,
        originalName: dish.name,
        variant: dish.variant || null,
        size: dish.size || null,
        price: dish.price,
        img: dish.img,
        quantity: 1
    };
}


function addToBasket(dish) {
    const itemName = createItemName(dish);
    const existing = basket.find(item => item.name === itemName);

    if (existing) {
        existing.quantity += 1;
    } else {
        basket.push(createBasketItem(dish, itemName));
    }

    renderBasket();
    updateBasketSummary();
}


function removeFromBasket(itemId) {
    basket = basket.filter(item => item.id !== itemId);
    renderBasket();
    renderBasketModal();
    updateBasketSummary();
}


function increaseQuantity(itemId) {
    const item = basket.find(item => item.id === itemId);
    if (item) {
        item.quantity += 1;
        renderBasket();
        renderBasketModal();
        updateBasketSummary();
    }
}


function decreaseQuantity(itemId) {
    const item = basket.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        renderBasket();
        renderBasketModal();
        updateBasketSummary();
    } else {
        removeFromBasket(itemId);
    }
}


function calculateBasketSummary() {
    const subtotal = basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const isDelivery = basket.length > 0 && deliveryMode === "delivery";
    const deliveryCost = isDelivery && subtotal < 30 ? 3.99 : 0;
    return { subtotal, deliveryCost, total: subtotal + deliveryCost };
}


function updateBasketSummary() {
    const { subtotal, deliveryCost, total } = calculateBasketSummary();

    document.getElementById("subtotal-price").textContent = subtotal.toFixed(2) + " €";
    document.getElementById("delivery-price").textContent = deliveryCost.toFixed(2) + " €";
    document.getElementById("total-price").textContent = total.toFixed(2) + " €";

    const modalTotalPrice = document.getElementById("modal-total-price");
    if (modalTotalPrice) {
        modalTotalPrice.textContent = total.toFixed(2).replace(".", ",") + " €";
    }

    updateMobileBar();
}


function updateMobileBar() {
    const totalPrice = document.getElementById("total-price").textContent;
    const itemCount = basket.reduce((sum, item) => sum + item.quantity, 0);
    const label = itemCount === 1 ? " Artikel" : " Artikel";

    document.getElementById("mobile-total-price").textContent = totalPrice;
    document.getElementById("mobile-item-count").textContent = itemCount + label;
}
