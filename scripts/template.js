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
                // Überschrift für die Kategorie (optional)
                mainContainer.innerHTML += `<h2 class="category-headline">${category}</h2>`;

                // Container für die Karten dieser Kategorie
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
                                        <button class="add-meal-large">+</button>
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
                                            <button class="add-meal">+</button>
                                        </div>
                                    </div>
                                    ${dish2 ? `
                                    <div class="menu-card">
                                        <img src="${dish2.img}" class="menu-img" alt="${dish2.name}">
                                        <div class="menu-card-info">
                                            <div class="menu-name">${dish2.name}</div>
                                            <div class="menu-description">${dish2.description.join(', ')}</div>
                                            <div class="menu-price">${dish2.price} €</div>
                                            <button class="add-meal">+</button>
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