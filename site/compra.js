document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const totalPriceElement = document.getElementById('total-price');
    const confirmPurchaseButton = document.getElementById('confirm-purchase');
    const cancelPurchaseButton = document.getElementById('cancel-purchase');
    const form = document.getElementById('finalize-form');

    // Recuperar itens do carrinho
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Exibir produtos na página de compra
    function renderProducts() {
        if (cart.length === 0) {
            productList.innerHTML = '<p>Seu carrinho está vazio.</p>';
            totalPriceElement.textContent = 'Total: R$ 0.00';
            confirmPurchaseButton.disabled = true;
            return;
        }

        productList.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('checkout-product');
            productDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="product-image">
                <div class="product-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p>Quantidade: ${item.quantity}</p>
                    <p>Preço: R$ ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;
            productList.appendChild(productDiv);

            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: R$ ${total.toFixed(2)}`;
        confirmPurchaseButton.disabled = false;
    }

    // Função para confirmar compra
    form.addEventListener('submit', event => {
        event.preventDefault();

        // Exibir os dados de compra (ou enviar para o servidor)
        const name = form.name.value;
        const email = form.email.value;
        const address = form.address.value;
        const paymentMethod = form['payment-method'].value;

        alert(`Compra confirmada!\n\nNome: ${name}\nE-mail: ${email}\nEndereço: ${address}\nPagamento: ${paymentMethod}`);
        
        // Limpar carrinho após finalizar compra
        localStorage.setItem('cart', JSON.stringify([]));
        window.location.href = 'index.html';
    });

    // Função para cancelar compra
    cancelPurchaseButton.addEventListener('click', () => {
        if (confirm('Deseja realmente cancelar a compra?')) {
            window.location.href = 'carrinho.html';
        }
    });

    // Renderizar os produtos ao carregar a página
    renderProducts();
});
