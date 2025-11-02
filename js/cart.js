let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
const carrinhoItens = document.getElementById('carrinho-itens');
const carrinhoTotal = document.getElementById('carrinho-total');

function atualizarCarrinho() {
  carrinhoItens.innerHTML = '';
  let total = 0;
  carrinho.forEach((item, index)=>{
    total += item.preco * item.quantidade;
    carrinhoItens.innerHTML += `
      <div class="item-carrinho">
        <p>${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}</p>
        <button onclick="remover(${index})">Remover</button>
      </div>`;
  });
  carrinhoTotal.innerText = "Total: R$ " + total.toFixed(2);
}

function remover(index) {
  carrinho.splice(index,1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarCarrinho();
}

document.getElementById('btn-checkout').onclick = () => {
  if(carrinho.length === 0){ alert("Carrinho vazio!"); return; }
  let msg = "Olá, quero comprar:\n";
  carrinho.forEach(item => { msg += `${item.nome} - R$${item.preco.toFixed(2)} x ${item.quantidade}\n`; });
  msg += `Total: R$ ${carrinho.reduce((acc, i)=> acc + i.preco*i.quantidade,0).toFixed(2)}`;
  window.open(`https://wa.me/5517981315423?text=${encodeURIComponent(msg)}`, "_blank");
};

atualizarCarrinho();

carrinho.forEach(item => {
  const div = document.createElement('div');
  div.classList.add('item-carrinho');
  div.innerHTML = `
    <span>${item.nome} - ${item.tamanho}</span>
    <span>R$ ${item.preco.toFixed(2)}</span>
    <button onclick="removerDoCarrinho(${index})">Remover</button>
  `;
  carrinhoItens.appendChild(div);
});
function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarCarrinho();
}

function abrirCarrinho() {
  window.location.href = 'cart.html';
}

function mostrarMensagemCarrinho(texto) {
  let msg = document.getElementById("mensagem-carrinho");
  if (!msg) {
    msg = document.createElement("div");
    msg.id = "mensagem-carrinho";
    document.body.appendChild(msg);
    Object.assign(msg.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      background: "linear-gradient(90deg, #ffd700, #ffcc00)",
      color: "#000",
      fontWeight: "700",
      padding: "15px 25px",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(255,215,0,0.7)",
      zIndex: "999",
      opacity: 0,
      transition: "all 0.4s ease"
    });
  }
  msg.textContent = texto;
  msg.style.opacity = 1;
  setTimeout(() => msg.style.opacity = 0, 2000);
}

function atualizarContadorCarrinho() {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const contador = document.getElementById('contador-carrinho');
  if (contador) contador.textContent = carrinho.length;
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
  atualizarContadorCarrinho();
}

// Inicializa contador ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarContadorCarrinho);

// Botão carrinho fixo
const btnCarrinho = document.querySelector('.botao-carrinho');
if (btnCarrinho) btnCarrinho.onclick = abrirCarrinho;
// ==========================
