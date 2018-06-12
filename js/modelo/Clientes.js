class Cliente {

    constructor() {
        this.id = 0;
        this.idEditar = 0;
        this.qtd = 0;
        this.clientes = [];
        this.isEdicao = false;
    }

    salvar() {
        if (this.isEdicao) { //Verificar se é uma edição de registro e faz atualização
            document.getElementById(this.idEditar).childNodes[0].innerText = document.getElementById("nomeC").value;
            document.getElementById(this.idEditar).childNodes[1].innerText = document.getElementById("idadeC").value;
            document.getElementById(this.idEditar).childNodes[2].innerText = document.getElementById("emailC").value;

            document.getElementById("btnSalvar").innerText = "Salvar";
            document.getElementById("btnLimpar").innerText = "Limpar";

            this.isEdicao = false;

            window.alert("Cliente alterado com sucesso");

            this.limpar();
        } else { //Se não for uma edição de registro faz a inclusão de um novo
            this.id++;

            let nome = document.getElementById("nomeC").value;
            let idade = document.getElementById("idadeC").value;
            let email = document.getElementById("emailC").value;

            let msgmValidacao = "";

            if (nome == "" || nome == null || nome == undefined) {
                msgmValidacao += "Nome deve ser preenchido \n"
            }

            if (idade == "" || idade == null || idade == undefined) {
                msgmValidacao += "Idade deve ser preenchida \n"
            }

            if (email == "" || email == null || email == undefined) {
                msgmValidacao += "Email deve ser preenchido \n"
            }

            if (msgmValidacao == "") {
                let c = {
                    id: this.id,
                    nome: nome,
                    idade: parseInt(idade),
                    email: email
                };

                this.clientes.push(c);
                this.qtd++;
                this.atualizarQtde();
                this.montarLista();
                window.alert("Cliente salvo com sucesso");
                document.getElementById("mensagem").classList.remove("mostrar");
                this.limpar();
            } else {
                document.getElementById("mensagem").innerText = msgmValidacao;
                document.getElementById("mensagem").classList.add("mostrar");
                window.alert("Existem campos que não foram preenchidos");
            }
        } // else
    } //salvar()

    montarLista() {
        let divLista = document.getElementById("lista");
        let div = document.createElement("div");
        let spanNome = document.createElement("span");
        let spanIdade = document.createElement("span");
        let spanEmail = document.createElement("span");
        let imgExcluir = document.createElement("img");
        let imgEditar = document.createElement("img");

        div.innerText = "";
        div.id = this.id;

        imgExcluir.src = "img/excluir.svg";
        imgExcluir.title = "Excluir";
        imgExcluir.classList.add("icone");
        imgExcluir.setAttribute("onclick", "cli.excluir('" + div.id + "')");

        imgEditar.src = "img/editar.svg";
        imgEditar.title = "Editar";
        imgEditar.classList.add("icone");
    imgEditar.setAttribute("onclick", "cli.editar('" + div. id + "')");

        for (let i = 0; i < this.clientes.length; i++) {
            spanNome.innerText = "";
            spanIdade.innerText = "";
            spanEmail.innerText = "";

            spanNome.innerText = this.clientes[i].nome;
            spanIdade.innerText = this.clientes[i].idade;
            spanEmail.innerText = this.clientes[i].email;

            div.appendChild(spanNome);
            div.appendChild(spanIdade);
            div.appendChild(spanEmail);
            div.appendChild(imgExcluir);
            div.appendChild(imgEditar);

            divLista.appendChild(div);
        }
    } // montarLista()

    limpar() {
        document.getElementById("nomeC").value = "";
        document.getElementById("idadeC").value = "";
        document.getElementById("emailC").value = "";

        if (this.isEdicao) {
            document.getElementById("btnSalvar").innerText = "Salvar"
            document.getElementById("btnLimpar").innerText = "Limpar";

            this.isEdicao = false;
        }
    } // limpar()

    excluir(id) {
        let cliExcluir = document.getElementById(id).childNodes[0];
        let msgmDeExclusao = "Deseja excluir o seguite cliente: " + id + " - " + cliExcluir.innerText + " ?";

        if (window.confirm(msgmDeExclusao)) {
        let c = document.getElementById(id);
        let lista = document.getElementById("lista");
        lista.removeChild(c);

            this.qtd--;

            this.atualizarQtde();

            window.alert("Cliente excluído com sucesso");
        }
    } // excluir()

    editar(id) {
        document.getElementById("nomeC").value = document.getElementById(id).childNodes[0].innerText;
        document.getElementById("idadeC").value = document.getElementById(id).childNodes[1].innerText;
        document.getElementById("emailC").value = document.getElementById(id).childNodes[2].innerText;

        this.isEdicao = true;

        this.idEditar = id;

        document.getElementById("btnSalvar").innerText = "Salvar edição";
        document.getElementById("btnLimpar").innerText = "Cancelar edição";
    } // editar()

    atualizarQtde() {
        let qtde = document.getElementById("qtde");
        qtde.innerText = "(" + this.qtd + ")";
    } // atualizarQtde()
} //Fim da classe

var cli = new Cliente();