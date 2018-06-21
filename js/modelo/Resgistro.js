class Resgistro {

    constructor() {
        this.registros = [];
        this.registro = {};
        this.msg = "";
    } // costrutor()

    carregarDados() {
        let listaDeRegistros = null;
        listaDeRegistros = JSON.parse(localStorage.getItem("registros"));

        if (listaDeRegistros) {
            this.registros = listaDeRegistros;
        } // if
    } // carregarDados()

    salvarDados() {
        localStorage.setItem("registros", JSON.stringify(this.registros));
    } // salvarDados()

    lerDados() {
        let nome = document.getElementById("nome").value;
        let email = document.getElementById("email").value;
        let usuario = document.getElementById("usuario").value;
        let senha = document.getElementById("senha").value;
        let resenha = document.getElementById("resenha").value;

        this.registro.nome = nome;
        this.registro.email = email;
        this.registro.usuario = usuario;
        this.registro.senha = senha;
        this.registro.resenha = resenha;

        if (this.validarDados(this.registro)) {
            return true;
        } else {
            return false;
        }
    }

    validarDados(registro) {
        this.msg = "";

        if (registro.nome == "")
            this.msg += "Nome é obrigatório \n";

        if (registro.email == "")
            this.msg += "Email é obrigatório \n";

        if (registro.usuario == "")
            this.msg += "Usuário é obrigatório \n";

        if (registro.senha == "")
            this.msg += "Senha é obrigatória \n";

        if (registro.resenha == "")
            this.msg += "Confirmar a senha é obrigatório \n";

        if (this.temMensagens()) {
            return false;
        } else {
            return true;
        }
    } // Fim de validarDados()

    temMensagens() {
        if (this.msg == "") {
            this.ocultarMsg();
            return false;
        } else {
            this.mostrarMsg();
            return true;
        }
    } // Fim de validarMensagens()

    salvar() { // SALVAR
        if (this.lerDados()) {
            if (this.verificarEmail()) {
                if (this.verficarSenha()) {
                    if (window.confirm("Tem certeza que deseja salvar os dados informados ?")) {
                        this.salvarDados();
                        this.limparCampos();
                    } // if
                } // if
            } // if
        } else {
            this.temMensagens();
        } // else
    } // salvar()

    verificarEmail() {
        this.msg = "";

        for (let i = 0; i < this.registros.length; i++) {
            if (document.getElementById("email").value == this.registros[i].email) {
                this.msg = "Email informado já cadastrado \n";
                this.temMensagens();
                return false;
            } // if
        } // for

        return true;
    } // Fim de verificarEmail()

    verficarSenha() {
        this.msg = "";

        if (document.getElementById("senha").value == document.getElementById("resenha").value) {
            this.temMensagens();
            return true;
        } else {
            this.msg += "Senha e confirmação de senha devem ser iguais";
            this.mostrarMsg();
            return false;
        } // else
    } // Fim de verficarSenha()

    mostrarMsg() {
        let divMensagem = document.getElementById("textoDaMensagem");
        divMensagem.innerText = this.msg;
        document.getElementById("mensagem").classList.add("mostrarMsg");
    } // Fim de mostrarMsg()

    ocultarMsg() {
        document.getElementById("textoDaMensagem").innerHTML = "";
        document.getElementById("textoDaMensagem").innerText = "";
        this.msg = "";
        document.getElementById("mensagem").classList.remove("mostrarMsg");
    } // Fim de ocultarMsg()

    limparCampos() {
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
        document.getElementById("usuario").value = "";
        document.getElementById("senha").value = "";
        document.getElementById("resenha").value = "";

        this.registro = {};
        this.msg = "";
        this.mostrarMsg();
    }

    contarRegistros() {
        let qtd = 0;

        for (let i = 0; i < this.registros.length; i++) {
            qtd++;
        } // for

        return qtd;
    } // Fim de contarRegistros()
} // Fim da classe

var registro = new Resgistro();