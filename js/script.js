// ==========================
// SCROLL SUAVE
// ==========================
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}

// Scroll ao clicar em links internos
document.querySelectorAll('a[href^="#"], a.voltar-loja').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').split('#')[1];
    scrollToSection(targetId);
  });
});

// Scroll se vier de outra página com hash
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if(target){
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }
});

// ==========================
// NAVEGAÇÃO DE PRODUTOS
// ==========================
function verProduto(slug) {
  window.location.href = `product.html?slug=${slug}`;
}

// ==========================
// CARRINHO
// ==========================
function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const contador = document.getElementById('contador-carrinho');
  if (contador) contador.textContent = carrinho.length;
}

function atualizarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const carrinhoItens = document.getElementById('carrinho-itens');
  const carrinhoTotal = document.getElementById('carrinho-total');

  if (carrinhoItens) carrinhoItens.innerHTML = '';
  let total = 0;

  carrinho.forEach(item => {
    total += item.preco * item.quantidade;
    if (carrinhoItens) {
      const div = document.createElement('div');
      div.className = 'item-carrinho';
      div.innerHTML = `<span>${item.nome} (${item.quantidade}x)</span>
                       <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>`;
      carrinhoItens.appendChild(div);
    }
  });

  if (carrinhoTotal) carrinhoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;

  const botaoCarrinho = document.querySelector('.botao-carrinho');
  if (botaoCarrinho) {
    const quantidadeTotal = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    botaoCarrinho.textContent = `🛒 (${quantidadeTotal})`;
  }
}

function mostrarMensagemCarrinho(texto) {
  let msg = document.getElementById("mensagem-carrinho");
  if (!msg) {
    msg = document.createElement("div");
    msg.id = "mensagem-carrinho";
    Object.assign(msg.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "linear-gradient(90deg, #ffd700, #ffcc00)",
      color: "#000",
      padding: "15px 25px",
      borderRadius: "12px",
      fontWeight: "700",
      fontSize: "0.9rem",
      boxShadow: "0 4px 15px rgba(255,215,0,0.7)",
      zIndex: 9999,
      opacity: 0,
      transition: "all 0.4s ease"
    });
    document.body.appendChild(msg);
  }

  msg.textContent = texto;
  msg.style.opacity = 1;

  setTimeout(() => msg.style.opacity = 0, 2000);
}

function adicionarAoCarrinho(nome, preco, tamanho = 'M') {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const itemExistente = carrinho.find(item => item.nome === nome && item.tamanho === tamanho);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ nome, preco, tamanho, quantidade: 1 });
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  mostrarMensagemCarrinho(`${nome} (${tamanho}) adicionado ao carrinho!`);
  atualizarCarrinho();
  atualizarContadorCarrinho();
}

// Abrir carrinho
function abrirCarrinho() {
  window.location.href = 'cart.html';
}

document.getElementById("btn-abrir-carrinho")?.addEventListener('click', abrirCarrinho);

// Atualiza carrinho ao carregar a página
window.addEventListener('load', atualizarContadorCarrinho);
document.addEventListener('DOMContentLoaded', atualizarCarrinho);

// ==========================
// FORMULÁRIO WHATSAPP
// ==========================
document.getElementById("form-contato")?.addEventListener("submit", e => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const msg = document.getElementById("mensagem").value;
  const mensagem = `Olá, meu nome é ${nome}. Meu e-mail: ${email}. Mensagem: ${msg}`;
  window.open(`https://wa.me/5517981315423?text=${encodeURIComponent(mensagem)}`, "_blank");
});

// ==========================
// MÚSICA
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  const musica = document.getElementById('musica');
  musica?.play().catch(() => console.log("Clique na tela para tocar a música"));
});

document.body.addEventListener('click', () => {
  const musica = document.getElementById('musica');
  if(!musica) return;
  if (musica.paused) musica.play();
  else musica.pause();
});

// ==========================
// FINALIZAR COMPRA
// ==========================
document.getElementById("finalizarCompra")?.addEventListener("click", () => {
  alert("Redirecionando para a finalização da compra...");
});

document.addEventListener('DOMContentLoaded', () => {
  // Scroll suave para links com hash na mesma página
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Links que apontam para index.html com hash
  document.querySelectorAll('a[href^="index.html#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const parts = this.getAttribute('href').split('#');
      const sectionId = parts[1];

      // Se já estiver na página index.html, scroll suave
      if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        const target = document.getElementById(sectionId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Se estiver em outra página, redireciona para index.html com hash
        window.location.href = `index.html#${sectionId}`;
      }
    });
  });

  // Se a página for carregada com hash, faz scroll suave
  if (window.location.hash) {
    const section = document.querySelector(window.location.hash);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }
});
// ==========================
// FIM DO SCRIPT
// ==========================

// Apenas adiciona a hash inicial se ainda não houver uma e se estivermos na página index
if ((window.location.pathname.endsWith('index.html') || window.location.pathname === '/') && !window.location.hash) {
  window.location.replace('index.html#inicio');
}

// Adiciona listener para links que apontam para index.html#... (sem tags <script> no arquivo .js)
document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os links para index.html com hash
  document.querySelectorAll('a[href^="index.html#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const parts = href.split('#');
      const sectionId = parts[1];

      // Redireciona para index.html com hash
      window.location.assign(`index.html#${sectionId}`);
    });
  });
});

      
