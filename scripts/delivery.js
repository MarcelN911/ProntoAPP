// Delivery Mode Management

let deliveryMode = "delivery";

function setDeliveryMode(mode) {
    deliveryMode = mode;
    
    document.getElementById("delivery-btn").classList.toggle("active", mode === "delivery");
    document.getElementById("pickup-btn").classList.toggle("active", mode === "pickup");
    
    updateBasketSummary();
}
