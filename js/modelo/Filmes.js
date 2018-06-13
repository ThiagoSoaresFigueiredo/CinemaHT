class Filme {

    constructor() {
        this.id;
        this.proximoId;
        this.qtde = 0;
        this.filmes;
        this.isEdicao = false;
        this.idEdicao = 0;
    } // construtor()



    // REPOSITORY
    carregarDados() {
        let filmesCadastrados = null;
        filmesCadastrados = JSON.parse(localStorage.getItem("filmes"));

        let proximoId = localStorage.getItem("proximoId");
        let ultimoId = localStorage.getItem("ultimoId");

        if (filmesCadastrados == null) {
            this.filmes = [];
            this.id = 0;
            this.proximoId = 0;
        } else {
            this.filmes = filmesCadastrados;
            this.id = proximoId;
            this.proximoId = proximoId;
        } // else

        this.listar();
    } // carregarDados()

    salvarDados() {
        localStorage.setItem("ultimoId", this.id);
        localStorage.setItem("proximoId", this.proximoId);

        let FilmeJson = JSON.stringify(this.filmes);
        localStorage.setItem("filmes", FilmeJson);
    } // salvarDados()



    // CRUD (CONTROLLER E SERVICE)

    salvar() {
        if (this.isEdicao) { // EDITAR
            if (window.confirm("Tem certeza que deseja salvar as alterações realizadas ?")) {
                this.filmes[this.idEdicao].nome = document.getElementById("nome").value;
                this.filmes[this.idEdicao].duracao = document.getElementById("duracao").value;
                this.filmes[this.idEdicao].classificacao = document.getElementById("classificacao").value;
                this.filmes[this.idEdicao].genero = document.getElementById("genero").value;
                this.filmes[this.idEdicao].sinopse = document.getElementById("sinopse").value;

                document.getElementById("btnSalvar").innerText = "Salvar";
                document.getElementById("btnLimpar").innerText = "Limpar";

                this.salvarDados();

                this.listar();
                this.limparCampos();

                window.alert("Filme alterado com sucesso");
            }
        } else { // SALVAR
            let nome = document.getElementById("nome").value;
            let duracao = document.getElementById("duracao").value;
            let classificacao = document.getElementById("classificacao").value;
            let genero = document.getElementById("genero").value;
            let sinopse = document.getElementById("sinopse").value;
            let msg = "";

            if (nome == "")
                msg += "Nome é obrigatório";

            if (duracao == "")
                msg += "Email é obrigatório";

            if (classificacao == "")
                msg += "Classificação é obrigatória";

            if (genero == "")
                msg += "Gênero é obrigatório";

            if (sinopse == "")
                msg += "Sinopse é obrigatória";

            if (window.confirm("Tem certeza que deseja salvar os dados informados ?")) {
                this.id = this.proximoId;

                let obj = {};
                obj.id = this.id;
                obj.codigo = "fil-" + (this.id + 1);
                obj.nome = nome;
                obj.duracao = duracao;
                obj.classificacao = classificacao;
                obj.genero = genero;
                obj.sinopse = sinopse;

                this.filmes.push(obj);
                this.proximoId++;
                this.salvarDados();
                this.listar();
                this.limparCampos();
            } // if
        } // else
    } // salvar()

    listar() {
        let tabela = document.querySelector("tbody");
        tabela.innerHTML = "";
        document.getElementById("mensagem").classList.remove("mostrar");

        for (let i = 0; i < this.filmes.length; i++) {
            this.qtde++;

            let linha = tabela.insertRow();
            let colunaNome = linha.insertCell(0);
            let colunaDuracao = linha.insertCell(1);
            let colunaEditar = linha.insertCell(2);
            let colunaExcluir = linha.insertCell(3);

            colunaNome.innerText = this.filmes[i].nome;
            colunaDuracao.innerText = this.filmes[i].duracao;

            let imgExcluir = document.createElement("img");
            imgExcluir.src = "img/excluir.svg";
            imgExcluir.title = "Excluir";
            imgExcluir.classList.add("icone");
            imgExcluir.setAttribute("onclick", "filme.excluir('" + i + "')");

            let imgEditar = document.createElement("img");
            imgEditar.src = "img/editar.svg";
            imgEditar.title = "Editar";
            imgEditar.classList.add("icone");
            imgEditar.setAttribute("onclick", "filme.editar('" + i + "')");

            colunaEditar.appendChild(imgEditar);
            colunaExcluir.appendChild(imgExcluir);
        }
    }

    editar(id) {
        this.isEdicao = true;
        this.idEdicao = id;

        document.getElementById("nome").value = this.filmes[id].nome;
        document.getElementById("duracao").value = this.filmes[id].duracao;
        document.getElementById("classificacao").value = this.filmes[id].classificacao;
        document.getElementById("genero").value = this.filmes[id].genero;
        document.getElementById("sinopse").value = this.filmes[id].sinopse;

        document.getElementById("btnSalvar").innerText = "Salvar edição";
        document.getElementById("btnLimpar").innerText = "Cancelar edição";
    } // editar()

    excluir(id) {
        if (window.confirm("Tem certeza que deseja excluir este filme ?")) {
            this.filmes.splice(id, 1);
            this.qtde--;
            this.salvarDados();
            this.listar();
            window.alert("Filme excluído com sucesso");
        } else {
            window.alert("A exclusão foi cancelada com sucesso. Nenhum filme foi excluído");

            this.listar();
        }
    } // excluir()

    limparCampos() {
        document.getElementById("nome").value = "";
        document.getElementById("duracao").value = "";
        document.getElementById("classificacao").value = "";
        document.getElementById("genero").value = "";
        document.getElementById("sinopse").value = "";

        if (this.isEdicao) {
            document.getElementById("btnSalvar").innerText = "Salvar";
            document.getElementById("btnLimpar").innerText = "Limpar";
        } // if
    } // limparCampos()
} // Fim da classe

var filme = new Filme();