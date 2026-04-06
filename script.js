/* ============================================================
   script.js — FLEXDROP Products, Cart & Checkout
============================================================ */

/* ── CONFIG ── */
const CONFIG = {
  WA_API_URL: 'https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json',
  WA_AUTH: 'Basic ' + btoa('YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN'),
  WA_FROM_NUMBER: 'whatsapp:+14155238886',
  SHOPKEEPER_NUMBER: 'whatsapp:+919876543210',
  DELIVERY_NUMBER: 'whatsapp:+919876543211',
  DEMO_MODE: true,
};

/* ─────────────────────────────────────────────────────────
   PRODUCTS DATA
───────────────────────────────────────────────────────── */
const products = [

  // DAL
  { id: 1, name: "Masoor Dal", cat: "Grains & Dal", image: "masoor_dal_new.jpeg", height: 80, weight: "1 kg", price: 90, original: 110, badge: "Popular" },
  { id: 2, name: "Rahar Dal", cat: "Grains & Dal", image: "arhar_dal.jpeg", weight: "1 kg", price: 130, original: 155, badge: null },
  { id: 3, name: "Chana Dal", cat: "Grains & Dal", image: "chana_dal_new.jpeg", weight: "1 kg", price: 100, original: 120, badge: null },
  { id: 4, name: "Moong Dal", cat: "Grains & Dal", image: "moong_dal.jpeg", weight: "1 kg", price: 130, original: 150, badge: null },
  { id: 5, name: "Urad Dal", cat: "Grains & Dal", image: "urad_dal.jpeg", weight: "1 kg", price: 130, original: 150, badge: null },
  { id: 6, name: "Chana", cat: "Grains & Dal", image: "chana_new.jpeg", weight: "1 kg", price: 90, original: 110, badge: null },
  { id: 7, name: "Matar", cat: "Grains & Dal", image: "MatarSabut.webp", weight: "1 kg", price: 70, original: 85, badge: "Offer" },

  // RICE
  { id: 8, name: "Platium Rice", cat: "Grains & Dal", image: "plattinum_new.jpeg", weight: "1 kg", price: 40, original: 50, badge: null },
  { id: 9, name: "Silver Rice", cat: "Grains & Dal", image: "platinum rice.jpg", weight: "1 kg", price: 36, original: 45, badge: null },
  { id: 10, name: "Pragati Rice", cat: "Grains & Dal", image: "pragati rice.png", weight: "1 kg", price: 60, original: 75, badge: "Popular" },
  { id: 11, name: "Baba Katarni Rice", cat: "Grains & Dal", image: "iaba-steam-katarni-special-rice.webp", weight: "1 kg", price: 55, original: 70, badge: null },

  // PICKLES
  { id: 12, name: "Mix Pickle", cat: "Pickles", emoji: "🥒", weight: "50 g", price: 10, original: 15, badge: "Offer" },
  { id: 13, name: "Mix Pickle", cat: "Pickles", emoji: "🥒", weight: "200 g", price: 70, original: 90, badge: null },
  { id: 14, name: "Mix Pickle", cat: "Pickles", emoji: "🥒", weight: "500 g", price: 130, original: 160, badge: null },

  // OIL
  { id: 15, name: "Hathi Mustard Oil", cat: "Oil & Ghee", image: "hathi mustardoil 1L.webp", weight: "500 ml", price: 90, original: 110, badge: null },
  { id: 16, name: "Hathi Mustard Oil", cat: "Oil & Ghee", image: "hathi mustardoil 1L.webp", weight: "1 L", price: 175, original: 210, badge: "Popular" },
  { id: 17, name: "Mustard Oil", cat: "Oil & Ghee", image: "hathi mustardoil 1L.webp", weight: "Bottle", price: 25, original: 30, badge: null },
  { id: 18, name: "Mustard Oil", cat: "Oil & Ghee", image: "hathi mustardoil 1L.webp", weight: "Bottle", price: 50, original: 60, badge: null },

  { id: 19, name: "Doctor Choice Refined Oil", cat: "Oil & Ghee", image: "1-litre-doctors-choice-soybean-refined-oil.jpeg", weight: "500 ml", price: 70, original: 85, badge: null },
  { id: 20, name: "Doctor Choice Refined Oil", cat: "Oil & Ghee", image: "1-litre-doctors-choice-soybean-refined-oil.jpeg", weight: "1 L", price: 140, original: 170, badge: null },

  { id: 21, name: "Fortune Oil", cat: "Oil & Ghee", image: "images/Fortune.jpg", weight: "500 ml", price: 85, original: 105, badge: null },
  { id: 22, name: "Fortune Oil", cat: "Oil & Ghee", image: "images/Fortune.jpg", weight: "1 L", price: 170, original: 200, badge: null },

  // HEALTH DRINK
  { id: 25, name: "Horlicks", cat: "Beverages", image: "horlicks 5rs.jpg", weight: "Packet", price: 5, original: 10, badge: "Offer" },
  { id: 26, name: "Horlicks", cat: "Beverages", image: "horlicks 10rs.webp", weight: "Packet", price: 10, original: 15, badge: null },
  { id: 27, name: "Horlicks", cat: "Beverages", image: "horlicks 10rs.webp", weight: "200 g", price: 105, original: 130, badge: null },
  { id: 28, name: "Horlicks", cat: "Beverages", image: "horlicks 10rs.webp", weight: "500 g", price: 235, original: 280, badge: "Popular" },
  { id: 29, name: "Horlicks", cat: "Beverages", image: "horlicks 10rs.webp", weight: "1 kg", price: 425, original: 480, badge: null },

  // TOOTHPASTE
  { id: 30, name: "Sensodyne", cat: "Personal Care", image: "sensodyne 95rs.jpg", weight: "", price: 95, original: 120, badge: null },
  { id: 33, name: "Colgate", cat: "Personal Care", image: "colgate 20rs.webp", weight: "", price: 20, original: 25, badge: null },
  { id: 34, name: "Colgate 100g", cat: "Personal Care", image: "colgate 70rs.jpg", weight: "100 g", price: 70, original: 85, badge: null },

  // DETERGENT
  { id: 40, name: "Surf Excel", cat: "Cleaning", image: "surf excel 1kg.webp", weight: "500 g", price: 70, original: 90, badge: null },
  { id: 41, name: "Surf Excel", cat: "Cleaning", image: "surf excel 1kg.webp", weight: "1 kg", price: 138, original: 165, badge: null },

  // SOAP
  { id: 44, name: "Lifebuoy Soap", cat: "Personal Care", image: "lifeboy soap.avif", weight: "5 pcs", price: 120, original: 150, badge: null },
  { id: 45, name: "Dettol Soap", cat: "Personal Care", image: "dettol 78rs.webp", weight: "4 pcs", price: 80, original: 100, badge: null },

  // HAIR OIL
  { id: 51, name: "Bajaj Almond Oil", cat: "Personal Care", image: "bajaj almond oil.jpg", weight: "49 ml", price: 40, original: 50, badge: null },
  { id: 52, name: "Bajaj Almond Oil", cat: "Personal Care", image: "bajaj almond oil.jpg", weight: "110 ml", price: 85, original: 105, badge: null },

  // DAIRY
  { id: 56, name: "Amul Butter", cat: "Dairy", image: "amul butter 10rs.jpg", weight: "", price: 10, original: 15, badge: "Offer" },
  { id: 60, name: "Amul Paneer", cat: "Dairy", image: "amul paneer 100g 95rs.webp", weight: "200 g", price: 95, original: 120, badge: "Fresh" }

];

/* ─────────────────────────────────────────────────────────
   STATIONERY PRODUCTS (30)
───────────────────────────────────────────────────────── */
const stationeryProducts = [
  { id: 201, name: "Classmate Notebook", cat: "Stationery", emoji: "📓", weight: "160 pages", price: 45,  original: 55,  badge: "Popular" },
  { id: 202, name: "Classmate Notebook", cat: "Stationery", emoji: "📓", weight: "240 pages", price: 65,  original: 80 },
  { id: 203, name: "Single Line Register", cat: "Stationery", emoji: "📒", weight: "100 pages", price: 35, original: 45 },
  { id: 204, name: "Graph Notebook",    cat: "Stationery",  emoji: "📐", weight: "80 pages",  price: 30,  original: 40 },
  { id: 205, name: "Reynolds Ballpen",  cat: "Stationery",  emoji: "🖊️", weight: "Pack of 5", price: 25,  original: 35,  badge: "Offer" },
  { id: 206, name: "Cello Pen",         cat: "Stationery",  emoji: "🖊️", weight: "Pack of 10", price: 45, original: 60 },
  { id: 207, name: "Pilot Pen",         cat: "Stationery",  emoji: "🖊️", weight: "Blue",      price: 15,  original: 20 },
  { id: 208, name: "Pencil (HB)",       cat: "Stationery",  emoji: "✏️", weight: "Pack of 10", price: 30, original: 40 },
  { id: 209, name: "Colour Pencils",    cat: "Stationery",  emoji: "🖍️", weight: "12 shades", price: 55,  original: 70,  badge: "Popular" },
  { id: 210, name: "Colour Pencils",    cat: "Stationery",  emoji: "🖍️", weight: "24 shades", price: 95,  original: 120 },
  { id: 211, name: "Eraser",            cat: "Stationery",  emoji: "📝", weight: "Pack of 3", price: 15,  original: 20 },
  { id: 212, name: "Sharpener",         cat: "Stationery",  emoji: "✂️", weight: "2-in-1",    price: 10,  original: 15 },
  { id: 213, name: "Stapler",           cat: "Stationery",  emoji: "📎", weight: "Small",     price: 60,  original: 80 },
  { id: 214, name: "Stapler Pins",      cat: "Stationery",  emoji: "📎", weight: "Box 1000",  price: 20,  original: 30 },
  { id: 215, name: "Fevicol",           cat: "Stationery",  emoji: "🧴", weight: "50 ml",     price: 20,  original: 28 },
  { id: 216, name: "Fevistick Glue",    cat: "Stationery",  emoji: "🧴", weight: "8 g",       price: 15,  original: 22,  badge: "Offer" },
  { id: 217, name: "Scissors",          cat: "Stationery",  emoji: "✂️", weight: "Medium",    price: 40,  original: 55 },
  { id: 218, name: "Scale / Ruler",     cat: "Stationery",  emoji: "📏", weight: "30 cm",     price: 12,  original: 18 },
  { id: 219, name: "Geometry Box",      cat: "Stationery",  emoji: "📐", weight: "Complete",  price: 85,  original: 110, badge: "Popular" },
  { id: 220, name: "Highlighter Set",   cat: "Stationery",  emoji: "🖊️", weight: "5 colours", price: 50,  original: 70 },
  { id: 221, name: "Whitener",          cat: "Stationery",  emoji: "📝", weight: "7 ml",      price: 15,  original: 22 },
  { id: 222, name: "Marker Pen",        cat: "Stationery",  emoji: "🖊️", weight: "Set of 4",  price: 35,  original: 50 },
  { id: 223, name: "Drawing Sheet",     cat: "Stationery",  emoji: "🖼️", weight: "A3 – 10 pcs", price: 30, original: 40 },
  { id: 224, name: "Sketch Pens",       cat: "Stationery",  emoji: "🎨", weight: "12 colours", price: 40, original: 55 },
  { id: 225, name: "Watercolour Box",   cat: "Stationery",  emoji: "🎨", weight: "14 shades", price: 65,  original: 85 },
  { id: 226, name: "Correction Tape",   cat: "Stationery",  emoji: "📝", weight: "5 mm × 6m", price: 25,  original: 35 },
  { id: 227, name: "File Folder",       cat: "Stationery",  emoji: "📁", weight: "A4 size",   price: 20,  original: 28 },
  { id: 228, name: "Index Cards",       cat: "Stationery",  emoji: "📇", weight: "Pack of 50", price: 25, original: 35 },
  { id: 229, name: "Sticky Notes",      cat: "Stationery",  emoji: "🗒️", weight: "100 sheets", price: 30, original: 42,  badge: "Offer" },
  { id: 230, name: "A4 Paper",          cat: "Stationery",  emoji: "📄", weight: "500 sheets", price: 160, original: 200, badge: "Popular" },
];

/* ─────────────────────────────────────────────────────────
   MEDICINE & FIRST AID PRODUCTS (30)
   ⚠️  These are OTC / first-aid items only.
       Prescription drugs are NOT sold.
───────────────────────────────────────────────────────── */
const medicineProducts = [
  { id: 301, name: "Dettol Antiseptic", cat: "Medicine",  emoji: "🏥", weight: "60 ml",   price: 55,  original: 70,  badge: "Essential" },
  { id: 302, name: "Dettol Antiseptic", cat: "Medicine",  emoji: "🏥", weight: "100 ml",  price: 90,  original: 115 },
  { id: 303, name: "Savlon Antiseptic", cat: "Medicine",  emoji: "🏥", weight: "100 ml",  price: 80,  original: 100 },
  { id: 304, name: "Band-Aid Strips",   cat: "Medicine",  emoji: "🩹", weight: "Pack 10", price: 25,  original: 35,  badge: "Popular" },
  { id: 305, name: "Band-Aid Strips",   cat: "Medicine",  emoji: "🩹", weight: "Pack 30", price: 60,  original: 80 },
  { id: 306, name: "Cotton Roll",       cat: "Medicine",  emoji: "🩺", weight: "50 g",    price: 30,  original: 40 },
  { id: 307, name: "Cotton Roll",       cat: "Medicine",  emoji: "🩺", weight: "100 g",   price: 55,  original: 70 },
  { id: 308, name: "Crepe Bandage",     cat: "Medicine",  emoji: "🩹", weight: "4\" × 4m", price: 35, original: 50 },
  { id: 309, name: "Surgical Tape",     cat: "Medicine",  emoji: "🩹", weight: "1.25 cm × 9m", price: 30, original: 42 },
  { id: 310, name: "Thermometer",       cat: "Medicine",  emoji: "🌡️", weight: "Digital", price: 180, original: 250, badge: "Essential" },
  { id: 311, name: "Paracetamol 500mg", cat: "Medicine",  emoji: "💊", weight: "Strip 10", price: 15, original: 20,  badge: "OTC" },
  { id: 312, name: "Crocin 650mg",      cat: "Medicine",  emoji: "💊", weight: "Strip 10", price: 30, original: 38,  badge: "OTC" },
  { id: 313, name: "ORS Sachet",        cat: "Medicine",  emoji: "🧃", weight: "Electral 5 pcs", price: 25, original: 35, badge: "Essential" },
  { id: 314, name: "Gelusil Tablet",    cat: "Medicine",  emoji: "💊", weight: "Strip 15", price: 25, original: 35,  badge: "OTC" },
  { id: 315, name: "Digene Gel",        cat: "Medicine",  emoji: "🧴", weight: "200 ml",  price: 95,  original: 120 },
  { id: 316, name: "Vicks VapoRub",     cat: "Medicine",  emoji: "🧴", weight: "25 g",    price: 55,  original: 70,  badge: "Popular" },
  { id: 317, name: "Vicks VapoRub",     cat: "Medicine",  emoji: "🧴", weight: "50 g",    price: 100, original: 130 },
  { id: 318, name: "Iodex",             cat: "Medicine",  emoji: "🧴", weight: "30 g",    price: 60,  original: 80 },
  { id: 319, name: "Moov Cream",        cat: "Medicine",  emoji: "🧴", weight: "50 g",    price: 85,  original: 110 },
  { id: 320, name: "Burnol",            cat: "Medicine",  emoji: "🧴", weight: "20 g",    price: 35,  original: 48,  badge: "Essential" },
  { id: 321, name: "Betadine Ointment", cat: "Medicine",  emoji: "🧴", weight: "15 g",    price: 40,  original: 55 },
  { id: 322, name: "Eye Drops (Tears)", cat: "Medicine",  emoji: "👁️", weight: "10 ml",   price: 60,  original: 80,  badge: "OTC" },
  { id: 323, name: "Nasal Drops",       cat: "Medicine",  emoji: "👃", weight: "10 ml",   price: 35,  original: 50 },
  { id: 324, name: "Hand Sanitizer",    cat: "Medicine",  emoji: "🤲", weight: "100 ml",  price: 40,  original: 55,  badge: "Popular" },
  { id: 325, name: "Hand Sanitizer",    cat: "Medicine",  emoji: "🤲", weight: "500 ml",  price: 150, original: 200 },
  { id: 326, name: "Glucometer Strip",  cat: "Medicine",  emoji: "🩸", weight: "25 strips", price: 180, original: 240, badge: "OTC" },
  { id: 327, name: "N95 Mask",          cat: "Medicine",  emoji: "😷", weight: "Pack 5",  price: 120, original: 160 },
  { id: 328, name: "Surgical Mask",     cat: "Medicine",  emoji: "😷", weight: "Pack 10", price: 60,  original: 85 },
  { id: 329, name: "Disposable Gloves", cat: "Medicine",  emoji: "🧤", weight: "Pack 10", price: 45,  original: 65 },
  { id: 330, name: "First Aid Kit",     cat: "Medicine",  emoji: "🧰", weight: "Basic Set", price: 350, original: 480, badge: "Essential" },
];

/* Combine all for search */
const allProducts = [...products, ...stationeryProducts, ...medicineProducts];

/* ─────────────────────────────────────────────────────────
   CART & UI
───────────────────────────────────────────────────────── */
let cart = {};
let activeCat  = 'All';
let activeSection = 'grocery'; /* 'grocery' | 'stationery' | 'medicine' */
let searchQuery = '';

function getCardClass(cat) {
  if (cat === 'Stationery') return 'stationery-card';
  if (cat === 'Medicine')   return 'medicine-card';
  return '';
}

function renderProductCard(p) {
  const qty = cart[p.id] ? cart[p.id].qty : 0;
  const discount  = p.original ? `<span class="original">₹${p.original}</span>` : '';
  const badgeCls  = p.badge === 'Offer' ? 'offer' : p.cat === 'Stationery' ? 'stationery' : p.cat === 'Medicine' ? 'medicine' : '';
  const badge     = p.badge ? `<div class="product-badge ${badgeCls}">${p.badge}</div>` : '';
  const cardClass = getCardClass(p.cat);
  const btn = qty === 0
    ? `<button class="add-btn" onclick="addToCart(${p.id})">+ Add</button>`
    : `<div class="qty-control">
        <button class="qty-btn" onclick="removeFromCart(${p.id})">−</button>
        <span class="qty-num">${qty}</span>
        <button class="qty-btn" onclick="addToCart(${p.id})">+</button>
       </div>`;
  const visual = p.image
    ? `<div class="product-img"><img src="${p.image}" alt="${p.name}"></div>`
    : `<span class="product-emoji">${p.emoji || '🛍️'}</span>`;
  return `
    <div class="product-card ${cardClass}">
      ${badge}
      ${visual}
      <div class="product-name">${p.name}</div>
      <div class="product-weight">${p.weight}</div>
      <div class="product-price">₹${p.price}${discount}</div>
      ${btn}
    </div>`;
}

function renderGrocery() {
  const grid = document.getElementById('productsGrid');
  const filtered = products.filter(p => {
    const catMatch   = activeCat === 'All' || p.cat === activeCat;
    const searchMatch = !searchQuery || p.name.toLowerCase().includes(searchQuery) || p.cat.toLowerCase().includes(searchQuery);
    return catMatch && searchMatch;
  });
  grid.innerHTML = filtered.length
    ? filtered.map(renderProductCard).join('')
    : '<p style="padding:20px;color:#6D5C3E;">No products found.</p>';
}

function renderStationery() {
  const grid = document.getElementById('stationeryGrid');
  const filtered = stationeryProducts.filter(p =>
    !searchQuery || p.name.toLowerCase().includes(searchQuery)
  );
  grid.innerHTML = filtered.map(renderProductCard).join('');
}

function renderMedicine() {
  const grid = document.getElementById('medicineGrid');
  const filtered = medicineProducts.filter(p =>
    !searchQuery || p.name.toLowerCase().includes(searchQuery)
  );
  grid.innerHTML = filtered.map(renderProductCard).join('');
}

function renderProducts() {
  renderGrocery();
  renderStationery();
  renderMedicine();
}

function filterCat(cat, btn) {
  activeCat = cat;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('productsHeading').textContent =
    cat === 'All' ? '🔥 All Products' : '🏪 ' + cat;
  renderGrocery();
}

function filterProducts() {
  searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();
  renderProducts();
}

function addToCart(id) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  if (!cart[id]) cart[id] = { ...p, qty: 0 };
  cart[id].qty++;
  updateCartUI();
  renderProducts();
}

function removeFromCart(id) {
  if (!cart[id]) return;
  cart[id].qty--;
  if (cart[id].qty === 0) delete cart[id];
  updateCartUI();
  renderProducts();
}

function updateCartUI() {
  const items = Object.values(cart);
  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = totalItems;

  const cartItemsEl = document.getElementById('cartItems');
  const cartFooter  = document.getElementById('cartFooter');

  if (items.length === 0) {
    cartItemsEl.innerHTML = '<div class="empty-cart"><span>🛒</span>Your cart is empty.<br>Start adding items!</div>';
    cartFooter.style.display = 'none';
    return;
  }

  cartFooter.style.display = 'block';
  cartItemsEl.innerHTML = items.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.image ? `<img src="${item.image}" style="width:40px;height:40px;object-fit:contain;border-radius:8px;">` : (item.emoji || '🛍️')}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-sub">${item.weight}</div>
      </div>
      <div class="cart-item-right">
        <div class="cart-item-price">₹${item.price * item.qty}</div>
        <div class="cart-item-qty">
          <button class="cqbtn" onclick="removeFromCart(${item.id})">−</button>
          <span class="cqbtn-num">${item.qty}</span>
          <button class="cqbtn" onclick="addToCart(${item.id})">+</button>
        </div>
      </div>
    </div>`).join('');

  const subtotal    = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery    = subtotal >= 499 ? 0 : 40;
  const discountAmt = items.reduce((s, i) => i.original ? s + (i.original - i.price) * i.qty : s, 0);

  document.getElementById('subtotal').textContent = '₹' + subtotal;
  document.getElementById('delivery').textContent  = delivery === 0 ? 'FREE' : '₹' + delivery;
  document.getElementById('discount').textContent  = discountAmt > 0 ? '-₹' + discountAmt : '-₹0';
  document.getElementById('total').textContent     = '₹' + (subtotal + delivery);
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeCart(); closeCustomPanel(); closePolicy(); }
});

/* Init */
renderProducts();

/* ─────────────────────────────────────────────────────────
   CHECKOUT FLOW
───────────────────────────────────────────────────────── */
let currentPanel = 'panelCart';
let otpSecret    = '';
let otpTimer     = null;
let verifiedPhone = '';
let selectedPay  = 'upi';
let addrData     = {};

function goPanel(targetId) {
  const allPanels = ['panelCart','panelAddress','panelOtp','panelPay','panelSuccess'];
  const fromIdx   = allPanels.indexOf(currentPanel);
  const toIdx     = allPanels.indexOf(targetId);
  if (fromIdx === toIdx || fromIdx < 0 || toIdx < 0) return;

  const currentEl = document.getElementById(currentPanel);
  const targetEl  = document.getElementById(targetId);
  if (!currentEl || !targetEl) return;

  const goingFwd = toIdx > fromIdx;

  targetEl.style.transition  = 'none';
  targetEl.style.transform   = goingFwd ? 'translateX(100%)' : 'translateX(-40%)';
  targetEl.classList.remove('hidden','slide-out-left');
  targetEl.style.visibility  = 'visible';
  targetEl.style.pointerEvents = 'none';
  targetEl.getBoundingClientRect();

  const ease = 'transform 0.32s cubic-bezier(0.4,0,0.2,1)';
  currentEl.style.transition = ease;
  targetEl.style.transition  = ease;
  currentEl.style.transform  = goingFwd ? 'translateX(-40%)' : 'translateX(100%)';
  targetEl.style.transform   = 'translateX(0)';

  setTimeout(() => {
    currentEl.classList.add('hidden');
    currentEl.style.transform = currentEl.style.transition = currentEl.style.visibility = '';
    currentEl.style.pointerEvents = '';
    targetEl.style.transform = targetEl.style.transition = targetEl.style.visibility = '';
    targetEl.style.pointerEvents = 'auto';
  }, 340);

  currentPanel = targetId;
}

function selAddrType(el) {
  document.querySelectorAll('.atype').forEach(a => a.classList.remove('sel'));
  el.classList.add('sel');
}

function showAddrErr(msg) {
  const el = document.getElementById('addrErr');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 4000);
}

function submitAddress() {
  const name  = document.getElementById('fName').value.trim();
  const phone = document.getElementById('fPhone').value.trim();
  const cc    = document.getElementById('fCC').value;
  const line1 = document.getElementById('fLine1').value.trim();
  const city  = document.getElementById('fCity').value.trim();
  const pin   = document.getElementById('fPin').value.trim();

  if (!name)            return showAddrErr('Please enter your full name.');
  if (phone.length < 10) return showAddrErr('Please enter a valid 10-digit mobile number.');
  if (!line1)           return showAddrErr('Please enter your house / flat details.');
  if (!city)            return showAddrErr('Please enter your city.');
  if (pin.length < 6)   return showAddrErr('Please enter a valid 6-digit PIN code.');

  addrData = {
    name, phone: cc + phone,
    addrType: (document.querySelector('.atype.sel') || {}).textContent || 'Home',
    line1, line2: document.getElementById('fLine2').value.trim(),
    city, pin,
    state:    document.getElementById('fState').value,
    landmark: document.getElementById('fLandmark').value.trim(),
  };
  verifiedPhone = cc + ' ' + phone;
  sendOtp();
}

function generateOtp() { return String(Math.floor(100000 + Math.random() * 900000)); }

function sendOtp() {
  otpSecret = generateOtp();
  document.getElementById('otpSentTo').textContent = verifiedPhone;
  document.getElementById('demoOtpShow').textContent = CONFIG.DEMO_MODE ? otpSecret : '••••••';
  clearOtpBoxes();
  document.getElementById('otpErr').classList.remove('show');
  document.getElementById('verifiedPill').style.display = 'none';
  startOtpTimer();
  goPanel('panelOtp');
  if (CONFIG.DEMO_MODE) console.log('[DEMO] OTP:', otpSecret);
}

function startOtpTimer() {
  clearInterval(otpTimer);
  let secs = 30;
  document.getElementById('timerSec').textContent = secs;
  document.getElementById('timerTxt').style.display = 'inline';
  document.getElementById('resendBtn').classList.remove('show');
  otpTimer = setInterval(() => {
    secs--;
    document.getElementById('timerSec').textContent = secs;
    if (secs <= 0) {
      clearInterval(otpTimer);
      document.getElementById('timerTxt').style.display = 'none';
      document.getElementById('resendBtn').classList.add('show');
    }
  }, 1000);
}

function resendOtp() {
  otpSecret = generateOtp();
  document.getElementById('demoOtpShow').textContent = CONFIG.DEMO_MODE ? otpSecret : '••••••';
  clearOtpBoxes();
  document.getElementById('otpErr').classList.remove('show');
  startOtpTimer();
}

function clearOtpBoxes() {
  for (let i = 0; i < 6; i++) {
    const box = document.getElementById('ob' + i);
    if (box) { box.value = ''; box.classList.remove('filled'); }
  }
  setTimeout(() => {
    if (currentPanel === 'panelOtp') { const ob0 = document.getElementById('ob0'); if (ob0) ob0.focus(); }
  }, 350);
}

function otpNext(idx, el) {
  const val = el.value.replace(/\D/g,'');
  el.value = val ? val[val.length - 1] : '';
  el.classList.toggle('filled', el.value !== '');
  if (el.value && idx < 5) document.getElementById('ob' + (idx+1)).focus();
  if (getEnteredOtp().length === 6) setTimeout(verifyOtp, 200);
}

function otpBack(idx, e) {
  if (e.key === 'Backspace' && !document.getElementById('ob'+idx).value && idx > 0)
    document.getElementById('ob'+(idx-1)).focus();
}

function getEnteredOtp() {
  let code = '';
  for (let i = 0; i < 6; i++) code += (document.getElementById('ob'+i).value || '');
  return code;
}

function showOtpErr(msg) {
  const el = document.getElementById('otpErr');
  el.textContent = msg; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3500);
}

function verifyOtp() {
  const entered = getEnteredOtp();
  if (entered.length < 6) return showOtpErr('Please enter all 6 digits.');
  if (entered !== otpSecret) { showOtpErr('❌ Incorrect OTP. Please try again.'); clearOtpBoxes(); return; }
  clearInterval(otpTimer);
  document.getElementById('verifiedPill').style.display = 'block';
  document.getElementById('otpErr').classList.remove('show');
  setTimeout(() => { populatePaymentPanel(); goPanel('panelPay'); }, 700);
}

function populatePaymentPanel() {
  const items = Object.values(cart);
  const subtotal    = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery    = subtotal >= 499 ? 0 : 40;
  const discountAmt = items.reduce((s, i) => i.original ? s + (i.original - i.price) * i.qty : s, 0);
  const total       = subtotal + delivery;

  document.getElementById('payMiniSummary').innerHTML = items.map(i => `
    <div class="mini-item">
      <div class="mini-emoji">${i.emoji || '🛍️'}</div>
      <div class="mini-info">
        <div class="mini-name">${i.name}</div>
        <div class="mini-qty">${i.weight} × ${i.qty}</div>
      </div>
      <div class="mini-price">₹${i.price * i.qty}</div>
    </div>`).join('');

  document.getElementById('pSub').textContent     = '₹' + subtotal;
  document.getElementById('pDel').textContent     = delivery === 0 ? 'FREE' : '₹' + delivery;
  document.getElementById('pDisc').textContent    = discountAmt > 0 ? '-₹' + discountAmt : '-₹0';
  document.getElementById('pTot').textContent     = '₹' + total;
  document.getElementById('payBtnTxt').textContent = '🔒 Pay ₹' + total;

  const a = addrData;
  document.getElementById('addrRecap').innerHTML =
    `<strong>${a.name}</strong><br>${a.line1}${a.line2 ? ', '+a.line2 : ''}<br>${a.city} – ${a.pin}, ${a.state}${a.landmark ? '<br>Near: '+a.landmark : ''}<br>📱 ${a.phone}`;

  document.getElementById('successCity').textContent = a.city;
  selPay('upi');
}

function selPay(method) {
  selectedPay = method;
  ['upi','card','nb','cod'].forEach(m => document.getElementById('po_'+m).classList.toggle('sel', m===method));
  document.getElementById('upiField').style.display = method === 'upi' ? 'block' : 'none';
}

function showPayErr(msg) {
  const el = document.getElementById('payErr');
  el.textContent = msg; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3500);
}

function confirmOrder() {
  if (selectedPay === 'upi') {
    const upi = document.getElementById('upiId').value.trim();
    if (!upi || !upi.includes('@')) return showPayErr('Please enter a valid UPI ID (e.g. name@upi)');
  }
  const btn = document.getElementById('payBtn');
  btn.classList.add('btn-spinning'); btn.disabled = true;
  setTimeout(() => { btn.classList.remove('btn-spinning'); btn.disabled = false; placeOrderFinal(); }, 1800);
}

function placeOrderFinal() {
  const orderId = 'FD-' + Date.now().toString().slice(-6);
  document.getElementById('successOrderId').textContent = '#' + orderId;

  const items     = Object.values(cart);
  const subtotal  = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery  = subtotal >= 499 ? 0 : 40;
  const total     = subtotal + delivery;
  const a         = addrData;
  const payLabel  = { upi:'UPI', card:'Card', nb:'Net Banking', cod:'Cash on Delivery' }[selectedPay];
  const itemList  = items.map(i => `  • ${i.emoji||''} ${i.name} (${i.weight}) × ${i.qty} = ₹${i.price*i.qty}`).join('\n');

  const msg =
`🛒 *NEW ORDER — #${orderId}*

👤 *Customer:* ${a.name}
📱 *Phone:* ${a.phone}
📍 *Address:* ${a.line1}${a.line2?', '+a.line2:''}, ${a.city} – ${a.pin}, ${a.state}${a.landmark?'\n   Landmark: '+a.landmark:''}

🧾 *Items Ordered:*
${itemList}

💰 *Subtotal:* ₹${subtotal}
🚚 *Delivery:* ${delivery===0?'FREE':'₹'+delivery}
💳 *Payment:* ${payLabel}
✅ *Total:* ₹${total}

⏱️ Please pack and dispatch within 30 mins.`;

  if (CONFIG.DEMO_MODE) { console.log('─── ORDER ───\n' + msg); }
  else                  { sendWhatsAppMessage(CONFIG.SHOPKEEPER_NUMBER, msg); }

  cart = {};
  updateCartUI();
  renderProducts();
  goPanel('panelSuccess');
}

async function sendWhatsAppMessage(to, body) {
  try {
    const params = new URLSearchParams();
    params.append('From', CONFIG.WA_FROM_NUMBER);
    params.append('To', to);
    params.append('Body', body);
    const res  = await fetch(CONFIG.WA_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': CONFIG.WA_AUTH },
      body: params.toString(),
    });
    const data = await res.json();
    console.log('[WA] Sent →', data.sid || data);
  } catch(err) { console.error('[WA] Error:', err); }
}

function resetCheckout() {
  clearInterval(otpTimer);
  ['panelCart','panelAddress','panelOtp','panelPay','panelSuccess'].forEach(id => {
    const p = document.getElementById(id);
    if (!p) return;
    p.style.transition = p.style.transform = p.style.visibility = p.style.pointerEvents = '';
    p.classList.add('hidden');
    p.classList.remove('slide-out-left');
  });
  document.getElementById('panelCart').classList.remove('hidden');
  currentPanel = 'panelCart';
  addrData = {}; otpSecret = ''; selectedPay = 'upi';
  ['fName','fPhone','fLine1','fLine2','fCity','fPin','fLandmark','upiId'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  for (let i = 0; i < 6; i++) {
    const box = document.getElementById('ob'+i);
    if (box) { box.value = ''; box.classList.remove('filled'); }
  }
  document.getElementById('verifiedPill').style.display = 'none';
  closeCart();
}

/* ─────────────────────────────────────────────────────────
   CUSTOM ORDER PANEL
───────────────────────────────────────────────────────── */
function toggleCustomPanel() {
  const drawer  = document.getElementById('customDrawer');
  const overlay = document.getElementById('customOverlay');
  const isOpen  = drawer.classList.contains('open');
  if (isOpen) {
    drawer.classList.remove('open'); overlay.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    drawer.classList.add('open'); overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCustomPanel() {
  document.getElementById('customDrawer').classList.remove('open');
  document.getElementById('customOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function previewImage(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = document.getElementById('imgPreview');
    img.src = ev.target.result;
    img.style.display = 'block';
    document.getElementById('removeImgBtn').style.display = 'block';
    document.getElementById('uploadZone').style.borderColor = '#FF6F00';
  };
  reader.readAsDataURL(file);
}

function removeImage() {
  document.getElementById('imgPreview').style.display = 'none';
  document.getElementById('imgPreview').src = '';
  document.getElementById('removeImgBtn').style.display = 'none';
  document.getElementById('imgInput').value = '';
  document.getElementById('uploadZone').style.borderColor = '';
}

function submitCustomOrder() {
  const text = document.getElementById('customItemsText').value.trim();
  if (!text) { alert('Please describe the items you want to order.'); return; }
  const msg  = encodeURIComponent('🛒 *CUSTOM ORDER — FlexDrop*\n\n📝 *Items Requested:*\n' + text + '\n\n_(Image may be shared separately)_');
  const phone = CONFIG.SHOPKEEPER_NUMBER.replace('whatsapp:+','').replace('+','');
  window.open('https://wa.me/' + phone + '?text=' + msg, '_blank');
}

/* ─────────────────────────────────────────────────────────
   POLICY POPUPS
───────────────────────────────────────────────────────── */
const policyContent = {
  about:   { title: "About Us", html: `<p>FlexDrop is a fast-growing delivery platform developed by FlexHub to make everyday shopping simple, fast, and flexible.</p><p>Unlike traditional e-commerce platforms, FlexDrop allows users to order not only listed products such as groceries, fruits, vegetables, snacks, and stationery, but also customized items based on individual needs.</p><p>Our goal is to deliver products quickly within a limited time frame while maintaining quality and reliability. FlexHub is committed to innovation in quick-commerce by combining speed, flexibility, and personalized service.</p>` },
  privacy: { title: "Privacy Policy", html: `<p>FlexDrop, operated by FlexHub, is committed to protecting the privacy and personal information of its users.</p><p>We collect information such as your name, phone number, delivery address, email address, and order details to provide and improve our services. This data is used for order processing, delivery coordination, customer support, and communication (including WhatsApp updates).</p><p>We do not sell, rent, or trade your personal data to third parties for marketing purposes. All data is stored securely. FlexHub reserves the right to update this policy at any time.</p>` },
  terms:   { title: "Terms & Conditions", html: `<p>By accessing and using FlexDrop, you agree to the following terms:</p><ul><li>FlexDrop provides on-demand delivery for groceries, stationery, OTC medicines, first-aid items, and customized user-requested products.</li><li>Users must provide accurate and complete details for order processing and delivery.</li><li>Once an order is confirmed, cancellation may not be possible after processing begins.</li><li>Delivery times are estimated and may vary.</li><li>FlexDrop reserves the right to refuse or cancel any order due to pricing errors, unavailability, or suspicious activity.</li><li>Restricted items (alcohol, tobacco, prescription drugs, weapons, adult content, high-value goods) cannot be ordered.</li></ul><h3>Cancellation Policy</h3><p>Cancel before dispatch for a full refund within 3–7 business days. Repeated cancellations may result in account restrictions.</p>` },
  return:  { title: "Return & Refund Policy", html: `<h3>Return Policy</h3><p>Returns accepted only at delivery for: wrong item, damaged product, or expired goods. Report immediately to the delivery partner.</p><h3>Refund Policy</h3><p>Refunds issued for: order cancelled before dispatch, item not delivered, or wrong/damaged item reported at delivery. Processing takes <strong>3–7 business days</strong>. COD refunds via bank transfer. FlexHub verifies all refund requests.</p>` },
  contact: { title: "Contact Us", html: `<p style="margin-bottom:16px;">Reach us anytime:</p><div class="contact-row"><span class="contact-label">Company</span><span class="contact-val">FlexHub</span></div><div class="contact-row"><span class="contact-label">Service</span><span class="contact-val">FlexDrop</span></div><div class="contact-row"><span class="contact-label">Email</span><span class="contact-val">flexhub.org@gmail.com</span></div><div class="contact-row"><span class="contact-label">Phone</span><span class="contact-val">+91 7481028341</span></div><div class="contact-row"><span class="contact-label">Location</span><span class="contact-val">Chaibasa West Singhbhum, India</span></div><p style="margin-top:16px;color:#6D5C3E;font-size:13px;">We respond within 24–48 hours.</p>` }
};

function openPolicy(key) {
  const d = policyContent[key];
  document.getElementById('policyTitle').textContent = d.title;
  document.getElementById('policyBody').innerHTML = d.html;
  document.getElementById('policyOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePolicy() {
  document.getElementById('policyOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function closePolicyIfBg(e) {
  if (e.target === document.getElementById('policyOverlay')) closePolicy();
}
