class Teste {

    constructor() {
        this.id = 0;
        this.qtd = 0;
        this.testes = [];
        this.isEdicao = false;
        this.idEdicao = 0;
    }

    salvar() {
        if (this.isEdicao) { // EDITAR
            if (window.confirm("Tem certeza que deseja salvar as alterações realizadas ?")) {
                this.testes[this.idEdicao].nome = document.getElementById("nome").value;
                this.isEdicao = false;

                document.getElementById("btnSalvar").innerText = "Salvar";
                document.getElementById("btnLimpar").innerText = "Limpar";

                this.listar();
                this.limparCampos();

                window.alert("Registro alterado com sucesso");
            } else {
                window.alert("Edição cancelada com sucesso. Nenhuma alteração foi feita no registro");

                this.listar();
                this.limparCampos();
            }
        } else { // SALVAR
            if (window.confirm("Tem certeza que deseja salvar os dados informado ?")) {
                let obj = {};
                obj.id = this.id;
                obj.codigo = this.id + 1;
                obj.nome = document.getElementById("nome").value;

                this.testes.push(obj);

                this.listar();
                this.limparCampos();

                this.qtd++;
                this.id++;

                window.alert("Registro salvo com sucesso");
            } else {
                window.alert("Inclusão cancelada com sucesso. Nenhum registro foi salvo no sistema");

                this.listar();
                this.limparCampos();
            }
        }
    }

    editar(id) {
        this.isEdicao = true;
        this.idEdicao = id;
        document.getElementById("nome").value = this.testes[id].nome;

        document.getElementById("btnSalvar").innerText = "Salvar edição";
        document.getElementById("btnLimpar").innerText = "Cancelar edição";
    }

    excluir(id) { // EXCLUIR
        if (window.confirm("Tem certeza que deseja excluir este registro ?")) {
            this.testes[id] = null;
            this.qtd--;
            this.listar();

            window.alert("Registro excluído com sucesso");
        } else {
            window.alert("Exclusão cancelada com sucesso. Nenhum registro foi removido");

            this.listar();
        }
    }

    listar() { // LISTAR
        let lista = document.getElementById("lista");
        lista.innerText = "";

        for (let i = 0; i < this.testes.length; i++) {
            if (this.testes[i]) {
                let idTemp = this.testes[i].id;

                let registro = document.createElement("div");
                registro.id = idTemp;

                let nome = document.createElement("span");
                nome.innerText = this.testes[i].nome;

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
                registro.appendChild(imgExcluir);
                registro.appendChild(imgEditar);
                lista.appendChild(registro);
            }
        }
    }

    limparCampos() {
        document.getElementById("nome").value = "";

        if (this.isEdicao) {
            document.getElementById("btnSalvar").innerText = "Salvar";
            document.getElementById("btnLimpar").innerText = "Cancelar";

            this.isEdicao = false;
        }
    }
}

var teste = new Teste();