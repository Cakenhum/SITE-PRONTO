// Função para renderizar os itens do carrinho na página
function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartContainer.innerHTML = ''; // Limpa o conteúdo atual

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Quantidade: ${item.quantity}</p>
                <p>Preço: R$ ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">Remover</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    attachRemoveItemEvents();
}

// Função para esvaziar o carrinho
function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    renderCart();
}

// Função para finalizar a compra
function finalizePurchase() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.');
        return;
    }

    // Redireciona para a página de compra
    window.location.href = 'compra.html';
}

// Função para remover um item do carrinho
function attachRemoveItemEvents() {
    const removeButtons = document.querySelectorAll('.remove-item');

    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            let cart = JSON.parse(localStorage.getItem('cart'));

            // Filtra os itens removendo o item selecionado
            cart = cart.filter(item => item.id !== id);

            // Atualiza o carrinho no LocalStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Renderiza o carrinho novamente
            renderCart();
        });
    });
}

// Eventos para botões de esvaziar e finalizar
document.getElementById('clear-cart').addEventListener('click', clearCart);
document.getElementById('finalize-purchase').addEventListener('click', finalizePurchase);

// Inicializa a renderização do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', renderCart);
