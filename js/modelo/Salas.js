class Sala {

    constructor() {
        this.salas = [];
        this.sala = {};
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

        if (this.salas = JSON.parse(localStorage.getItem("salas"))) {
            this.listar();
        } else {
            this.salas = [];
        } // else
    } // Fim de carregarDados()

    salvarDados() {
        if (this.salas.length > 0) {
            localStorage.setItem("salas", JSON.stringify(this.salas));
        } // if
    } // Fim de salvarDados()

    listar() { // LISTAR
        let tabela = document.querySelector("tbody")
        tabela.innerHTML = "";

        this.qtd = 0;

        if (this.salas.length > 0) {
            for (let i = 0; i < this.salas.length; i++) {
                if (this.salas[i]) {
                    this.qtd++;

                    let linha = tabela.insertRow();
                    let colunaNome = linha.insertCell(0);
                    let colunaEditar = linha.insertCell(1);
                    let colunaExcluir = linha.insertCell(2);

                    if (i % 2 == 0) {
                        linha.classList.add("corSim");
                    } else {
                        linha.classList.add("corNao");
                    } // else

                    colunaNome.innerText = this.salas[i].nome;

                    let imgExcluir = document.createElement("img");
                    imgExcluir.src = "img/excluir.svg";
                    imgExcluir.title = "Excluir";
                    imgExcluir.classList.add("icone");
                    imgExcluir.setAttribute("onclick", "sala.excluir('" + i + "')");

                    let imgEditar = document.createElement("img");
                    imgEditar.src = "img/editar.svg";
                    imgEditar.title = "Editar";
                    imgEditar.classList.add("icone");
                    imgEditar.setAttribute("onclick", "sala.editar('" + i + "')");

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
                    this.salas.push(this.sala);
                    this.limparCampos();
                    this.listar();
                    this.salvarDados();

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
            this.salas.splice(i, 1);
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

        document.getElementById("nome").value = this.salas[i].nome;

        document.getElementById("btnSalvar").innerText = "Salvar edição";
        document.getElementById("btnLimpar").innerText = "Cancelar edição";
    } // Fim de editar()

    editarRegistro() {
        if (this.idEdicao >= 0) {

            this.pegarDadosDaTela();

            if (this.msg == "") {
                if (window.confirm("Tem certeza que deseja alterar este registro ?")) {
                    this.salas[this.idEdicao] = this.sala;

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

        this.sala = {};
        this.sala.nome = nome;

        this.validarDados();

        if (this.msg == "") {
            this.ocultarMensagens();
        } else {
            this.mostrarMensagens();
        } // else
    } // Fim de pegarDadosDaTela()

    validarDados() {
        this.msg = "";

        if (this.sala.nome == "") {
            this.msg += "Nome é obrigatório \n";
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

        this.ocultarMensagens();

        if (this.isEdicao) {
            document.getElementById("btnSalvar").innerText = "Salvar";
            document.getElementById("btnLimpar").innerText = "Limpar";

            this.isEdicao = false;
        } // if
    } // Fim de limparCampos()

} // Fim da classe

var sala = new Sala();