let subMenu = document.querySelector(".sub-menu");
let botao = document.querySelector("#botao");
let container = document.querySelector(".container");
let quantidade = document.getElementById("quantidade");
let opcao = document.getElementById("opcao");
let conteudo = document.querySelector(".conteudo");
let itens = [];
let resultado = [];
let paginaAtual;
let totalPaginas = 0
let limitePorPagina = 3;
let opcaoItem;

// Botoes da Paginacao
let divPage = document.createElement("div");
divPage.classList.add("flex-center");
let next = document.createElement("a");
next.setAttribute("href", "#");
next.innerText = ">";
let previous = document.createElement("a");
previous.setAttribute("href", "#");
previous.innerText = "<";

const mostraSubMenu = (evt) => {
  evt.preventDefault();
  subMenu.classList.toggle("none");
  conteudo.addEventListener("click", escondeSubMenu);
};

const escondeSubMenu = (evt) => {
    if(!subMenu.classList.contains('none')){
    subMenu.classList.toggle('none')
    }
}

const listItems = (items, paginaAtual, limite, opcao) => {
  resultado = [];
  let totalPaginas = Math.ceil(items.length / limite);
  let contador = paginaAtual * limite - limite;
  let delimitador = contador + limite;

  if (paginaAtual <= totalPaginas) {
    for (let i = contador; i < delimitador; i++) {
      if (items[i] != null) {
        resultado.push(items[i]);
      }
      contador++;
    }
  }
  for (item of resultado) {
    let divItem = document.createElement("div");
    divItem.classList.add("item");
    divItem.classList.add("flex-center");
    if (opcao == 1) {
      divItem.innerText = `Item A${item}`;
    } else {
      divItem.innerText = `Item B${item}`;
    }
    conteudo.appendChild(divItem);
    conteudo.appendChild(divPage);
    divPage.appendChild(previous);
    divPage.appendChild(next);
  }
};

const mostraItens = (evt) => {
  conteudo.innerText = "";
  if (quantidade.value > 0) {
    paginaAtual = 1;
    subMenu.classList.toggle("none");
    itens = [];
    for (let i = 1; i <= quantidade.value; i++) {
      itens.push(i);
    }
    let totalItens = itens.length;
    totalPaginas = Math.ceil(totalItens / limitePorPagina);
    opcaoItem = evt.target.value;
    listItems(itens, paginaAtual, limitePorPagina, opcaoItem);
  } else {
    quantidade.style.border = "1px solid #ff0000";
    quantidade.addEventListener("change", (evt) => {
      quantidade.style.border = "1px solid #000";
    });
  }
};

const nextPage = () => {
  conteudo.innerText = "";
  if(paginaAtual<totalPaginas){
  paginaAtual++;
  }
  console.log(paginaAtual);
  listItems(itens, paginaAtual, limitePorPagina, opcaoItem);

  console.log(paginaAtual);
};
const previousPage = () => {
  conteudo.innerText = "";
  if (paginaAtual > 1) {
    paginaAtual = paginaAtual - 1;
  }
  listItems(itens, paginaAtual, limitePorPagina, opcaoItem);
  console.log(paginaAtual);
};


botao.addEventListener("click", mostraSubMenu);
opcao.addEventListener("change", mostraItens);
next.addEventListener("click", nextPage);
previous.addEventListener("click", previousPage);
