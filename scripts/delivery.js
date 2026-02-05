let deliveryMode = "delivery";

function updateButtonState(button, isActive) {
    if (isActive) {
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
    } else {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
    }
}


function updateDeliveryButtons(mode) {
    const deliveryBtn = document.getElementById("delivery-btn");
    const pickupBtn = document.getElementById("pickup-btn");
    updateButtonState(deliveryBtn, mode === "delivery");
    updateButtonState(pickupBtn, mode === "pickup");
}


function updateMobileDeliveryButtons(mode) {
    const mobileDeliveryBtn = document.getElementById("mobile-delivery-btn");
    const mobilePickupBtn = document.getElementById("mobile-pickup-btn");
    if (mobileDeliveryBtn) {
        updateButtonState(mobileDeliveryBtn, mode === "delivery");
    }
    if (mobilePickupBtn) {
        updateButtonState(mobilePickupBtn, mode === "pickup");
    }
}


function setDeliveryMode(mode) {
    deliveryMode = mode;
    updateDeliveryButtons(mode);
    updateMobileDeliveryButtons(mode);
    updateBasketSummary();
}

