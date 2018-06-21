class RecuperarSenha {

    constructor() {
        this.registros = [];
        this.msg = "";
        this.email = "";
        this.senha = "";
    } // Fim de construtor

    carregarDados() {
        this.registros = JSON.parse(localStorage.getItem("registros"));
    } // carregarDados()

    recuperar() { // AÇÃO DO BOTÃO
        this.fecharSenha();

        if (this.lerDados()) {
            if (this.verificarEmail()) {
                if (window.confirm("Tem certeza que deseja visualizar na tela a senha deste usuário ?")) {
                    this.exibirSenha();
                } else {
                    this.limparCampos();
                } // else
            } // if
        } // if
    } // recuperar()

    exibirSenha() {
        let textoDaSenha = document.getElementById("textoDaSenha");
        textoDaSenha.innerText = this.senha;
        document.getElementById("exibirSenha").classList.remove("ocultarCampoSenha");
    } // exibirSenha()

    verificarEmail() {
        for (let i = 0; i < this.registros.length; i++) {
            if (this.registros[i].email == this.email) {
                this.senha = this.registros[i].senha;
                return true;
            } // if
        } // for

        this.msg = "Email inexistente ou inválido";
        this.temMensagens();
        return false;
    } // verificarEmail()

    lerDados() {
        let email = document.getElementById("email").value;
        this.email = email;

        if (this.verificarDados(this.email)) {
            return true;
        } else {
            return false;
        } // else
    } // lerDados()

    verificarDados(email) {
        this.msg = "";

        if (email == "") {
            this.msg = "Email deve ser preenchido";
        } // if

        if (this.temMensagens()) {
            return false;
        } else {
            return true;
        } // else
    } // verificarDados()

    temMensagens() {
        if (this.msg == "") {
            this.ocultarMsg();
            return false;
        } else {
            this.mostrarMsg();
            return true;
        } // else
    } // verificarMensagens()

    mostrarMsg() {
        let divMensagem = document.getElementById("textoDaMensagem");
        divMensagem.innerText = this.msg;
        document.getElementById("mensagem").classList.add("mostrarMsg");
    } // mostrarMsg()

    ocultarMsg() {
        document.getElementById("textoDaMensagem").innerHTML = "";
        document.getElementById("textoDaMensagem").innerText = "";
        this.msg = "";
        document.getElementById("mensagem").classList.remove("mostrarMsg");
        document.getElementById("exibirSenha").classList.remove("mostrarCampoSenha");
    } // ocultarMsg()

    limparCampos() {
        document.getElementById("email").value = "";

        this.msg = "";
        this.mostrarMsg();
    } // limaprCampos()

    fecharSenha() {
        document.getElementById("exibirSenha").classList.add("ocultarCampoSenha");
    } // fecharSenha()

} // Fim da classe

var recuperarSenha = new RecuperarSenha();