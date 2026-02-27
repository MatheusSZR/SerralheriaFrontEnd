# Serralheria Rodrigues - Site Institucional

Projeto front-end estático com 5 páginas:

- `index.html` (início)
- `slide1.html` (serviços)
- `slide2.html` (orçamento com modal)
- `slide3.html` (produtos)
- `slide4.html` (galeria com modal)

## Tecnologias

- HTML5 semântico
- CSS3 responsivo
- JavaScript vanilla

## Estrutura

- `style.css`: estilos globais e componentes (header, cards, modal, galeria, vídeo)
- `script.js`: lógica de modal (orçamento e galeria), acessibilidade por teclado, foco e fechamento por `Esc`

## Como executar localmente

```bash
python -m http.server 8000
```

Depois abra:

- `http://127.0.0.1:8000/index.html`

## Melhorias aplicadas

- Padronização de caminhos (`style.css` e `script.js`) para evitar CSS/JS quebrados.
- Layout moderno e consistente em todas as páginas.
- Navegação e componentes reutilizáveis.
- Modais acessíveis com foco controlado.
- Galeria com ampliação de imagem sem `onclick` inline.

## Autor

Matheus de Souza Rodrigues
