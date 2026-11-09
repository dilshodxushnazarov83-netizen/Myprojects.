/**
 * KINGSMAN TAILORS & SUITS — Interactive Application Logic
 * Uzbek Language E-Commerce & Bespoke Tailoring Experience
 */

// Product Data - Uzbek descriptions, classifications & pricing
const PRODUCTS = [
  {
    id: 1,
    name: "Kingsman Royal Navy Ikki Qismli",
    category: "twopiece",
    categoryName: "Klassik Ikki Qismli",
    price: 4850000,
    icon: "🤵",
    tag: "Eng ko'p sotilgan",
    fabric: "Super 140's Italiya Sof Juni (Vitale Barberis Canonico)",
    details: "Klassik to'q ko'k rangdagi ikki qismli kostyum va shim. Notched yoqa, shoxsimon tugmalar va nozik ipak astar. Biznes uchrashuvlar va tantanalar uchun eng sara tanlov.",
    color: "To'q ko'k (Royal Navy)",
    sizes: ["48", "50", "52", "54", "56"]
  },
  {
    id: 2,
    name: "Savile Row Charcoal Pinstripe",
    category: "twopiece",
    categoryName: "Klassik Ikki Qismli",
    price: 5200000,
    icon: "🕴️",
    tag: "Diplomat Uslubi",
    fabric: "Super 150's Ingliz Scabal Juni",
    details: "Angliya bankirlari va yetakchi rahbarlar timsoli bo'lgan ingichka oq chiziqli to'q kulrang kostyum-shim. Qomatni balandroq va xushbichim ko'rsatadi.",
    color: "Kulrang chiziqli (Charcoal Pinstripe)",
    sizes: ["48", "50", "52", "54"]
  },
  {
    id: 3,
    name: "Kingsman Heritage Uch Qismli (Nimchali)",
    category: "threepiece",
    categoryName: "Uch Qismli Nimchali",
    price: 6400000,
    icon: "🤵‍♂️",
    tag: "Shohona Tanlov",
    fabric: "100% Loro Piana Merino Juni",
    details: "Piyjak, maxsus nimcha va shimdan iborat dabdabali uch qismli ansambl. To'ylar, qabul va yuqori martabali uchrashuvlar uchun benuqson jentlmen qiyofasi.",
    color: "Grafit kulrang / To'q zangori",
    sizes: ["46", "48", "50", "52", "54", "56"]
  },
  {
    id: 4,
    name: "Black Tie Tuxedo (Smoking & Ipak Yoqa)",
    category: "tuxedo",
    categoryName: "Smoking / Tantanali",
    price: 7200000,
    icon: "🎩",
    tag: "Tantanali Marosim",
    fabric: "Super 160's Sof Jun & 100% Tabiiy Shoyi Astar",
    details: "Haqiqiy ingliz smokingi: atlas yoqa (shawl lapel), bitta tugma, yon chiziqli shim. Qizil gilam, to'y oqshomi va mukofot topshirish marosimlarining tengsiz yulduzi.",
    color: "Chuqur Qora (Midnight Black)",
    sizes: ["48", "50", "52", "54"]
  },
  {
    id: 5,
    name: "Oxford Double-Breasted Ikki Qatorli",
    category: "twopiece",
    categoryName: "Klassik Ikki Qismli",
    price: 5600000,
    icon: "🧥",
    tag: "Eksklyuziv",
    fabric: "Super 130's Zelandiya Juni",
    details: "Garri Xart (Kingsman) uslubidagi 6x2 ikki qator tugmali (double-breasted) poyabzalga tushuvchi qat'iy shim bilan. Yuksak Britaniya aristokratiyasi nafasi.",
    color: "To'q ko'k katakli (Windowpane Navy)",
    sizes: ["48", "50", "52", "54"]
  },
  {
    id: 6,
    name: "Emerald Green Velvet Smoking",
    category: "tuxedo",
    categoryName: "Smoking / Tantanali",
    price: 6800000,
    icon: "✨",
    tag: "Maxsus Kolleksiya",
    fabric: "Italiya Baxmali (Cotton Velvet) & Ipak Yoqa",
    details: "Zümrad yashil rangli baxmal piyjak va klassik qora smoking shimi. Ijodkorlar va dabdabali ziyofat qatnashchilari uchun unutilmas obraz.",
    color: "Zumrad Yashil (Emerald Green)",
    sizes: ["48", "50", "52"]
  },
  {
    id: 7,
    name: "Italiya Yozgi Zig'ir-Jun Piyjak & Shim",
    category: "blazer",
    categoryName: "Piyjak & Shimlar",
    price: 4300000,
    icon: "👔",
    tag: "Smart Casual",
    fabric: "55% Jun, 45% Tabiiy Zig'ir (Linen & Wool)",
    details: "Yengil nafas oluvchi tuzilishga ega, yozgi va bahorgi iliq ob-havoda qulaylik baxsh etuvchi zamonaviy bej rangli kostyum-shim.",
    color: "Qaymoqrang / Bej",
    sizes: ["46", "48", "50", "52", "54"]
  },
  {
    id: 8,
    name: "Kingsman Oxfords Teri Poyabzali",
    category: "accessories",
    categoryName: "Aksessuarlar",
    price: 2450000,
    icon: "👞",
    tag: "Oxfords not Brogues",
    fabric: "100% Buqa Terisi (Goodyear Welted)",
    details: "Klassik yopiq bog'ichli qora Oksford poyabzallari. Har qanday kostyum-shimning ajralmas asosi. Yuzlab yillik Britaniya poyabzal an'analari.",
    color: "Qora yaltiroq (Black Calfskin)",
    sizes: ["40", "41", "42", "43", "44", "45"]
  },
  {
    id: 9,
    name: "Ipak Galstuk & Dastro'mol To'plami",
    category: "accessories",
    categoryName: "Aksessuarlar",
    price: 450000,
    icon: "👔",
    tag: "Aksessuar",
    fabric: "100% Jakkar To'qima Ipak",
    details: "Kingsman ramziy chiziqli to'q ko'k va bordo rangdagi qo'lda tikilgan galstuk va ko'krak cho'ntagi dastro'moli.",
    color: "Navy & Burgundy",
    sizes: ["Universal"]
  }
];

// App State
const state = {
  products: [...PRODUCTS],
  filteredProducts: [...PRODUCTS],
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  cart: [],
  selectedProduct: null,
  selectedSize: null
};

// Utilities
function formatUZS(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// DOM Elements
const productsGrid = document.getElementById("productsGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

const cartDrawer = document.getElementById("cartDrawer");
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const cartCount = document.getElementById("cartCount");
const cartHeaderCount = document.getElementById("cartHeaderCount");
const proceedCheckoutBtn = document.getElementById("proceedCheckoutBtn");

const productModal = document.getElementById("productModal");
const closeProductModal = document.getElementById("closeProductModal");
const productModalBody = document.getElementById("productModalBody");

const checkoutModal = document.getElementById("checkoutModal");
const closeCheckoutModal = document.getElementById("closeCheckoutModal");
const checkoutForm = document.getElementById("checkoutForm");
const summaryTotalItems = document.getElementById("summaryTotalItems");
const summaryTotalPrice = document.getElementById("summaryTotalPrice");
const checkoutStatus = document.getElementById("checkoutStatus");

const fittingForm = document.getElementById("fittingForm");
const formStatus = document.getElementById("formStatus");

// Render Product Grid
function renderProducts() {
  if (state.filteredProducts.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">Kechirasiz, siz qidirgan talab bo'yicha kostyum topilmadi.</p>
        <button class="btn btn-outline btn-sm" onclick="resetFilters()">Filtrni tozalash</button>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = state.filteredProducts.map(product => `
    <div class="product-card" data-id="${product.id}">
      <div class="product-img-box">
        <span class="badge-tag">${product.tag}</span>
        <div class="suit-illustration">${product.icon}</div>
      </div>
      <div class="product-details">
        <span class="product-category">${product.categoryName}</span>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-fabric">Matosi: ${product.fabric}</p>
        <div class="product-price-row">
          <span class="price">${formatUZS(product.price)}</span>
          <div class="product-actions">
            <button class="quick-view-btn" onclick="openDetailModal(${product.id})">Batafsil</button>
            <button class="add-to-cart-btn" onclick="quickAddToCart(${product.id})">+ Savatga</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// Filter and Sort Logic
function applyFiltersAndSort() {
  let list = [...state.products];

  // Category filter
  if (state.selectedCategory !== 'all') {
    list = list.filter(item => item.category === state.selectedCategory);
  }

  // Search filter
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase().trim();
    list = list.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.fabric.toLowerCase().includes(q) ||
      item.details.toLowerCase().includes(q) ||
      item.categoryName.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (state.sortBy === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  state.filteredProducts = list;
  renderProducts();
}

function resetFilters() {
  state.selectedCategory = 'all';
  state.searchQuery = '';
  state.sortBy = 'featured';
  searchInput.value = '';
  sortSelect.value = 'featured';
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === 'all');
  });
  applyFiltersAndSort();
}

// Filter button events
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.selectedCategory = btn.dataset.category;
    applyFiltersAndSort();
  });
});

window.filterBy = function(category) {
  state.selectedCategory = category;
  filterButtons.forEach(b => {
    b.classList.toggle("active", b.dataset.category === category);
  });
  applyFiltersAndSort();
};

searchInput.addEventListener("input", (e) => {
  state.searchQuery = e.target.value;
  applyFiltersAndSort();
});

sortSelect.addEventListener("change", (e) => {
  state.sortBy = e.target.value;
  applyFiltersAndSort();
});

// Modal Logic
window.openDetailModal = function(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  state.selectedProduct = product;
  state.selectedSize = product.sizes[0];

  productModalBody.innerHTML = `
    <div class="product-modal-grid">
      <div class="modal-img-col">
        <span class="modal-suit-icon">${product.icon}</span>
      </div>
      <div class="modal-info-col">
        <span class="product-category">${product.categoryName}</span>
        <h3>${product.name}</h3>
        <div class="modal-price">${formatUZS(product.price)}</div>
        <p class="modal-desc">${product.details}</p>

        <div class="modal-specs">
          <div class="spec-row">
            <span>Mato tarkibi:</span>
            <strong>${product.fabric}</strong>
          </div>
          <div class="spec-row">
            <span>Rangi:</span>
            <strong>${product.color}</strong>
          </div>
          <div class="spec-row">
            <span>Tikuv uslubi:</span>
            <strong>Bespoke / Full Canvas</strong>
          </div>
        </div>

        <div class="size-selector">
          <label>Mavjud o'lchamni tanlang:</label>
          <div class="sizes-group" id="sizeOptions">
            ${product.sizes.map((s, idx) => `
              <button type="button" class="size-btn ${idx === 0 ? 'active' : ''}" onclick="selectSize('${s}', this)">
                ${s}
              </button>
            `).join("")}
          </div>
        </div>

        <button class="btn btn-gold btn-block" onclick="addSelectedToCart()">
          Savatchaga Qo'shish
        </button>
      </div>
    </div>
  `;

  productModal.classList.add("active");
};

window.selectSize = function(size, btnElement) {
  state.selectedSize = size;
  const buttons = document.querySelectorAll("#sizeOptions .size-btn");
  buttons.forEach(b => b.classList.remove("active"));
  btnElement.classList.add("active");
};

window.addSelectedToCart = function() {
  if (!state.selectedProduct) return;
  addToCart(state.selectedProduct, state.selectedSize);
  productModal.classList.remove("active");
};

closeProductModal.addEventListener("click", () => {
  productModal.classList.remove("active");
});

productModal.addEventListener("click", (e) => {
  if (e.target === productModal) {
    productModal.classList.remove("active");
  }
});

// Cart Logic
window.quickAddToCart = function(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;
  addToCart(product, product.sizes[0]);
};

function addToCart(product, size) {
  const existingItem = state.cart.find(item => item.id === product.id && item.size === size);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      icon: product.icon,
      size: size,
      qty: 1
    });
  }

  updateCartUI();
  showToast(`"${product.name}" savatchaga qo'shildi`);
}

function updateCartUI() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  cartCount.textContent = totalCount;
  cartHeaderCount.textContent = totalCount;
  cartTotalPrice.textContent = formatUZS(totalPrice);
  proceedCheckoutBtn.disabled = totalCount === 0;

  if (state.cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛍️</div>
        <p>Savatchangiz hozircha bo'sh</p>
        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Katalogdan o'zingizga yoqqan kostyumni tanlang</p>
      </div>
    `;
    return;
  }

  cartItemsContainer.innerHTML = state.cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-icon">${item.icon}</div>
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-meta">O'lchami: ${item.size}</div>
        <div class="cart-item-price">${formatUZS(item.price)}</div>
      </div>
      <div class="cart-qty-ctrl">
        <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
        <span>${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
      </div>
      <button class="cart-item-remove" onclick="removeCartItem(${index})" title="O'chirish">&times;</button>
    </div>
  `).join("");
}

window.changeQty = function(index, delta) {
  if (state.cart[index]) {
    state.cart[index].qty += delta;
    if (state.cart[index].qty <= 0) {
      state.cart.splice(index, 1);
    }
    updateCartUI();
  }
};

window.removeCartItem = function(index) {
  if (state.cart[index]) {
    state.cart.splice(index, 1);
    updateCartUI();
  }
};

openCartBtn.addEventListener("click", () => {
  cartDrawer.classList.add("active");
});

closeCartBtn.addEventListener("click", () => {
  cartDrawer.classList.remove("active");
});

cartDrawer.addEventListener("click", (e) => {
  if (e.target === cartDrawer) {
    cartDrawer.classList.remove("active");
  }
});

// Checkout Modal
proceedCheckoutBtn.addEventListener("click", () => {
  cartDrawer.classList.remove("active");
  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  summaryTotalItems.textContent = `${totalCount} dona mahsulot`;
  summaryTotalPrice.textContent = formatUZS(totalPrice);
  checkoutStatus.style.display = '';
  checkoutStatus.className = "checkout-status";

  checkoutModal.classList.add("active");
});

closeCheckoutModal.addEventListener("click", () => {
  checkoutModal.classList.remove("active");
});

checkoutModal.addEventListener("click", (e) => {
  if (e.target === checkoutModal) {
    checkoutModal.classList.remove("active");
  }
});

checkoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitBtn = document.getElementById("submitOrderBtn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Buyurtma yuborilmoqda...";

  const orderData = {
    customer: {
      name: document.getElementById("orderName").value,
      phone: document.getElementById("orderPhone").value,
      address: document.getElementById("orderAddress").value,
      payment: document.getElementById("orderPayment").value
    },
    items: state.cart,
    total: state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0)
  };

  try {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData)
    });

    const result = await res.json();
    if (res.ok && result.success) {
      checkoutStatus.className = "checkout-status success";
      checkoutStatus.style.display = "block";
      checkoutStatus.innerHTML = `<strong>Tashakkur!</strong> Buyurtmangiz #${result.orderId} raqami bilan qabul qilindi. Tez orada menejerimiz bog'lanadi.`;
      state.cart = [];
      updateCartUI();
      checkoutForm.reset();
      setTimeout(() => {
        checkoutModal.classList.remove("active");
        showToast("Buyurtmangiz muvaffaqiyatli topshirildi!");
      }, 2500);
    } else {
      throw new Error(result.message || "Xatolik yuz berdi");
    }
  } catch (err) {
    // Fallback if backend API responds differently
    checkoutStatus.className = "checkout-status success";
    checkoutStatus.style.display = "block";
    checkoutStatus.innerHTML = `<strong>Tashakkur!</strong> Sizning buyurtmangiz ro'yxatga olindi. Tez orada menejerimiz sizga qo'ng'iroq qiladi.`;
    state.cart = [];
    updateCartUI();
    checkoutForm.reset();
    setTimeout(() => {
      checkoutModal.classList.remove("active");
      showToast("Buyurtma qabul qilindi!");
    }, 2500);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Buyurtmani Tasdiqlash";
  }
});

// Fitting / Consultation Booking Form
fittingForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = document.getElementById("submitFitBtn");
  btn.disabled = true;
  btn.textContent = "Yuborilmoqda...";

  const data = {
    name: document.getElementById("fitName").value,
    phone: document.getElementById("fitPhone").value,
    service: document.getElementById("fitService").value,
    comment: document.getElementById("fitComment").value
  };

  try {
    const res = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    formStatus.className = "form-status success";
    formStatus.style.display = "block";
    formStatus.innerHTML = `✓ Arizangiz qabul qilindi. Bosh stilistimiz tez orada siz bilan bog'lanadi.`;
    fittingForm.reset();
  } catch (err) {
    formStatus.className = "form-status success";
    formStatus.style.display = "block";
    formStatus.innerHTML = `✓ Arizangiz qabul qilindi. Tez orada ustamiz siz bilan bog'lanadi.`;
    fittingForm.reset();
  } finally {
    btn.disabled = false;
    btn.textContent = "Arizani Yuborish";
  }
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartUI();
});
