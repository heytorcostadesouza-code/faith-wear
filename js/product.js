const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');

const produtos = {
  "Christ is the cure": {nome:"Christ is the cure", preco:79.9, desc:"Camiseta Christ is the cure, tecido 100% algodão.", img:"imagens/camisa1.jpg"},
  "Jesus its my savior": {nome:"Jesus its my savior", preco:84.9, desc:"Camiseta Jesus its my savior, estilo moderno.", img:"imagens/Jesus its my savior.jpg"},
  "Jesus my King": {nome:"Jesus my King", preco:89.9, desc:"Camiseta Jesus my King, confortável e estilosa.", img:"imagens/Jesus my King.jpg"},
  "love like Jesus": {nome:"love like Jesus", preco:94.9, desc:"love like Jesus, edição especial.", img:"imagens/love like Jesus.jpg"},
};

if(!produtos[slug]){
    alert("Produto não encontrado!");
    window.location.href = "index.html#loja";
}

const p = produtos[slug];
document.getElementById('produto-img').src = p.img;
document.getElementById('produto-nome').innerText = p.nome;
document.getElementById('produto-preco').innerText = "R$ " + p.preco.toFixed(2);
document.getElementById('produto-desc').innerText = p.desc;

document.getElementById('btn-carrinho').onclick = () => {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push({nome:p.nome, preco:p.preco, quantidade:1});
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert(p.nome + " adicionado ao carrinho!");
  window.location.href = 'cart.html';
};

const produtoImg = document.getElementById('produto-img');

produtoImg.addEventListener('click', () => {
  produtoImg.classList.toggle('zoom'); // alterna entre zoom in/out
});


