function updateOrderModalContent(total, mode) {
    document.getElementById("modal-total-price").textContent = total.toFixed(2).replace(".", ",") + " €";
    let modeText = "Abholung";
    if (mode === "delivery") {
        modeText = "Lieferung";
    }
    document.getElementById("modal-delivery-mode").textContent = modeText;
    const deliveryTimeRow = document.getElementById("delivery-time-row");
    let displayStyle = "none";
    if (mode === "delivery") {
        displayStyle = "flex";
    }
    deliveryTimeRow.style.display = displayStyle;
}


function showOrderModal(total, mode) {
    updateOrderModalContent(total, mode);
    const orderModal = document.getElementById("order-modal");
    orderModal.classList.remove("hidden");
    orderModal.removeAttribute("inert");
    document.body.style.overflow = "hidden";
}


function clearBasketAndRender() {
    basket = [];
    renderBasket();
    renderBasketModal();
    updateBasketSummary();
}


function submitOrder() {
    if (basket.length === 0) {
        alert("Der Warenkorb ist leer!");
        return;
    }
    const summary = calculateBasketSummary();
    showOrderModal(summary.total, deliveryMode);
}


function closeOrderModal() {
    const orderModal = document.getElementById("order-modal");
    orderModal.classList.add("hidden");
    orderModal.setAttribute("inert", "");
    document.body.style.overflow = "auto";
    clearBasketAndRender();
}

