document.getElementById('add-product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const size = document.getElementById('product-size').value || 'UNIVERSAL';
    const imageFile = document.getElementById('product-image').files[0];

    // Check if an image file is selected
    if (!imageFile) {
        alert('Please upload an image file.');
        return;
    }

    // Create a FileReader to read the image file
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const imageUrl = e.target.result;

        // Create a new product object
        const newProduct = { name, price, image: imageUrl, size };

        // Save the new product to localStorage
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));

        // Optionally, clear the form fields
        document.getElementById('add-product-form').reset();

        // Refresh the product list
        loadProductList();
    };

    // Read the image file as a data URL
    reader.readAsDataURL(imageFile);
});

function loadProductList() {
    const productListContainer = document.getElementById('product-list-container');
    productListContainer.innerHTML = ''; // Clear existing content
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Function to create product HTML
    function createProductHTML(product) {
        return `
            <div class="product" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}" data-size="${product.size}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h2>${product.name}</h2>
                <p><b>Price: ${product.price} MKD</b></p>
                <p>Size: ${product.size}</p>
                <button onclick="removeProduct(this)">Remove</button>
            </div>
        `;
    }

    // Append products to the container
    products.forEach(product => {
        productListContainer.innerHTML += createProductHTML(product);
    });
}

function removeProduct(button) {
    const productElement = button.parentElement;
    const name = productElement.dataset.name;

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.name !== name);

    localStorage.setItem('products', JSON.stringify(products));

    // Refresh the product list
    loadProductList();
}

// Load products when the page loads
document.addEventListener('DOMContentLoaded', loadProductList);
