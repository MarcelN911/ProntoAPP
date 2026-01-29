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
    const categorys = Object.keys(menu);

    categorys.forEach(category => {
        const itemsContainer = document.getElementById(`items-container-${category}`);
        if (!itemsContainer) return;

        itemsContainer.innerHTML = "";

        const dishes = menu[category].info;

        dishes.forEach(dish => {
            itemsContainer.innerHTML += `
                <div class="category-headline">
                    <h2>${dish.name}</h2>
                </div>
                <div class="menu-card-container"
                    <div class="menu-card-hero">
                        
                    </div>
                    <div class="menu-container">
                        <div class="menu-card">
                        </div>
                        <div class="menu-card">
                        </div>
                    </div>
                </div>
            `;
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    renderMenuCards();
});