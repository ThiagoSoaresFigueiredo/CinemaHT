class Cliente {

    constructor() {
        this.id = 0;
        this.qtd = 0;
        this.clientes = [];
        this.isEdicao = false;
        this.idEdicao = 0;
    } // construtor()

    salvar() {
        let nome = document.getElementById("nome").value;
        let idade = document.getElementById("idade").value;
        let email = document.getElementById("email").value;
        let msg = "";

        if (nome == "")
            msg += "Nome é obrigatório \n";

        if (idade == "")
            msg += "Idade é obrigatória\n";

        if (email == "")
            msg += "Email é obrigatório";

        let obj = {};
        obj.id = this.id;
        obj.codigo = "cli-" + (this.id + 1);
        obj.nome = nome;
        obj.idade = idade;
        obj.email = email;

        this.clientes.push(obj);

        this.listar();
        this.limparCampos();
        this.id++;
        document.getElementById("mensagem").classList.remove("mostrar");
        window.alert("Cliente salvo com sucesso!");
    } // salvar()

    editar(id) {

    } // editar()

    excluir(id) {

    } // excluir()

    listar() {
        let lista = document.getElementById("lista");
        lista.innerText = "";

        this.qtd = 0;

        for (let i = 0; i < this.clientes.length; i++) {
            if (this.clientes[i]) {
                this.qtd++;

                let idTemp = this.clientes[i].id;

                let registro = document.createElement("div");
                registro.id = idTemp;
                console.log(this.clientes[i].id)
                console.log(registro.id)

                let nome = document.createElement("span");
                nome.innerText = this.clientes[i].nome;
                console.log(this.clientes[i].nome)

                let idade = document.createElement("span");
                idade.innerText = this.clientes[i].idade;
                console.log(this.clientes[i].idade)

                let email = document.createElement("span");
                email.innerText = this.clientes[i].email;
                console.log(this.clientes[i].email)

                let imgExcluir = document.createElement("img");
                imgExcluir.src = "img/excluir.svg";
                imgExcluir.title = "Excluir";
                imgExcluir.classList.add("icone");
                imgExcluir.setAttribute("onclick", "teste.excluir('" + registro.id + "')");

                let imgEditar = document.createElement("img");
                imgEditar.src = "img/editar.svg";
                imgEditar.title = "Editar";
                imgEditar.classList.add("icone");
                imgEditar.setAttribute("onclick", "teste.editar('" + registro.id + "')");

                registro.appendChild(nome);
                registro.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;";
                registro.appendChild(idade);
                registro.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;";
                registro.appendChild(email);
                registro.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;";
                registro.appendChild(imgExcluir);
                registro.appendChild(imgEditar);
                lista.appendChild(registro);
            } // if
        } // for

        document.getElementById("qtde").innerText = this.qtd;
    } // listar

    limparCampos() {
        document.getElementById("nome").value = "";
        document.getElementById("idade").value = "";
        document.getElementById("email").value = "";

        if (this.isEdicao) {
            document.getElementById("btnSalvar").innerText = "Salvar";
            document.getElementById("btnLimpar").innerText = "Limpar";

            this.isEdicao = false;
        }
    } // limparCampos()
} // Fim da classe

var cliente = new Cliente();