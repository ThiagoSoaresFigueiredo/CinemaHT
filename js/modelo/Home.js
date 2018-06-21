class Home {

    constructor() {
        this.usuario = {};
    } // construtor()

    carregarUsuarioLogado() {
        this.usuario = JSON.parse(localStorage.getItem("usuario"));

        if (this.usuario == null) {
            window.location.href = "login.html";
        } // if
    } // Fim de carregarUsuarioLogado()

    buscarDados() {
        this.carregarUsuarioLogado();
        this.montarTela();
    } // buscarDados()

    montarTela() {
        let telaBoasVindas = document.getElementById("tela");
        if (telaBoasVindas != null) {
            telaBoasVindas.innerHTML = "Olá " + this.usuario.usuario + ", seja bem vindo(a).";
        }
        document.getElementById("usuarioLogado").innerHTML = "Usuário:<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b>" + this.usuario.usuario + "</b>";
    } // montarTela()

    logOut() {
        if (window.confirm("Sair do sistema ?")) {
            localStorage.removeItem("usuario");
            window.location.href = "login.html";
        }
    } // logOut()
} // Fim da classe

var home = new Home();