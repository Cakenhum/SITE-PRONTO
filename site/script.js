// Lista de produtos simulados
const products = [
    { name: "Pão de Queijo", description: "Delicioso pão de queijo fresquinho, ideal para o café da manhã.", price: 5.00, image: "imagens/pao-queijo.jpg" },
    { name: "Bolo de Cenoura", description: "Bolo de cenoura com cobertura de chocolate, uma verdadeira delícia.", price: 12.00, image: "imagens/bolo-cenoura.jpg" },
    { name: "Croissant", description: "Croissant amanteigado e crocante, perfeito para qualquer hora do dia.", price: 7.50, image: "imagens/croissant.jpg" },
    { name: "Pão Francês", description: "Pão francês fresquinho, perfeito para acompanhar sua refeição.", price: 3.00, image: "imagens/pao-frances.jpg" }
];

// Função para renderizar os produtos na página
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';  // Limpa a lista de produtos exibidos

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Preço: R$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-name="${product.name}" data-description="${product.description}" data-price="${product.price}" data-image="${product.image}">Adicionar ao carrinho</button>
        `;

        productList.appendChild(productCard);
    });

    // Adiciona eventos aos botões de "Adicionar ao carrinho" para cada produto
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Função para adicionar produto ao carrinho
function addToCart(event) {
    const button = event.target;
    const name = button.getAttribute('data-name');
    const description = button.getAttribute('data-description');
    const price = parseFloat(button.getAttribute('data-price'));
    const image = button.getAttribute('data-image');

    // Obtém o carrinho do localStorage ou cria um novo carrinho se não existir
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Adiciona o item ao carrinho
    cart.push({ name, description, price, image });

    // Salva o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Notifica o usuário
    alert(`Produto Adicionado ao Carrinho: ${name}, Preço: R$${price.toFixed(2)}`);
}

// Função para renderizar os itens no carrinho
function renderCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';  // Limpa a lista de itens no carrinho

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartList.innerHTML = '<p>O carrinho está vazio.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Preço: R$${item.price.toFixed(2)}</p>
                <button class="remove-from-cart" data-name="${item.name}">Remover</button>
            `;

            cartList.appendChild(cartItem);
        });

        // Adiciona evento para remover itens do carrinho
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }
}

// Função para remover um item do carrinho
function removeFromCart(event) {
    const button = event.target;
    const name = button.getAttribute('data-name');

    // Obtém o carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filtra o item a ser removido
    cart = cart.filter(item => item.name !== name);

    // Atualiza o localStorage com o carrinho atualizado
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza a página de carrinho
    renderCart();
}

// Função para esvaziar o carrinho
function clearCart() {
    localStorage.removeItem('cart');
    renderCart();
}

// Função para processar o pagamento e finalizar a compra
function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('O carrinho está vazio. Adicione produtos antes de finalizar a compra.');
        return;
    }

    // Aqui você pode adicionar lógica para processar a compra, como exibir dados de pagamento
    alert('Compra finalizada com sucesso!');

    // Após a compra, esvaziamos o carrinho
    clearCart();
}

// Inicializa a renderização dos produtos e carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('product-list')) {
        renderProducts(); // Renderiza produtos na página de produtos
    }

    if (document.getElementById('cart-list')) {
        renderCart(); // Renderiza itens no carrinho
    }

    if (document.getElementById('clear-cart')) {
        document.getElementById('clear-cart').addEventListener('click', clearCart);
    }

    if (document.getElementById('checkout-button')) {
        document.getElementById('checkout-button').addEventListener('click', checkout);
    }
});
