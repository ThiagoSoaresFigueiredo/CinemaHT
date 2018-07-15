'use strict';

const url = "http://localhost:4000/clientes";

class Cliente {

    constructor() {
        this.clientes = [];
        this.cliente = {};
        this.qtd = 0;
        this.msg = "";
        this.isEdicao = false;
        this.idEdicao = -1;
    } // Fim do construtor()

    carregarUsuarioLogado() {
        let usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

        if (usuarioLogado == null) {
            document.getElementById("usuarioLogado").innerHTML = "Usuário:<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b> Teste </b>"
        } else {
            document.getElementById("usuarioLogado").innerHTML = "Usuário:<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b>" + usuarioLogado + "</b>"
        } // else
    } // Fim de carregarUsuarioLogado()

    carregarDados() {
        this.carregarUsuarioLogado();

        // if (this.clientes = JSON.parse(localStorage.getItem("clientes"))) {
        //     this.listar();
        // } else {
        //     this.clientes = [];
        // } // else

        ////// API
        this.clientes = JSON.parse(this.fazerRequest("GET", url, null));
        this.listar();

    } // Fim de carregarDados()

    fazerRequest(method, URL, body) {
        var xhttp = new XMLHttpRequest();

        xhttp.open(method, URL, false);

        if (body == null) {
            xhttp.send();
        } else {
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(body);
        }

        if (xhttp.status == 200) {
            return xhttp.response;
        }

        return null;
    }

    salvarDados() {
        // if (this.clientes.length > 0) {
        //     localStorage.setItem("clientes", JSON.stringify(this.clientes));
        // } // if

        ///// API
        this.fazerRequest("POST", url, JSON.stringify(this.cliente));
    } // Fim de salvarDados()

    listar() { // LISTAR
        let tabela = document.querySelector("#corpoTabela");
        tabela.innerHTML = "";

        let id = 0;
        this.qtd = 0;

        if (this.clientes.length > 0) {
            for (let i = 0; i < this.clientes.length; i++) {
                if (this.clientes[i]) {
                    id = this.clientes[i]._id;
                    this.qtd++;

                    let linha = tabela.insertRow();
                    let colunaNome = linha.insertCell(0);
                    let colunaIdade = linha.insertCell(1);
                    let colunaEmail = linha.insertCell(2);
                    let colunaEditar = linha.insertCell(3);
                    let colunaExcluir = linha.insertCell(4);

                    if (i % 2 == 0) {
                        linha.classList.add("corSim");
                    } else {
                        linha.classList.add("corNao");
                    } // else

                    colunaNome.innerText = this.clientes[i].nome;
                    colunaIdade.innerText = this.clientes[i].idade;
                    colunaEmail.innerText = this.clientes[i].email;

                    let imgExcluir = document.createElement("img");
                    imgExcluir.src = "img/excluir.svg";
                    imgExcluir.title = "Excluir";
                    imgExcluir.classList.add("icone");
                    imgExcluir.setAttribute("onclick", "cliente.excluir('" + id + "')");

                    let imgEditar = document.createElement("img");
                    imgEditar.src = "img/editar.svg";
                    imgEditar.title = "Editar";
                    imgEditar.classList.add("icone");
                    imgEditar.setAttribute("onclick", "cliente.editar('" + id + "')");

                    colunaEditar.appendChild(imgEditar);
                    colunaExcluir.appendChild(imgExcluir);
                } // if
            } // for
        }
        document.getElementById("qtde").innerHTML = "(<i>" + this.qtd + "</i>)";
    } // Fim de listar()

    salvar() { // SALVAR
        if (this.isEdicao) {
            this.editarRegistro();
        } else {
            this.pegarDadosDaTela();

            if (this.msg == "") {
                if (window.confirm("Tem certeza que deseja salvar os dados informados ?")) {
                    this.salvarDados();
                    this.limparCampos();
                    this.listar();

                    window.alert("Registro salvo com sucesso");
                } else {
                    this.limparCampos();

                    window.alert("Inclusão cancelada. Nenhum registro foi salvo");
                } // else
            } // if
        } // else
    } // Fim de salvar()

    excluir(i) { // EXCLUIR 
        if (window.confirm("Tem certeza que deseja excluir este registro ?")) {
            let clienteParaExcluir = {
                _id: i
            }
            this.fazerRequest("DELETE", url, JSON.stringify(clienteParaExcluir));
            this.listar();
            this.salvarDados();
            window.alert("Registro excluído com sucesso");
        } else {
            window.alert("Exclusão cancelada. Nenhum registro foi apagado")
        } // else
    } // Fim de excluir()

    editar(i) { // EDITAR
        this.isEdicao = true;
        this.idEdicao = i;

        document.getElementById("nome").value = this.clientes[i].nome;
        document.getElementById("idade").value = this.clientes[i].idade;
        document.getElementById("email").value = this.clientes[i].email;

        document.getElementById("btnSalvar").innerText = "Salvar edição";
        document.getElementById("btnLimpar").innerText = "Cancelar edição";
    } // Fim de editar()

    editarRegistro() {
        if (this.idEdicao >= 0) {

            this.pegarDadosDaTela();

            if (this.msg == "") {
                if (window.confirm("Tem certeza que deseja alterar este registro ?")) {
                    this.clientes[this.idEdicao] = this.cliente;

                    this.isEdicao = false;
                    this.limparCampos();
                    this.listar();
                    this.salvarDados();

                    document.getElementById("btnSalvar").innerText = "Salvar";
                    document.getElementById("btnLimpar").innerText = "Limpar";

                    window.alert("Registro alterado com sucesso");
                } else {
                    this.limparCampos();

                    window.alert("Edição cancelada. Nenhum registro foi alterado");
                }
            } // if
        } // if
    } // eidtarRegistro()

    pegarDadosDaTela() {
        let nome = document.getElementById("nome").value;
        let idade = document.getElementById("idade").value;
        let email = document.getElementById("email").value;

        this.cliente = {};
        this.cliente.nome = nome;
        this.cliente.idade = idade;
        this.cliente.email = email;

        this.validarDados();

        if (this.msg == "") {
            this.ocultarMensagens();
        } else {
            this.mostrarMensagens();
        } // else
    } // Fim de pegarDadosDaTela()

    validarDados() {
        this.msg = "";

        if (this.cliente.nome == "") {
            this.msg += "Nome é obrigatório \n";
        } // if

        if (this.cliente.idade == "") {
            this.msg += "Idade é obrigatória \n";
        } // if

        if (this.cliente.email == "") {
            this.msg += "Email é obrigatório \n";
        } // if
    } // Fim de this.validarDados()

    mostrarMensagens() {
        let divMensagem = document.getElementById("textoDaMensagem");
        divMensagem.innerText = this.msg;
        document.getElementById("mensagem").classList.add("mostrarMsg");
    } // Fim de mostrarMensagensDeValidacao()

    ocultarMensagens() {
        let divMensagem = document.getElementById("textoDaMensagem");
        divMensagem.innerText = this.msg;
        document.getElementById("mensagem").classList.remove("mostrarMsg");
    } // Fim de mostrarMensagensDeValidacao()

    limparCampos() {
        document.getElementById("nome").value = "";
        document.getElementById("idade").value = "";
        document.getElementById("email").value = "";

        this.ocultarMensagens();

        if (this.isEdicao) {
            document.getElementById("btnSalvar").innerText = "Salvar";
            document.getElementById("btnLimpar").innerText = "Limpar";

            this.isEdicao = false;
        } // if
    } // Fim de limparCampos()

} // Fim da classe

var cliente = new Cliente();