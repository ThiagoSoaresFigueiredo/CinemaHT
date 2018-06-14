class Sala {

    constructor() {
        this.id;
        this.salas = [];
        this.proximoId;
        this.ultimoId;
        this.qtde = 0;
        this.isEdicao = false;
        this.idEdicao = 0;
    } // construtor

    carregarDados() {
        let salasCadastradas = null;
        salasCadastradas = JSON.parse(localStorage.getItem("salas"));

        let proximoId = localStorage.getItem("proximoId");
        let ultimoId = localStorage.getItem("ultimoId");

        if (salasCadastradas == null) {
            this.salas = [];
            this.id = 0;
            this.proximoId = 0;
        } else {
            this.salas = salasCadastradas;
            this.id = proximoId;
            this.proximoId = proximoId;
        } // else
    } // carregarDados()

    salvarDados() {
        localStorage.setItem("ultimoId", this.id);
        localStorage.setItem("proximoId", this.proximoId);

        let salaJson = JSON.stringify(this.salas);
        localStorage.setItem("salas", salaJson);
    } // salvarDados()

    salvar() {
        if (window.confirm("Tem certeza que deseja criar uma nova sala ?")) {
            this.id = this.proximoId;

            let fileiras = [];

            for (let l = 0; l < 6; l++) {
                let cadeiras = [];
                for (let c = 0; c < 10; c++) {
                    cadeiras[c] = true;
                }
                fileiras[l] = cadeiras;
            }

            let sala = {};
            sala.id = this.id;
            sala.nome = "sala-0" + this.id;
            sala.fileiras = fileiras;

            this.salas.push(sala);

            this.qtde++;

            this.listar();

            window.alert("Nova sala criada com sucesso");
        } else {
            window.alert("A criação da sala foi cancelada. Nada foi gerado");
        }
    } // salvar()

    listar() {
        let tabela = document.getElementById("tbody");
        tabela.innerHTML = "";

        for(let i = 0; i < this.salas.length; i++) {
            let linha = tabela.insertRow();
            let colunaNome = linha.insertCell(0);
            let colunaExcluir = linha.insertCell(1);

            colunaNome.innerText = this.salas[i].nome;

            let imgExcluir = document.createElement("img");
            imgExcluir.src = "img/excluir.svg";
            imgExcluir.title = "Excluir";
            imgExcluir.classList.add("icone");
            imgExcluir.setAttribute("onclick", "sala.excluir('" + i + "')");

            colunaExcluir.appendChild(imgExcluir);
        } // for
    } // listar()

    montarCadeiras() {
        let tabela = document.querySelector("tbody");
        tabela.innerHTML = "";

        let img = document.createElement("img");
        img.src = "img/poltrona-livre.svg";
        img.classList.add("icone");

        let nomeDasFileiras = ["A", "B", "C", "D", "E", "F"];

        for (let l = 0; l < 6; l++) {

            let fileira = tabela.insertRow();
            fileira.innerHTML = "<span>" + nomeDasFileiras[l] + "</span>";
            
            for (let c = 0; c < 10; c++) {
                let cadeira = fileira.insertCell(c);
                cadeira.innerHTML = "<img src='img/poltrona-livre.svg' class='icone' />";
            }
        } // for do registro
    } // montarCadeiras()

    excluir(id) {
        if(window.confirm("Tem certeza que deseja excluir esta sala ?")) {
            this.salas.splice(id, 1);
            this.qtde--;
            this.salvarDados();
            this.listar();

            window.alert("Sala criada com sucesso");
        } else {
            window.alert("A exclusão foi cancelada com sucesso. Nenhuma sala foi criada");

            this.listar();
        }
    } // excluir()
} // Fim da classe

var sala = new Sala();