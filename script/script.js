const formulario = document.getElementById("form");
const formularioEditar = document.getElementById("formEditar");
const resultado = document.getElementById("resultado");
const contatos = JSON.parse(localStorage.getItem("contatos")) || [];

const nomeEditar = document.getElementById("nomeEditar");
const sobrenomeEditar = document.getElementById("sobrenomeEditar");
const emailEditar = document.getElementById("emailEditar");
const numeroEditar = document.getElementById("numeroEditar");

function gerarIdUnico() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const email = document.getElementById("email").value;
  const numero = document.getElementById("numero").value;
  const user = {
    id: gerarIdUnico(),
    nome,
    sobrenome,
    email,
    numero,
  };
  contatos.push(user);
  localStorage.setItem("contatos", JSON.stringify(contatos));
  console.log(contatos);
  formulario.reset();
  mostarResultado();
});

function excluirContato(id) {
  const indexContatos = contatos.findIndex((task) => task.id == id);
  contatos.splice(indexContatos, 1);
  localStorage.setItem("contatos", JSON.stringify(contatos));
  mostarResultado();
}

function editarContato(id) {
  document.querySelector(".modalEditar").style.display = "flex";
  const contato = contatos.find((item) => item.id == id);

  if (contato) {
    nomeEditar.value = contato.nome;
    sobrenomeEditar.value = contato.sobrenome;
    emailEditar.value = contato.email;
    numeroEditar.value = contato.numero;

    console.log("Editando contato:", contato);

    formularioEditar.onsubmit = null;

    formularioEditar.onsubmit = (e) => {
      e.preventDefault();
      contato.nome = nomeEditar.value;
      contato.sobrenome = sobrenomeEditar.value;
      contato.email = emailEditar.value;
      contato.numero = numeroEditar.value;

      localStorage.setItem("contatos", JSON.stringify(contatos));
      mostarResultado();
      document.querySelector(".modalEditar").style.display = "none";
    };
  } else {
    console.error("Contato não encontrado.");
  }
}

const mostarResultado = () => {
  resultado.innerHTML = "";
  contatos.map((item) => {
    resultado.innerHTML += `
    <div class="contato">
    <div class="dados">
    <div class="image">
    <img src="https://avatar.iran.liara.run/username?username=${item.nome} ${item.sobrenome}">
    </div>
    <div class="informacoes">
    <p><strong>Nome:</strong> ${item.nome} ${item.sobrenome}</p>
    <p><strong>E-mail:</strong> ${item.email}</p>
    <p><strong>Telefone:</strong> ${item.numero}</p>
    </div>
    </div>
    <div class="btns">
    <button class="btn-editar" onclick="editarContato('${item.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path><path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path></svg></button>
    <button class="btn-excluir" onclick="excluirContato('${item.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path></svg></button>
    
    </div>
    
    </div>`;
  });
};

mostarResultado();
