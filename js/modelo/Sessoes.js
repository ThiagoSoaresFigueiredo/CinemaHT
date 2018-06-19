class Sessoes {

    constructor() {
        this.filmes = null;
        this.salas = [];
        this.sessoes = [];
        this.cliente = {};
        this.qtd = 0;
        this.msg = "";
        this.isEdicao = false;
        this.idEdicao = -1;
        this.cadeira = {};
        this.cadeiras = [];
    } // Fim do construtor()

    gerarAssentos() {
        this.cadeira.ocupado = false;

        for(let i = 0; i < 60; i++) {
            this.cadeiras.push(this.cadeira);
        }
        console.log(this.cadeiras);
        
        // this.cadeiras.push(fileira);
    } // Fim de gerarAssentos

    carregarUsuarioLogado() {
        let usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

        if (usuarioLogado == null) {
            document.getElementById("usuarioLogado").innerHTML = "Usuário:<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b> Teste </b>"
        } else {
            document.getElementById("usuarioLogado").innerHTML = "Usuário:<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b>" + usuarioLogado + "</b>"
        } // else
    } // Fim de carregarUsuarioLogado()

    carregarListaDeFilmes() {
        this.filmes = JSON.parse(localStorage.getItem("filmes"));

        if (this.filmes == null) {
            this.filmes = [];
        } else {
            this.preencherListaDeFilmes();
        } // else
    } // Fim de carregarListaDeFilmes()

    carregarListaDeSalas() {
        this.salas = JSON.parse(localStorage.getItem("salas"));

        if (this.salas == null) {
            this.salas = [];
        } else {
            this.preencherListaDeSalas();
        } // else
    } // Fim de carregarListaDeFilmes()

    carregarDados() {
        this.gerarAssentos();
        this.carregarUsuarioLogado();
        this.carregarListaDeFilmes();
        this.carregarListaDeSalas();

        this.salas = JSON.parse(localStorage.getItem("salas"));

        if (this.sessoes = JSON.parse(localStorage.getItem("sessoes"))) {
            this.listar();
        } else {
            this.sessoes = [];
            this.listar();
        } // else
    } // Fim de carregarDados()

    salvarDados() {
        localStorage.setItem("sessoes", JSON.stringify(this.sessoes));
    } // salvarDados()

    listar() { // LISTAR
        let tabela = document.querySelector("tbody")
        tabela.innerHTML = "";

        this.qtd = 0;

        if (this.sessoes.length > 0) {
            for (let i = 0; i < this.sessoes.length; i++) {
                if (this.sessoes[i]) {
                    this.qtd++;

                    let linha = tabela.insertRow();
                    let colunaFilme = linha.insertCell(0);
                    let colunaData = linha.insertCell(1);
                    let colunaInicio = linha.insertCell(2);
                    let colunaLinguagem = linha.insertCell(3);
                    let colunaSala = linha.insertCell(4);
                    let colunaImagem = linha.insertCell(5);
                    let colunaEditar = linha.insertCell(6);
                    let colunaExcluir = linha.insertCell(7);

                    colunaFilme.innerText = this.sessoes[i].filme;
                    colunaData.innerText = this.sessoes[i].data;
                    colunaInicio.innerText = this.sessoes[i].horario;
                    colunaLinguagem.innerText = this.sessoes[i].linguagem;
                    colunaSala.innerText = this.sessoes[i].sala;
                    colunaImagem.innerText = this.sessoes[i].imagem;

                    let imgExcluir = document.createElement("img");
                    imgExcluir.src = "img/excluir.svg";
                    imgExcluir.title = "Excluir";
                    imgExcluir.classList.add("icone");
                    imgExcluir.setAttribute("onclick", "sessao.excluir('" + i + "')");

                    let imgEditar = document.createElement("img");
                    imgEditar.src = "img/editar.svg";
                    imgEditar.title = "Editar";
                    imgEditar.classList.add("icone");
                    imgEditar.setAttribute("onclick", "sessao.editar('" + i + "')");

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
                    this.sessoes.push(this.sessao);
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
            this.sessoes.splice(i, 1);
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

        document.getElementById("filme").value = this.sessoes[i].filme;
        document.getElementById("sala").value = this.sessoes[i].sala;
        document.getElementById("data").value = this.sessoes[i].data;
        document.getElementById("horario").value = this.sessoes[i].horario;

        let linguagem = document.getElementsByName("linguagem");
        if (this.sessoes[i].linguagem == "Dublado") {
            linguagem[0].checked = true;
            linguagem[1].checked = false;
        } else {
            linguagem[0].checked = false;
            linguagem[1].checked = true;
        }

        let imagem = document.getElementsByName("imagem");
        if (this.sessoes[i].imagem == "2D") {
            imagem[0].checked = true;
            imagem[1].checked = false;
        } else {
            imagem[0].checked = false;
            imagem[1].checked = true;
        }

        document.getElementById("btnSalvar").innerText = "Salvar edição";
        document.getElementById("btnLimpar").innerText = "Cancelar edição";
    } // Fim de editar()

    editarRegistro() {
        if (this.idEdicao >= 0) {

            this.pegarDadosDaTela();

            if (this.msg == "") {
                if (window.confirm("Tem certeza que deseja alterar este registro ?")) {
                    this.sessoes[this.idEdicao] = this.sessao;

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

    preencherListaDeFilmes() {
        let select = document.getElementById("filme");

        for (let i = 0; i < this.filmes.length; i++) {
            let option = document.createElement("option");
            option.value = this.filmes[i].nome;
            option.innerText = this.filmes[i].nome;
            select.appendChild(option);
        } // for
    } // preencherComboDeFilmes()

    preencherListaDeSalas() {
        let select = document.getElementById("sala");

        for (let i = 0; i < this.salas.length; i++) {
            let option = document.createElement("option");
            option.value = this.salas[i].nome;
            option.innerText = this.salas[i].nome;
            select.appendChild(option);
        } // for
    } // preencherComboDeSalas()

    pegarDadosDaTela() {
        this.sessao = {};
        this.sessao.filme = document.getElementById("filme").value;
        this.sessao.sala = document.getElementById("sala").value;
        this.sessao.data = document.getElementById("data").value;
        this.sessao.horario = document.getElementById("horario").value;
        this.sessao.linguagem = "";
        this.sessao.imagem = "";
        this.sessao.cadeiras = this.cadeiras;

        let dublado = document.getElementById("dublado");
        if (dublado.checked) {
            this.sessao.linguagem = dublado.value;
        }

        let legendado = document.getElementById("legendado");
        if (legendado.checked) {
            this.sessao.linguagem = legendado.value;
        }

        let doisD = document.getElementById("2d");
        if (doisD.checked) {
            this.sessao.imagem = doisD.value;
        }

        let tresD = document.getElementById("3d")
        if (tresD.checked) {
            this.sessao.imagem = tresD.value;
        }

        this.validarDados();

        if (this.msg == "") {
            this.ocultarMensagens();
        } else {
            this.mostrarMensagens();
        } // else
    } // Fim de pegarDadosDaTela()

    validarDados() {
        this.msg = "";

        if (this.sessao.filme == "") {
            this.msg += "Filme é obrigatório \n";
        } // if

        if (this.sessao.sala == "") {
            this.msg += "Sala é obrigatória \n";
        } // if

        if (this.sessao.linguagem == "") {
            this.msg += "Linguagem é obrigatória \n";
        } // if

        if (this.sessao.imagem == "") {
            this.msg += "Imagem é obrigatória \n";
        } // if

        if (this.sessao.data == "") {
            this.msg += "Data é obrigatória \n";
        } // if

        if (this.sessao.horario == "") {
            this.msg += "Horário é obrigatório \n";
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
        console.log("teste " + document.querySelector("[name=linguagem]:checked").value);

        document.getElementById("filme").value = "";
        document.getElementById("sala").value = "";
        document.getElementById("dublado").checked = false;
        document.getElementById("legendado").checked = false;
        document.getElementById("2d").checked = false;
        document.getElementById("3d").checked = false;
        document.getElementById("data").value = "";
        document.getElementById("horario").value = "";

        this.ocultarMensagens();

        if (this.isEdicao) {
            document.getElementById("btnSalvar").innerText = "Salvar";
            document.getElementById("btnLimpar").innerText = "Limpar";

            this.isEdicao = false;
        } // if
    } // Fim de limparCampos()

} // Fim da classe principal

var sessao = new Sessoes();