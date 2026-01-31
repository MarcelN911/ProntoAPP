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

function calculateMealPrice(price, quantity) {
    return price * quantity;
}

function updateBasketSummary() {

    const subtotal = basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let deliveryCost = 0;
    // Lieferkosten nur berechnen, wenn Warenkorb nicht leer ist
    if (basket.length > 0 && deliveryMode === "delivery") {
        deliveryCost = subtotal >= 30 ? 0 : 3.99;
    }
    
    const total = subtotal + deliveryCost;
    
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
    const itemCount = basket.length;
    document.getElementById("mobile-total-price").textContent = totalPrice;
    document.getElementById("mobile-item-count").textContent = itemCount + (itemCount === 1 ? " Artikel" : " Artikel");
}
