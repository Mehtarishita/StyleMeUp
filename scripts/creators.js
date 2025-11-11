const grid = document.getElementById("productGrid");

// Example Data (ye baad me backend ya database se aayega)
const products = [
  {
    name: "Summer Chic Dress",
    link: "https://www.myntra.com/dress123?affid=creator01",
    coupon: "STYLE20",
    image: "assets/images/products/dress1.jpg"
  },
  {
    name: "Casual Sneakers",
    link: "https://www.flipkart.com/sneaker456?affid=creator02",
    coupon: "FLIP10",
    image: "assets/images/products/shoes1.jpg"
  },
  {
    name: "Ethnic Kurta",
    link: "https://www.ajio.com/kurta789?affid=creator03",
    coupon: "AJIO15",
    image: "assets/images/products/kurta1.jpg"
  }
];

products.forEach(p => {
  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p class="coupon">Use Code: ${p.coupon}</p>
    <a href="${p.link}" target="_blank" class="btn btn--primary">Shop Now</a>
  `;

  grid.appendChild(card);
});
function addProduct() {
  const name = document.getElementById("productName").value;
  const link = document.getElementById("productLink").value;
  const coupon = document.getElementById("couponCode").value;

  if (!name || !link || !coupon) {
    alert("Please fill all fields!");
    return;
  }

  const productGrid = document.getElementById("productGrid");

  const card = document.createElement("div");
  card.classList.add("product-card");
  card.innerHTML = `
    <img src="assets/images/default-product.jpg" alt="${name}">
    <h3>${name}</h3>
    <p class="coupon">Coupon: ${coupon}</p>
    <a href="${link}" target="_blank" class="btn btn--primary">Shop Now</a>
  `;

  productGrid.appendChild(card);

  // Reset fields
  document.getElementById("productName").value = "";
  document.getElementById("productLink").value = "";
  document.getElementById("couponCode").value = "";
}
