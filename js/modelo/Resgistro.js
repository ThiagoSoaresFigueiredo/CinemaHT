class Resgistro {

    constructor() {
        this.registros = [];
        this.qtd;
        this.isEdicao = false;
        this.idEdicao;
    } // costrutor()

    carregarDados() {
        let listaDeRegistros = null;
        listaDeRegistros = JSON.parse(localStorage.getItem("registros"));

        if (listaDeRegistros) {
            this.registros = listaDeRegistros;
        }
    } // carregarDados()

    salvarDados() {
        let registrosJson = JSON.stringify(this.registros);
        localStorage.setItem("registros", registrosJson);
    } // salvarDados()

    salvar() { // SALVAR
        if (this.isEdicao) {
            this.editar();
        } else {
            let nome = document.getElementById("nome").value;
            let email = document.getElementById("email").value;
            let usuario = document.getElementById("usuario").value;
            let senha = document.getElementById("senha").value;
            let resenha = document.getElementById("resenha").value;
            let msg = "";

            if (nome == "")
                msg += "Nome é obrigatório\n";

            if (email == "")
                msg += "Email é obrigatório\n";

            if (usuario == "")
                msg += "Usuário é obrigatório\n";

            if (senha == "")
                msg += "Senha é obrigatória\n";

            if (resenha == "")
                msg += "Confirmar a senha é obrigatório\n";

            if (msg == "") {
                if (window.confirm("Tem certeza que deseja salvar os dados informado ?")) {
                    let registro = {};
                    registro.nome = nome;
                    registro.email = email;
                    registro.usuario = usuario;
                    registro.senha = senha;

                    this.registros.push(registro);
                    this.salvarDados();
                    this.limparCampos();

                    window.alert("Usuário cadastrado com sucesso");
                    window.location.href = "login.html";
                }
            } else {
                let divMensagem = document.getElementById("textoDaMensagem");
                divMensagem.innerText = msg;
                document.getElementById("mensagem").classList.add("mostrarMsg");
            }
        }
    } // salvar()

    editar() {

    } // editar()

    limparCampos() {
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
        document.getElementById("usuario").value = "";
        document.getElementById("senha").value = "";
        document.getElementById("resenha").value = "";
    }
} // Fim da classe

var registro = new Resgistro();