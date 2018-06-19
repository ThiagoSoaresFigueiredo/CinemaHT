class Login {

    constructor() {
        this.listaDeRegistros = [];
        this.login = {};
        this.msg = "";
    } // construtor

    carregarDados() {
        this.listaDeRegistros = JSON.parse(localStorage.getItem("registros"));
    } // carregarDados()

    verificarLogin() {
        this.lerDados();

        console.log(this.msg)
        if (this.msg == "") {
            let nomeDoUsuario = "";
            let senhaDoUsuario = "";
            let loginValido = {};

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
            }
        }
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
} // classe principal

var login = new Login();