function showProductDetails(productNumber) {
    var modal = document.getElementById("productDetailsModal");
    var productName = document.getElementById("productName");
    var productDescription = document.getElementById("productDescription");

    var productData = getProductData(productNumber);

    productName.innerText = productData.name;
    productDescription.innerHTML = `
        <h3>Product Details</h3>
        <p>${productData.description}</p>
    `;

    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("productDetailsModal");
    modal.style.display = "none";
}

function getProductData(productNumber) {
    const productData = {
        1: {
            name: "Multivitamin",
            description: "Support overall health with essential vitamins and minerals. Our multivitamin..."
        },
        2: {
            name: "Protein Powder",
            description: "Build muscle and aid recovery with high-quality protein supplement. Our protein powder..."
        }
        // Add more product data as needed
    };

    return productData[productNumber];
}