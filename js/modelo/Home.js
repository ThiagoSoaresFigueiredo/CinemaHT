class Home {

    constructor() {
        this.usuario = "";
    } // construtor()

    carregarUsuarioLogado() {
        let usuario = JSON.parse(localStorage.getItem("usuario"));
        this.usuario = usuario.usuario;

    } // Fim de carregarUsuarioLogado()
    
    buscarDados() {
        this.carregarUsuarioLogado();        
        this.montarTela();
    } // buscarDados()
    
    montarTela() {
        if (usuarioLogado == null) {
            document.getElementById("usuarioLogado").innerHTML = "Usuário:<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b> Seja bem-vindo ao Sistema Cinema HT </b>"
        } else {
            document.getElementById("usuarioLogado").innerHTML = "Usuário:<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b>" + usuarioLogado + "</b>"
        } // else
    } // montarTela()
} // Fim da classe

var home = new Home();