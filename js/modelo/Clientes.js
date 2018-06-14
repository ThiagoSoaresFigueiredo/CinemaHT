class Cliente {

    constructor() {
        this.id;
        this.nextId;
        this.qtd = 0;
        this.clientes;
        this.isEdicao = false;
        this.idEdicao = 0;
    } // construtor()

    carregarDados() { // Recupera os dados do DB
        let clientesCadastrados = null;
        clientesCadastrados = JSON.parse(localStorage.getItem("clientes"));

        let proximoId = localStorage.getItem("proximoId");
        let ultimoId = localStorage.getItem("ultimoId");

        if (clientesCadastrados == null) {
            this.clientes = [];
            this.id = 0;
            this.nextId = 0;
        } else {
            this.clientes = clientesCadastrados;
            this.id = proximoId;
            this.nextId = proximoId;
        }

        this.listar();
    } // carregarDados()

    salvarDados() { // Salva os dados no DB
        localStorage.setItem("ultimoId", this.id);
        localStorage.setItem("proximoId", this.nextId);
        let clientesJson = JSON.stringify(this.clientes);
        localStorage.setItem("clientes", clientesJson);
        this.listar();
    }

    salvar() { // Inclusão
        if (this.isEdicao) { // EDITAR
            if (window.confirm("Tem certeza que deseja salvar as alterações realizadas ?")) {
                this.clientes[this.idEdicao].nome = document.getElementById("nome").value;
                this.clientes[this.idEdicao].idade = document.getElementById("idade").value;
                this.clientes[this.idEdicao].email = document.getElementById("email").value;

                document.getElementById("btnSalvar").innerText = "Salvar";
                document.getElementById("btnLimpar").innerText = "Limpar";

                this.salvarDados();

                this.listar();
                this.limparCampos();

                window.alert("Cliente alterado com sucesso");
            } else {
                window.alert("Edição cancelada com sucesso. Nenhuma alteração foi feita no registro");

                this.listar();
                this.limparCampos();
            }
        } else { // SALVAR
            let nome = document.getElementById("nome").value;
            let idade = document.getElementById("idade").value;
            let email = document.getElementById("email").value;
            let msg = "";

            if (nome == "")
                msg += "Nome é obrigatório \n";

            if (idade == "")
                msg += "Idade é obrigatório\n";

            if (email == "")
                msg += "Email é obrigatório";

            if (msg == "") {
                if (window.confirm("Tem certeza que deseja salvar os dados informado ?")) {
                    this.id = this.nextId;
                    

                    let obj = {};
                    obj.id = this.id;
                    obj.codigo = "cli-" + (this.id + 1);
                    obj.nome = nome;
                    obj.idade = idade;
                    obj.email = email;

                    this.clientes.push(obj);
                    this.nextId++;

                    // Salvando no DB
                    this.salvarDados();

                    this.listar();
                    this.limparCampos();
                    document.getElementById("mensagem").classList.remove("mostrarMsg");
                    window.alert("Cliente salvo com sucesso!");
                } else {
                    window.alert("Inclusão cancelada com sucesso. Nenhum cliente foi salvo no sistema");

                    this.listar();
                    this.limparCampos();
                }
            } else {
                let divMensagem = document.getElementById("textoDaMensagem");
                divMensagem.innerText = msg;
                document.getElementById("mensagem").classList.add("mostrarMsg");
            }
        } //else
    } // salvar()

    editar(id) {
        this.isEdicao = true;
        this.idEdicao = id;

        document.getElementById("nome").value = this.clientes[id].nome;
        document.getElementById("idade").value = this.clientes[id].idade;
        document.getElementById("email").value = this.clientes[id].email;

        document.getElementById("btnSalvar").innerText = "Salvar edição";
        document.getElementById("btnLimpar").innerText = "Cancelar edição";
    }

    excluir(id) {
        if (window.confirm("Tem certeza que deseja excluir este cliente ?")) {
            this.clientes.splice(id, 1);
            this.qtd--;
            this.salvarDados()
            this.listar();
            window.alert("Cliente excluído com sucesso");
        } else {
            window.alert("Exclusão cancelada com sucesso. Nenhum cliente foi removido");

            this.listar();
        }
    }

    listar() {
        let tabela = document.querySelector("tbody");
        tabela.innerHTML = "";

        this.qtd = 0;

        for (let i = 0; i < this.clientes.length; i++) {
            if (this.clientes[i]) {
                this.qtd++;

                let linha = tabela.insertRow();
                let colunaNome = linha.insertCell(0);
                let colunaIdade = linha.insertCell(1);
                let colunaEmail = linha.insertCell(2);
                let colunaEditar = linha.insertCell(3);
                let colunaExcluir = linha.insertCell(4);

                if(i%2 == 0) 
                    linha.classList.add("corSim");

                colunaNome.innerText = this.clientes[i].nome;
                colunaIdade.innerText = this.clientes[i].idade;
                colunaEmail.innerText = this.clientes[i].email;

                let imgExcluir = document.createElement("img");
                imgExcluir.src = "img/excluir.svg";
                imgExcluir.title = "Excluir";
                imgExcluir.classList.add("icone");
                imgExcluir.setAttribute("onclick", "cliente.excluir('" + i + "')");

                let imgEditar = document.createElement("img");
                imgEditar.src = "img/editar.svg";
                imgEditar.title = "Editar";
                imgEditar.classList.add("icone");
                imgEditar.setAttribute("onclick", "cliente.editar('" + i + "')");

                colunaEditar.appendChild(imgEditar);
                colunaExcluir.appendChild(imgExcluir);

                document.getElementById("qtde").innerHTML = "(<i>" + this.qtd + "</i>)";
            }
        }
    }

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