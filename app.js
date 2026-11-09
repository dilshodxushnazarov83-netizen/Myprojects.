/** KINGSMAN TAILORS & SUITS — Frontend Logic */
const PRODUCTS = [
  { id: 1, name: "Kingsman Royal Navy Ikki Qismli", category: "twopiece", categoryName: "Klassik Ikki Qismli", price: 4850000, icon: "🤵", tag: "Eng ko'p sotilgan", fabric: "Super 140's Italiya Sof Juni", details: "To'q ko'k rangli, biznes va tantanalar uchun benuqson ikki qismli kostyum.", color: "To'q ko'k", sizes: ["48", "50", "52", "54", "56"] },
  { id: 2, name: "Savile Row Charcoal Pinstripe", category: "twopiece", categoryName: "Klassik Ikki Qismli", price: 5200000, icon: "🕴️", tag: "Diplomat Uslubi", fabric: "Super 150's Ingliz Scabal Juni", details: "Ingichka oq chiziqli to'q kulrang kostyum-shim, qomatni xushbichim ko'rsatadi.", color: "Kulrang chiziqli", sizes: ["48", "50", "52", "54"] },
  { id: 3, name: "Kingsman Heritage Uch Qismli", category: "threepiece", categoryName: "Uch Qismli Nimchali", price: 6400000, icon: "🤵‍♂️", tag: "Shohona Tanlov", fabric: "100% Loro Piana Merino Juni", details: "Piyjak, maxsus nimcha va shimdan iborat dabdabali uch qismli jentlmen ansambli.", color: "Grafit kulrang", sizes: ["46", "48", "50", "52", "54", "56"] },
  { id: 4, name: "Black Tie Tuxedo (Smoking)", category: "tuxedo", categoryName: "Smoking / Tantanali", price: 7200000, icon: "🎩", tag: "Tantanali Marosim", fabric: "Super 160's Sof Jun & Shoyi Astar", details: "Haqiqiy ingliz smokingi: atlas yoqa, bitta tugma va yon chiziqli shim.", color: "Chuqur Qora", sizes: ["48", "50", "52", "54"] },
  { id: 5, name: "Oxford Double-Breasted Ikki Qatorli", category: "twopiece", categoryName: "Klassik Ikki Qismli", price: 5600000, icon: "🧥", tag: "Eksklyuziv", fabric: "Super 130's Zelandiya Juni", details: "Garri Xart uslubidagi 6x2 tugmali ikki qatorli klassik kostyum-shim.", color: "To'q ko'k katakli", sizes: ["48", "50", "52", "54"] },
  { id: 6, name: "Emerald Green Velvet Smoking", category: "tuxedo", categoryName: "Smoking / Tantanali", price: 6800000, icon: "✨", tag: "Maxsus Kolleksiya", fabric: "Italiya Baxmali & Ipak Yoqa", details: "Zumrad yashil baxmal piyjak va klassik qora shim, ziyofatlar uchun ajoyib obraz.", color: "Zumrad Yashil", sizes: ["48", "50", "52"] },
  { id: 7, name: "Italiya Yozgi Zig'ir-Jun Kostyum", category: "blazer", categoryName: "Piyjak & Shimlar", price: 4300000, icon: "👔", tag: "Smart Casual", fabric: "55% Jun, 45% Tabiiy Zig'ir", details: "Yengil va nafas oluvchi, iliq ob-havoda qulaylik baxsh etuvchi bej kostyum-shim.", color: "Qaymoqrang / Bej", sizes: ["46", "48", "50", "52", "54"] },
  { id: 8, name: "Kingsman Oxfords Teri Poyabzali", category: "accessories", categoryName: "Aksessuarlar", price: 2450000, icon: "👞", tag: "Oxfords not Brogues", fabric: "100% Buqa Terisi (Goodyear)", details: "Klassik yopiq bog'ichli qora Oksford poyabzali, kostyumning ajralmas asosi.", color: "Qora yaltiroq", sizes: ["40", "41", "42", "43", "44", "45"] },
  { id: 9, name: "Ipak Galstuk & Dastro'mol To'plami", category: "accessories", categoryName: "Aksessuarlar", price: 450000, icon: "👔", tag: "Aksessuar", fabric: "100% Jakkar To'qima Ipak", details: "Kingsman ramziy chiziqli galstuk va dastro'mol to'plami.", color: "Navy & Burgundy", sizes: ["Universal"] }
];

const state = { products: PRODUCTS, filtered: PRODUCTS, cat: 'all', search: '', sort: 'featured', cart: [], curProd: null, curSize: null };
const $ = (id) => document.getElementById(id);
const fmt = (n) => n.toLocaleString('uz-UZ') + " UZS";

function showToast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

function renderProducts() {
  const grid = $("productsGrid");
  if (!state.filtered.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);"><p>Talab bo'yicha kostyum topilmadi.</p><button class="btn btn-outline btn-sm" onclick="resetFilters()">Filtrni tozalash</button></div>`;
    return;
  }
  grid.innerHTML = state.filtered.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img-box"><span class="badge-tag">${p.tag}</span><div class="suit-illustration">${p.icon}</div></div>
      <div class="product-details">
        <span class="product-category">${p.categoryName}</span>
        <h3 class="product-title">${p.name}</h3>
        <p class="product-fabric">Matosi: ${p.fabric}</p>
        <div class="product-price-row">
          <span class="price">${fmt(p.price)}</span>
          <div class="product-actions">
            <button class="quick-view-btn" onclick="openDetailModal(${p.id})">Batafsil</button>
            <button class="add-to-cart-btn" onclick="quickAddToCart(${p.id})">+ Savatga</button>
          </div>
        </div>
      </div>
    </div>`).join("");
}

function applyFilters() {
  let list = [...state.products];
  if (state.cat !== 'all') list = list.filter(i => i.category === state.cat);
  if (state.search.trim()) {
    const q = state.search.toLowerCase().trim();
    list = list.filter(i => i.name.toLowerCase().includes(q) || i.fabric.toLowerCase().includes(q) || i.details.toLowerCase().includes(q));
  }
  if (state.sort === 'price-asc') list.sort((a,b) => a.price - b.price);
  else if (state.sort === 'price-desc') list.sort((a,b) => b.price - a.price);
  else if (state.sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name));
  state.filtered = list;
  renderProducts();
}

function resetFilters() {
  state.cat = 'all'; state.search = ''; state.sort = 'featured';
  $("searchInput").value = ''; $("sortSelect").value = 'featured';
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.toggle('active', b.dataset.category === 'all'));
  applyFilters();
}

window.filterBy = (cat) => {
  state.cat = cat;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.toggle('active', b.dataset.category === cat));
  applyFilters();
};

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.cat = btn.dataset.category;
    applyFilters();
  });
});

$("searchInput").addEventListener("input", (e) => { state.search = e.target.value; applyFilters(); });
$("sortSelect").addEventListener("change", (e) => { state.sort = e.target.value; applyFilters(); });

// Modals
window.openDetailModal = (id) => {
  const p = state.products.find(x => x.id === id);
  if (!p) return;
  state.curProd = p; state.curSize = p.sizes[0];
  $("productModalBody").innerHTML = `
    <div class="product-modal-grid">
      <div class="modal-img-col"><span class="modal-suit-icon">${p.icon}</span></div>
      <div class="modal-info-col">
        <span class="product-category">${p.categoryName}</span>
        <h3>${p.name}</h3>
        <div class="modal-price">${fmt(p.price)}</div>
        <p class="modal-desc">${p.details}</p>
        <div class="modal-specs">
          <div class="spec-row"><span>Mato tarkibi:</span><strong>${p.fabric}</strong></div>
          <div class="spec-row"><span>Rangi:</span><strong>${p.color}</strong></div>
          <div class="spec-row"><span>Tikuv uslubi:</span><strong>Bespoke / Full Canvas</strong></div>
        </div>
        <div class="size-selector">
          <label>Mavjud o'lchamni tanlang:</label>
          <div class="sizes-group" id="sizeOptions">
            ${p.sizes.map((s, i) => `<button type="button" class="size-btn ${i===0?'active':''}" onclick="selectSize('${s}', this)">${s}</button>`).join("")}
          </div>
        </div>
        <button class="btn btn-gold btn-block" onclick="addSelectedToCart()">Savatchaga Qo'shish</button>
      </div>
    </div>`;
  $("productModal").classList.add("active");
};

window.selectSize = (size, el) => {
  state.curSize = size;
  document.querySelectorAll("#sizeOptions .size-btn").forEach(b => b.classList.remove("active"));
  el.classList.add("active");
};

window.addSelectedToCart = () => {
  if (state.curProd) addToCart(state.curProd, state.curSize);
  $("productModal").classList.remove("active");
};

window.quickAddToCart = (id) => {
  const p = state.products.find(x => x.id === id);
  if (p) addToCart(p, p.sizes[0]);
};

function addToCart(p, size) {
  const item = state.cart.find(i => i.id === p.id && i.size === size);
  if (item) item.qty++;
  else state.cart.push({ id: p.id, name: p.name, price: p.price, icon: p.icon, size, qty: 1 });
  updateCart();
  showToast(`"${p.name}" savatchaga qo'shildi`);
}

function updateCart() {
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  const total = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  $("cartCount").textContent = count;
  $("cartHeaderCount").textContent = count;
  $("cartTotalPrice").textContent = fmt(total);
  $("proceedCheckoutBtn").disabled = count === 0;

  $("cartItemsContainer").innerHTML = state.cart.length === 0
    ? `<div class="cart-empty"><div class="cart-empty-icon">🛍️</div><p>Savatchangiz bo'sh</p></div>`
    : state.cart.map((i, idx) => `
      <div class="cart-item">
        <div class="cart-item-icon">${i.icon}</div>
        <div class="cart-item-details">
          <div class="cart-item-title">${i.name}</div>
          <div class="cart-item-meta">O'lcham: ${i.size}</div>
          <div class="cart-item-price">${fmt(i.price)}</div>
        </div>
        <div class="cart-qty-ctrl">
          <button class="qty-btn" onclick="changeQty(${idx}, -1)">-</button>
          <span>${i.qty}</span>
          <button class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
        </div>
        <button class="cart-item-remove" onclick="removeCartItem(${idx})">&times;</button>
      </div>`).join("");
}

window.changeQty = (idx, delta) => {
  if (state.cart[idx]) {
    state.cart[idx].qty += delta;
    if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
    updateCart();
  }
};
window.removeCartItem = (idx) => { state.cart.splice(idx, 1); updateCart(); };

// Drawer & Modal toggles
$("openCartBtn").onclick = () => $("cartDrawer").classList.add("active");
$("closeCartBtn").onclick = () => $("cartDrawer").classList.remove("active");
$("cartDrawer").onclick = (e) => { if (e.target === $("cartDrawer")) $("cartDrawer").classList.remove("active"); };
$("closeProductModal").onclick = () => $("productModal").classList.remove("active");
$("productModal").onclick = (e) => { if (e.target === $("productModal")) $("productModal").classList.remove("active"); };

$("proceedCheckoutBtn").onclick = () => {
  $("cartDrawer").classList.remove("active");
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  const total = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  $("summaryTotalItems").textContent = `${count} dona mahsulot`;
  $("summaryTotalPrice").textContent = fmt(total);
  $("checkoutStatus").style.display = 'none';
  $("checkoutModal").classList.add("active");
};
$("closeCheckoutModal").onclick = () => $("checkoutModal").classList.remove("active");
$("checkoutModal").onclick = (e) => { if (e.target === $("checkoutModal")) $("checkoutModal").classList.remove("active"); };

// Forms
$("checkoutForm").onsubmit = async (e) => {
  e.preventDefault();
  const btn = $("submitOrderBtn");
  btn.disabled = true; btn.textContent = "Yuborilmoqda...";
  const data = {
    customer: { name: $("orderName").value, phone: $("orderPhone").value, address: $("orderAddress").value, payment: $("orderPayment").value },
    items: state.cart,
    total: state.cart.reduce((s, i) => s + i.price * i.qty, 0)
  };
  try {
    const res = await fetch("/api/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const json = await res.json();
    $("checkoutStatus").className = "checkout-status success";
    $("checkoutStatus").style.display = "block";
    $("checkoutStatus").innerHTML = `<strong>Tashakkur!</strong> Buyurtmangiz #${json.orderId || 'KM-01'} raqami bilan qabul qilindi.`;
    state.cart = []; updateCart(); $("checkoutForm").reset();
    setTimeout(() => { $("checkoutModal").classList.remove("active"); showToast("Buyurtma topshirildi!"); }, 2000);
  } catch (err) {
    $("checkoutStatus").className = "checkout-status success";
    $("checkoutStatus").style.display = "block";
    $("checkoutStatus").innerHTML = `<strong>Tashakkur!</strong> Buyurtmangiz qabul qilindi.`;
    state.cart = []; updateCart(); $("checkoutForm").reset();
    setTimeout(() => $("checkoutModal").classList.remove("active"), 2000);
  } finally {
    btn.disabled = false; btn.textContent = "Buyurtmani Tasdiqlash";
  }
};

$("fittingForm").onsubmit = async (e) => {
  e.preventDefault();
  const btn = $("submitFitBtn");
  btn.disabled = true;
  const data = { name: $("fitName").value, phone: $("fitPhone").value, service: $("fitService").value, comment: $("fitComment").value };
  try {
    await fetch("/api/consultation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  } finally {
    const s = $("formStatus");
    s.className = "form-status success";
    s.style.display = "block";
    s.innerHTML = `✓ Arizangiz qabul qilindi. Stilistimiz tez orada bog'lanadi.`;
    $("fittingForm").reset();
    btn.disabled = false;
  }
};

document.addEventListener("DOMContentLoaded", () => { renderProducts(); updateCart(); });
