class Filmes {

    constructor() {
        this.id = 0;
        this.qtd = 0;
        this.idEditar = 0;
        this.isEdicao = false;
        this.filmes = []
    } // construtor

    salvar() {
        if (this.isEdicao) {
            this.isEdicao = false;
            this.filmes[this.idEditar].nome = document.getElementById("nome").value;

            document.getElementById("btnSalvar").innerText = "Salvar";
            document.getElementById("btnLimpar").innerText = "Limpar";


            this.montarLista();

            window.alert("Filme alterado com sucesso");

            this.limpar();
        } else {
            let nome = document.getElementById("nome").value;
            let duracao = document.getElementById("duracao").value;
            let classificacao = document.getElementById("classificacao").value;
            let genero = document.getElementById("genero").value;
            let sinopse = document.getElementById("sinopse").value;

            let msgValidacao = "";

            if (nome == "")
                msgValidacao += "Nome deve ser informado";

            if (duracao == "")
                msgValidacao += "Duração deve ser informada";

            if (classificacao == "")
                msgValidacao += "Classificação deve ser informada";

            if (genero == "")
                msgValidacao += "Gênero deve ser informado";

            if (sinopse == "")
                msgValidacao += "Sinopse deve ser informada";

            let f = {
                id: (this.id + 1),
                nome: nome,
                duracao: duracao,
                classificacao: classificacao,
                genero: genero,
                sinopse: sinopse
            };

            this.filmes.push(f);
            this.qtd++;
            this.atualizarQtd();
            this.montarLista();
            this.id++;
            this.limpar();
            window.alert("Filme salvo com sucesso");
        }
    } // salvar()

    montarLista() {

        let lista = document.getElementById("lista");
        let div = document.createElement("div");
        let spanNome = document.createElement("span");
        let spanDuracao = document.createElement("span");
        let imgExcluir = document.createElement("img");
        let imgEditar = document.createElement("img");

        if (this.isEdicao) {
            div.id = this.idEditar;
        }
        
        lista.innerText = "";

        div.innerText = "";
        div.id = this.id;

        imgExcluir.src = "img/excluir.svg";
        imgExcluir.title = "Excluir";
        imgExcluir.classList.add("icone");
        imgExcluir.setAttribute("onclick", "filme.excluir('" + div.id + "')");

        imgEditar.src = "img/editar.svg";
        imgEditar.title = "Editar";
        imgEditar.classList.add("icone");
        imgEditar.setAttribute("onclick", "filme.editar('" + div.id + "')");

        for (let i = 0; i < this.filmes.length; i++) {

            spanNome.innerText = this.filmes[i].nome;
            spanDuracao.innerText = this.filmes[i].duracao;

            div.appendChild(spanNome);
            div.appendChild(spanDuracao);
            div.appendChild(imgExcluir);
            div.appendChild(imgEditar);

            lista.appendChild(div);
        }
    } // montarLista()

    editar(indice) {
        this.isEdicao = true;
        this.idEditar = indice;
        
        console.log(indice);
        document.getElementById("nome").value = this.filmes[indice].nome;
        document.getElementById("duracao").value = this.filmes[indice].duracao;
        document.getElementById("classificacao").value = this.filmes[indice].classificacao;
        document.getElementById("genero").value = this.filmes[indice].genero;
        document.getElementById("sinopse").value = this.filmes[indice].sinopse;


        document.getElementById("btnSalvar").innerText = "Salvar edição";
        document.getElementById("btnLimpar").innerText = "Cancelar edição";
    } // editar()

    excluir(id) {
        let msgmDeExclusao = "Deseja excluir o seguite filme: "
            + this.filmes[id].id
            + " - "
            + this.filmes[id].nome
            + " ?";

        if (window.confirm(msgmDeExclusao)) {
            document.getElementById("lista").removeChild(document.getElementById(id));
            this.qtd--;
            this.atualizarQtd();
            this.limpar();
            window.alert("Filme excluído com sucesso");
        }
    } // excluir()

    atualizarQtd() {
        let qtde = document.getElementById("qtde");
        qtde.innerText = "(" + this.qtd + ")";
    } // atualizarQtd()

    limpar() {
        document.getElementById("nome").value = "";
        document.getElementById("duracao").value = "";
        document.getElementById("classificacao").value = "";
        document.getElementById("genero").value = "";
        document.getElementById("sinopse").value = "";

        if (this.isEdicao) {
            document.getElementById("btnSalvar").innerText = "Salvar"
            document.getElementById("btnLimpar").innerText = "Limpar";

            this.isEdicao = false;
        }
    } // limpar()
}

let filme = new Filmes();