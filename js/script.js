// Script para modal de cadastro de orçamento
// Obtém os elementos do modal, botão de abrir e o botão de fechar
var modal = document.getElementById("cadastroModal");
var btn = document.getElementById("openModalBtn");
var span = document.getElementsByClassName("close")[0];

// Ao clicar no botão de "Cadastrar Orçamento", abre o modal
btn.onclick = function() {
    modal.style.display = "flex"; // Torna o modal visível
}

// Fechar o modal ao clicar no 'X'
span.onclick = function() {
    modal.style.display = "none"; // Esconde o modal
}

// Fechar o modal clicando fora dele
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"; // Esconde o modal
    }
}

// Script para o efeito de zoom nas imagens da galeria
document.querySelectorAll('.zoom').forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'scale(1.5)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 2000);
    });
});
