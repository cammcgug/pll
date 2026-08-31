(() => {
  const KEY = 'prettyLittleLayersCart';
  const products = [
    { id: 'signature-layer-cake', name: 'Signature Pastel Layer Cake', price: 68, category: 'cakes', tag: 'Bestseller', image: 'assets/images/custom-cakes-card-placeholder.jpg', alt: 'Pink custom layer cake with pastel piped flowers and hearts' },
    { id: 'party-cupcakes', name: 'Pastel Party Cupcakes', price: 36, category: 'cupcakes', tag: 'Box of 12', image: 'assets/images/cupcakes-card-placeholder.jpg', alt: 'Pastel pink, peach and lavender cupcakes' },
    { id: 'little-love-box', name: 'Little Love Dessert Box', price: 42, category: 'boxes', tag: 'Gift-ready', image: 'assets/images/dessert-box-card-placeholder.jpg', alt: 'Lavender dessert gift box filled with miniature treats' },
    { id: 'celebration-cake', name: 'Two-Tier Celebration Cake', price: 145, category: 'cakes', tag: 'Serves 24', image: 'assets/images/gallery-cake-01-placeholder.jpg', alt: 'Two-tier pastel celebration cake with piped flowers' },
    { id: 'heart-cookie-box', name: 'Sweetheart Cookie Box', price: 28, category: 'cookies', tag: 'Box of 8', image: 'assets/images/gallery-cookies-05-placeholder.jpg', alt: 'Decorated pastel heart-shaped sugar cookies' },
    { id: 'tasting-slices', name: 'Layer Cake Tasting Box', price: 32, category: 'boxes', tag: 'Six slices', image: 'assets/images/gallery-slices-06-placeholder.jpg', alt: 'Pastel layer cake slices with piped frosting' }
  ];

  const money = value => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(value);
  const getCart = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  };
  const setCart = cart => {
    localStorage.setItem(KEY, JSON.stringify(cart));
    updateCount();
    window.dispatchEvent(new CustomEvent('pll:cart-updated'));
  };
  const updateCount = () => {
    const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('[data-cart-count]').forEach(el => { el.textContent = count; });
  };
  const add = id => {
    const cart = getCart();
    const existing = cart.find(item => item.id === id);
    if (existing) existing.quantity += 1;
    else cart.push({ id, quantity: 1 });
    setCart(cart);
  };
  const change = (id, delta) => {
    const cart = getCart();
    const item = cart.find(entry => entry.id === id);
    if (!item) return;
    item.quantity += delta;
    setCart(cart.filter(entry => entry.quantity > 0));
  };
  const remove = id => setCart(getCart().filter(item => item.id !== id));
  const totals = () => {
    const subtotal = getCart().reduce((sum, item) => {
      const product = products.find(p => p.id === item.id);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    return { subtotal };
  };

  const productGrid = document.querySelector('[data-product-grid]');
  if (productGrid) {
    const renderProducts = filter => {
      const filtered = !filter || filter === 'all' ? products : products.filter(p => p.category === filter);
      productGrid.innerHTML = filtered.map(product => `
        <article class="product-card">
          <img src="${product.image}" width="720" height="720" loading="lazy" alt="${product.alt}">
          <div class="card-body">
            <div class="product-meta"><span class="tag">${product.tag}</span><span class="price">${money(product.price)}</span></div>
            <h2>${product.name}</h2>
            <p>Freshly made in our signature pastel style. Select final flavours and details after ordering.</p>
            <button class="btn btn--block" type="button" data-add="${product.id}">Add to cart <span aria-hidden="true">♥</span></button>
          </div>
        </article>`).join('');
    };
    renderProducts('all');
    document.querySelector('[data-product-filter]')?.addEventListener('change', event => renderProducts(event.target.value));
    productGrid.addEventListener('click', event => {
      const button = event.target.closest('[data-add]');
      if (!button) return;
      add(button.dataset.add);
      const original = button.innerHTML;
      button.textContent = 'Added! ✓';
      setTimeout(() => { button.innerHTML = original; }, 1200);
    });
  }

  const cartRoot = document.querySelector('[data-cart-items]');
  const renderCart = () => {
    if (!cartRoot) return;
    const cart = getCart();
    const empty = document.querySelector('[data-cart-empty]');
    const summary = document.querySelector('[data-cart-summary]');
    if (!cart.length) {
      cartRoot.innerHTML = '';
      empty?.removeAttribute('hidden');
      if (summary) summary.hidden = true;
      return;
    }
    if (empty) empty.hidden = true;
    if (summary) summary.hidden = false;
    cartRoot.innerHTML = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return '';
      return `<article class="cart-item">
        <img src="${product.image}" width="220" height="220" alt="${product.alt}">
        <div><h2>${product.name}</h2><p class="price">${money(product.price)}</p><button class="remove-btn" type="button" data-remove="${product.id}">Remove</button></div>
        <div class="quantity" aria-label="Quantity for ${product.name}"><button type="button" data-change="-1" data-id="${product.id}" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button type="button" data-change="1" data-id="${product.id}" aria-label="Increase quantity">+</button></div>
      </article>`;
    }).join('');
    document.querySelectorAll('[data-subtotal]').forEach(el => { el.textContent = money(totals().subtotal); });
  };
  cartRoot?.addEventListener('click', event => {
    const changeButton = event.target.closest('[data-change]');
    const removeButton = event.target.closest('[data-remove]');
    if (changeButton) change(changeButton.dataset.id, Number(changeButton.dataset.change));
    if (removeButton) remove(removeButton.dataset.remove);
    renderCart();
  });

  const checkoutItems = document.querySelector('[data-checkout-items]');
  const renderCheckout = () => {
    if (!checkoutItems) return;
    const cart = getCart();
    const form = document.querySelector('[data-checkout-form]');
    const empty = document.querySelector('[data-checkout-empty]');
    if (!cart.length) {
      if (form) form.hidden = true;
      empty?.removeAttribute('hidden');
      return;
    }
    if (form) form.hidden = false;
    if (empty) empty.hidden = true;
    checkoutItems.innerHTML = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      return product ? `<div class="summary-row"><span>${product.name} × ${item.quantity}</span><strong>${money(product.price * item.quantity)}</strong></div>` : '';
    }).join('');
    updateCheckoutTotal();
  };
  const updateCheckoutTotal = () => {
    const fulfilment = document.querySelector('input[name="fulfilment"]:checked')?.value || 'pickup';
    const delivery = fulfilment === 'delivery' ? 12 : 0;
    const subtotal = totals().subtotal;
    document.querySelectorAll('[data-subtotal]').forEach(el => { el.textContent = money(subtotal); });
    document.querySelectorAll('[data-delivery]').forEach(el => { el.textContent = delivery ? money(delivery) : 'Free'; });
    document.querySelectorAll('[data-total]').forEach(el => { el.textContent = money(subtotal + delivery); });
    const address = document.querySelector('[data-delivery-address]');
    if (address) address.hidden = fulfilment !== 'delivery';
    address?.querySelectorAll('input').forEach(input => { input.required = fulfilment === 'delivery'; });
  };
  document.querySelectorAll('input[name="fulfilment"]').forEach(input => input.addEventListener('change', updateCheckoutTotal));
  document.querySelector('[data-checkout-form]')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const orderNumber = `PLL-${String(Date.now()).slice(-6)}`;
    localStorage.setItem('prettyLittleLayersLastOrder', orderNumber);
    localStorage.removeItem(KEY);
    form.hidden = true;
    document.querySelector('[data-confirmation-number]').textContent = orderNumber;
    document.querySelector('[data-confirmation]').classList.add('is-visible');
    updateCount();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('pll:cart-updated', renderCart);
  updateCount();
  renderCart();
  renderCheckout();
})();
