let deliveryMode = "delivery";

function setDeliveryMode(mode) {
    deliveryMode = mode;
    
    const deliveryBtn = document.getElementById("delivery-btn");
    const pickupBtn = document.getElementById("pickup-btn");
    
    deliveryBtn.classList.toggle("active", mode === "delivery");
    deliveryBtn.setAttribute("aria-pressed", mode === "delivery");
    
    pickupBtn.classList.toggle("active", mode === "pickup");
    pickupBtn.setAttribute("aria-pressed", mode === "pickup");
    
    const deliveryTimeElements = document.getElementById("delivery-time");
    const mobileDeliveryTimeElement = document.getElementById("mobile-delivery-time");
    const modalDeliveryTimeElement = document.getElementById("modal-delivery-time");
    
    if (deliveryTimeElements) {
        deliveryTimeElements.parentElement.style.display = mode === "delivery" ? "flex" : "none";
    }
    if (mobileDeliveryTimeElement) {
        mobileDeliveryTimeElement.parentElement.style.display = mode === "delivery" ? "flex" : "none";
    }
    if (modalDeliveryTimeElement) {
        modalDeliveryTimeElement.parentElement.style.display = mode === "delivery" ? "flex" : "none";
    }
    
    updateBasketSummary();
}
