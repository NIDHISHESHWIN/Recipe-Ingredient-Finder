document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ingredient-form');
    const results = document.getElementById('results');

    const recipes = [
        {
            title: 'Dosa',
            image: 'images/MasalaDosa.jpg',
            ingredients: ['rice', 'urad dal', 'fenugreek seeds', 'salt', 'oil']
        },
        {
            title: 'Idli',
            image: 'images/idli.jpg',
            ingredients: ['rice', 'urad dal', 'fenugreek seeds', 'salt']
        },
        {
            title: 'Sambar',
            image: 'images/sambar.jpg',
            ingredients: ['toor dal', 'tamarind', 'vegetables', 'sambar powder', 'salt', 'oil']
        },
        {
            title: 'Rasam',
            image: 'images/rasam.jpg',
            ingredients: ['toor dal', 'tamarind', 'tomato', 'rasam powder', 'salt', 'oil']
        },
        {
            title: 'Pongal',
            image: 'images/pongal.jpg',
            ingredients: ['rice', 'moong dal', 'pepper', 'cumin', 'ginger', 'ghee', 'cashews']
        },
        {
            title: 'Vada',
            image: 'images/vada.jpg',
            ingredients: ["urad dal", "onion", "cumin seeds", "green chili"]
        },
        {
            title: 'Upma',
            image: 'images/upma.jpg',
            ingredients: ["semolina", "onion", "mustard seeds", "green chili"]
        },
    ];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        results.innerHTML = '';
        const input = document.getElementById('ingredients').value;
        const inputIngredients = input.split(',').map(ingredient => ingredient.trim().toLowerCase());

        const filteredRecipes = recipes.map(recipe => {
            const usedIngredients = recipe.ingredients.filter(ingredient => inputIngredients.includes(ingredient));
            const missedIngredients = recipe.ingredients.filter(ingredient => !inputIngredients.includes(ingredient));
            return {
                ...recipe,
                usedIngredientCount: usedIngredients.length,
                missedIngredientCount: missedIngredients.length,
                usedIngredients,
                missedIngredients
            };
        }).filter(recipe => recipe.usedIngredientCount > 0);

        if (filteredRecipes.length === 0) {
            results.innerHTML = '<p>No recipes found with the given ingredients.</p>';
        } else {
            filteredRecipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('recipe-card');
                recipeCard.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <div class="recipe-details">
                        <h2>${recipe.title}</h2>
                        <p>Used ingredients (${recipe.usedIngredientCount}): ${recipe.usedIngredients.join(', ')}</p>
                        <p>Missed ingredients (${recipe.missedIngredientCount}): ${recipe.missedIngredients.join(', ')}</p>
                    </div>
                `;
                results.appendChild(recipeCard);
            });
        }
    });
});
