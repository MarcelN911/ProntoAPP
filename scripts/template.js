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