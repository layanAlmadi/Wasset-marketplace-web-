document.addEventListener('DOMContentLoaded', () => {
    // Get form and form elements
    const form = document.querySelector('.add-product-form');
    const productNameInput = document.getElementById('productName');
    const photoInput = document.getElementById('photo');
    const regularPriceInput = document.getElementById('regularPrice');
    const quantityInput = document.getElementById('quantity');
    const salePriceInput = document.getElementById('salePrice');
    const descriptionInput = document.getElementById('description');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission

        // Input validation
        const productName = productNameInput.value.trim();
        const photo = photoInput.files[0]; // Get the uploaded file
        const regularPrice = regularPriceInput.value.trim();
        const quantity = quantityInput.value.trim();
        const salePrice = salePriceInput.value.trim();
        const description = descriptionInput.value.trim();

        // Check for empty fields
        if (!productName || !photo || !regularPrice || !quantity || !description) {
            alert('Please fill out all required fields.');
            return;
        }

        // Validate product name (should not start with a number)
        if (/^\d/.test(productName)) {
            alert('Product name cannot start with a number.');
            return;
        }

        // Validate numeric fields
        if (isNaN(regularPrice) || isNaN(quantity)) {
            alert('Regular price and quantity must be numbers.');
            return;
        }

        if (salePrice && isNaN(salePrice)) {
            alert('Sale price must be a number.');
            return;
        }

        // Create a FileReader to convert the image to Base64
        const reader = new FileReader();
        reader.onload = () => {
            const imageBase64 = reader.result; // The image in Base64 format

            // Create a product object
            const product = {
                name: productName,
                photo: imageBase64, // Save the Base64 image
                regularPrice: parseFloat(regularPrice),
                quantity: parseInt(quantity),
                salePrice: salePrice ? parseFloat(salePrice) : null,
                description: description
            };

            // Retrieve existing products from localStorage
            const existingProducts = JSON.parse(localStorage.getItem('sellerProducts')) || [];

            // Add new product to the array
            existingProducts.push(product);

            // Save updated products list to localStorage
            localStorage.setItem('sellerProducts', JSON.stringify(existingProducts));

            // Alert success message
            alert(`Product "${product.name}" has been added successfully.`);

            // Clear the form
            form.reset();
        };

        // Read the uploaded photo file as Base64
        reader.readAsDataURL(photo);
    });
});
