// Função para adicionar um produto ao carrinho
function addToCart(id, name, description, price, image) {
    // Obtém o carrinho do LocalStorage ou cria um novo array se não existir
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verifica se o item já está no carrinho
    const existingProductIndex = cart.findIndex(item => item.id === id);
    if (existingProductIndex !== -1) {
        // Atualiza a quantidade se já existir
        cart[existingProductIndex].quantity += 1;
    } else {
        // Adiciona o novo produto ao carrinho
        cart.push({
            id,
            name,
            description,
            price,
            image,
            quantity: 1
        });
    }

    // Salva o carrinho atualizado no LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Exibe uma mensagem de confirmação
    alert(`${name} foi adicionado ao carrinho!`);
}

// Adiciona eventos de clique aos botões de adicionar ao carrinho
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            const name = button.getAttribute('data-name');
            const description = button.getAttribute('data-description');
            const price = parseFloat(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');

            // Chama a função para adicionar ao carrinho
            addToCart(id, name, description, price, image);
        });
    });
});
