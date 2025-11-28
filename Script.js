let lista = JSON.parse(localStorage.getItem("fila")) || [];

renderizar();

function salvar() {
    localStorage.setItem("fila", JSON.stringify(lista));
}

function adicionar() {
    let nome = document.getElementById("nome").value.trim();
    if (!nome) return;

    lista.push({
        nome: nome,
        corridas: 0,
        hora: "-",
        status: "parado"
    });

    salvar();
    renderizar();
}

function remover(index) {
    lista.splice(index, 1);
    salvar();
    renderizar();
}

function marcarCorrida(index) {
    const agora = new Date();
    const hora = agora.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    lista[index].corridas++;
    lista[index].hora = hora;
    lista[index].status = "rodando";

    salvar();
    renderizar();
}

function parar(index) {
    lista[index].status = "parado";
    salvar();
    renderizar();
}

function limparTudo() {
    if (confirm("Deseja limpar toda a fila?")) {
        lista = [];
        salvar();
        renderizar();
    }
}

function renderizar() {
    const ul = document.getElementById("lista");
    ul.innerHTML = "";

    lista.forEach((item, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${item.status === 'rodando' ? 'rodando' : 'parado'}">
                ${item.nome} — Corridas: ${item.corridas} — Última: ${item.hora}
            </span>

            <div>
                <button onclick="marcarCorrida(${index})">Pegou corrida</button>
                <button onclick="parar(${index})">Parar</button>
                <button onclick="remover(${index})">X</button>
            </div>
        `;

        ul.appendChild(li);
    });
}
