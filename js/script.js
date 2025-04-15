// Script para modal de cadastro de orçamento
(function () {
    // Obtém os elementos do modal, botão de abrir e o botão de fechar
    const modal = document.getElementById("cadastroModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.querySelector(".close");

    // Função para abrir o modal
    const openModal = () => {
        modal.style.display = "flex"; // Torna o modal visível
        modal.setAttribute("aria-hidden", "false"); // Acessibilidade: modal visível
        openModalBtn.setAttribute("aria-expanded", "true"); // Atualiza estado do botão
    };

    // Função para fechar o modal
    const closeModal = () => {
        modal.style.display = "none"; // Esconde o modal
        modal.setAttribute("aria-hidden", "true"); // Acessibilidade: modal escondido
        openModalBtn.setAttribute("aria-expanded", "false"); // Atualiza estado do botão
    };

    // Abrir o modal ao clicar no botão
    openModalBtn.addEventListener("click", openModal);

    // Fechar o modal ao clicar no botão de fechar
    closeModalBtn.addEventListener("click", closeModal);

    // Fechar o modal ao clicar fora dele
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Fechar o modal com a tecla "Esc"
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.style.display === "flex") {
            closeModal();
        }
    });
})();

// Script para o efeito de zoom nas imagens da galeria
(function () {
    const galleryImages = document.querySelectorAll(".zoom");

    // Adiciona o evento de clique para aplicar o efeito de zoom
    galleryImages.forEach((image) => {
        image.addEventListener("click", () => {
            image.style.transform = "scale(1.5)";
            image.style.transition = "transform 0.3s ease";

            setTimeout(() => {
                image.style.transform = "scale(1)";
            }, 2000);
        });
    });
})();
