class Login {

    constructor() {
        this.listaDeRegistros = [];
        this.login = {};
        this.msg = "";

    } // construtor

    carregarDados() {
        this.listaDeRegistros = JSON.parse(localStorage.getItem("registros"));

        this.hasUsuarios(); // Verifica registros do localStorage
    } // carregarDados()

    hasUsuarios() {
        if(this.listaDeRegistros == null) {
            this.msg = "ATENÇÃO: não existe usuário cadastrado no sistema. \n Cadastre um novo ou " +
                "entre com o Usuário: teste e Senha: teste para logar no sistema";
            this.mostrarMensagensDeErros();
        } else {
            this.msg = "";
            this.ocultarMensagensDeErros();
        }
    }

    logar() {
        this.lerDados();

        if (this.msg == "") {
            let nomeDoUsuario = "";
            let senhaDoUsuario = "";
            let loginValido = {};

            if (this.listaDeRegistros != null) {
                for (let i = 0; i < this.listaDeRegistros.length; i++) {
                    if (this.listaDeRegistros[i].usuario == this.login.usuario) {
                        nomeDoUsuario = this.listaDeRegistros[i].usuario;
                        loginValido.usuario = nomeDoUsuario;
                    }

                    if (this.listaDeRegistros[i].senha == this.login.senha)
                        senhaDoUsuario = this.listaDeRegistros[i].senha;
                } // for

                if (nomeDoUsuario == "" || senhaDoUsuario == "") {
                    if (nomeDoUsuario == "" && senhaDoUsuario == "") {
                        this.msg += "Usuário e senha inválidos \n";
                    } else {
                        if (nomeDoUsuario == "")
                            this.msg += "Usuário inválido \n";

                        if (senhaDoUsuario == "")
                            this.msg += "Senha inválida \n";
                    }

                    this.mostrarMensagensDeErros();
                } else {
                    this.armazenarUsuarioLogado(loginValido);
                    window.location.href = "home.html";
                } // else
            } else {
                
            }
        } // if
    } // verificarLogin()

    lerDados() {
        this.msg = "";

        let usuario = document.getElementById("usuario").value;
        let senha = document.getElementById("senha").value;

        if (usuario == "")
            this.msg += "Usuário deve ser preenchido \n";

        if (senha == "")
            this.msg += "Senha deve ser preenchida \n";

        if (this.msg == "") {
            this.login.usuario = usuario;
            this.login.senha = senha;
        } else {
            this.mostrarMensagensDeErros();
        }
    } // lerDados()

    armazenarUsuarioLogado(loginValido) {
        localStorage.setItem("usuario", JSON.stringify(loginValido));
    } // armazenarUsuarioLogado()

    mostrarMensagensDeErros() {
        let divMensagem = document.getElementById("textoDaMensagem");
        divMensagem.innerText = this.msg;
        document.getElementById("mensagem").classList.add("mostrarMsg");
    }

    ocultarMensagensDeErros() {
        let divMensagem = document.getElementById("textoDaMensagem");
        divMensagem.innerText = this.msg;
        document.getElementById("mensagem").classList.add("ocultarMsg");
    }
} // classe principal

var login = new Login();