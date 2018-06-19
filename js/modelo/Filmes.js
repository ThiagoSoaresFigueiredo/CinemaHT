class Filme {

    constructor() {
        this.filmes = [];
        this.filme = {};
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

        if (this.filmes = JSON.parse(localStorage.getItem("filmes"))) {
            this.listar();
        } else {
            this.filmes = [];
        } // else
    } // Fim de carregarDados()

    salvarDados() {
        if (this.filmes.length > 0) {
            localStorage.setItem("filmes", JSON.stringify(this.filmes));
        } // if
    } // Fim de salvarDados()

    listar() { // LISTAR
        let tabela = document.querySelector("tbody")
        tabela.innerHTML = "";

        this.qtd = 0;

        if (this.filmes.length > 0) {
            for (let i = 0; i < this.filmes.length; i++) {
                if (this.filmes[i]) {
                    this.qtd++;

                    let linha = tabela.insertRow();
                    let colunaNome = linha.insertCell(0);
                    let colunaDuracao = linha.insertCell(1);
                    let colunaEditar = linha.insertCell(2);
                    let colunaExcluir = linha.insertCell(3);
                    let colunaGenero = linha.insertCell(4);

                    if (i % 2 == 0) {
                        linha.classList.add("corSim");
                    } else {
                        linha.classList.add("corNao");
                    } // else

                    colunaNome.innerText = this.filmes[i].nome;
                    colunaDuracao.innerText = this.filmes[i].duracao + " minuto(s)";
                    colunaGenero.innerText = this.filmes[i].genero;

                    let imgExcluir = document.createElement("img");
                    imgExcluir.src = "img/excluir.svg";
                    imgExcluir.title = "Excluir";
                    imgExcluir.classList.add("icone");
                    imgExcluir.setAttribute("onclick", "filme.excluir('" + i + "')");

                    let imgEditar = document.createElement("img");
                    imgEditar.src = "img/editar.svg";
                    imgEditar.title = "Editar";
                    imgEditar.classList.add("icone");
                    imgEditar.setAttribute("onclick", "filme.editar('" + i + "')");

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
                    this.filmes.push(this.filme);
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
            this.filmes.splice(i, 1);
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

        document.getElementById("nome").value = this.filmes[i].nome;
        document.getElementById("duracao").value = this.filmes[i].duracao;
        document.getElementById("classificacao").value = this.filmes[i].classificacao;
        document.getElementById("genero").value = this.filmes[i].genero;
        document.getElementById("sinopse").value = this.filmes[i].sinopse;

        document.getElementById("btnSalvar").innerText = "Salvar edição";
        document.getElementById("btnLimpar").innerText = "Cancelar edição";
    } // Fim de editar()

    editarRegistro() {
        if (this.idEdicao >= 0) {

            this.pegarDadosDaTela();

            if (this.msg == "") {
                if (window.confirm("Tem certeza que deseja alterar este registro ?")) {
                    this.filmes[this.idEdicao] = this.filme;

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
        let duracao = document.getElementById("duracao").value;
        let classificacao = document.getElementById("classificacao").value;
        let genero = document.getElementById("genero").value;
        let sinopse = document.getElementById("sinopse").value;

        this.filme = {};
        this.filme.nome = nome;
        this.filme.duracao = duracao;
        this.filme.classificacao = classificacao;
        this.filme.genero = genero;
        this.filme.sinopse = sinopse;

        this.validarDados();

        if (this.msg == "") {
            this.ocultarMensagens();
        } else {
            this.mostrarMensagens();
        } // else
    } // Fim de pegarDadosDaTela()

    validarDados() {
        this.msg = "";

        if (this.filme.nome == "") {
            this.msg += "Nome é obrigatório \n";
        } // if

        if (this.filme.duracao == "") {
            this.msg += "Duração é obrigatória \n";
        } // if

        if (this.filme.classificacao == "") {
            this.msg += "Classificação é obrigatória \n";
        } // if

        if (this.filme.genero == "") {
            this.msg += "Gênero é obrigatório \n";
        } // if

        if (this.filme.sinopse == "") {
            this.msg += "Sinopse é obrigatória \n"
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
        document.getElementById("duracao").value = "";
        document.getElementById("classificacao").value = "";
        document.getElementById("genero").value = "";
        document.getElementById("sinopse").value = "";

        this.ocultarMensagens();

        if (this.isEdicao) {
            document.getElementById("btnSalvar").innerText = "Salvar";
            document.getElementById("btnLimpar").innerText = "Limpar";

            this.isEdicao = false;
        } // if
    } // Fim de limparCampos()

} // Fim da classe

var filme = new Filme();