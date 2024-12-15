// Initialize cart and favorites
let cart = JSON.parse(localStorage.getItem("cart-items")) || [];
let favorites = null;

// Add to Cart functionality
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
        const card = event.target.closest(".medicine-card");
        const name = card.querySelector("h3").textContent;
        const price = parseFloat(card.querySelector("p").textContent.replace(/[^0-9.]/g, ""));
        const quantity = parseInt(card.querySelector(".quantity-input").value, 10);

        if (quantity > 0) {
            const item = cart.find((item) => item.name === name);
            if (item) {
                item.quantity += quantity; // Update quantity
            } else {
                cart.push({ name, price, quantity }); // Add new item
            }
            updateCartDisplay();
            localStorage.setItem("cart-items", JSON.stringify(cart)); // Save to localStorage
        } else {
            alert("Please enter a valid quantity.");
        }
    });
});

// Update Cart Display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    cartItemsContainer.innerHTML = ""; // Clear previous entries
    let totalPrice = 0;

    cart.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Save to Favorites
document.getElementById("add-to-favourites").addEventListener("click", () => {
    favorites = [...cart];
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Favorites saved successfully.");
});

// Apply Favorites
document.getElementById("apply-favourites").addEventListener("click", () => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
        cart = [...favorites];
        updateCartDisplay();
        localStorage.setItem("cart-items", JSON.stringify(cart)); // Sync with localStorage
    } else {
        alert("No favorites saved.");
    }
});

// Buy Now Button
document.getElementById("buy-now").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty! Add items to proceed.");
        return;
    }

    // Navigate to the checkout page
    window.location.href = "checkout.html";
});

// Clear Cart Button
document.getElementById("clear-cart").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your cart?")) {
        cart = []; // Clear the cart array
        localStorage.removeItem("cart-items"); // Remove cart from localStorage
        updateCartDisplay(); // Update the display
        alert("Cart has been cleared!");
    }
});

// Update cart display on page load
updateCartDisplay();
