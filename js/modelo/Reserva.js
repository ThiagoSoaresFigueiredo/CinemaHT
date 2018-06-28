class Reserva {

    construtor() {
        this.sessoes = [];
        this.reservas = [];
        this.isEdicao = false;
        this.idEdicao;
        this.cadeiras = [];
    }

    carregarUsuarioLogado() {
        let usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

        if (usuarioLogado == null) {
            document.getElementById("usuarioLogado").innerHTML = "Usuário:<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b> Teste </b>"
        } else {
            document.getElementById("usuarioLogado").innerHTML = "Usuário:<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b>" + usuarioLogado + "</b>"
        } // else
    } // Fim de carregarUsuarioLogado()

    carregarDados() {
        this.carregarUsuarioLogado();
        this.sessoes = JSON.parse(localStorage.getItem("sessoes"));

        this.reservas = [];
        this.cadeiras = [];

        this.preencherListaDeSessoes();
        this.listarCadeiras();
    }

    listarCadeiras() {
        let tabela = document.getElementById("tbodyCadeiras");
        tabela.innerHTML = "";

        let id = 0;

        // Fileira A
        for (let l = 0; l < 6; l++) {
            let linha = tabela.insertRow();

            let fileira = "";

            if (l == 0) {
                fileira = "A";
            } else if (l == 1) {
                fileira = "B";
            } else if (l == 2) {
                fileira = "C";
            } else if (l == 3) {
                fileira = "D";
            } else if (l == 4) {
                fileira = "E";
            } else {
                fileira = "F";
            }

            for (let c = 0; c <= 10; c++) {
                let coluna = linha.insertCell(c);

                if (l == 0 && c == 0) {
                    coluna.innerText = "A";
                } else if (l == 1 && c == 0) {
                    coluna.innerText = "B";
                } else if (l == 2 && c == 0) {
                    coluna.innerText = "C";
                } else if (l == 3 && c == 0) {
                    coluna.innerText = "D";
                } else if (l == 4 && c == 0) {
                    coluna.innerText = "E";
                } else if (l == 5 && c == 0) {
                    coluna.innerText = "F";
                } else {
                    id++;
                    let img = document.createElement("img");
                    img.src = "img/poltrona-ocupada.svg";
                    img.classList.add("icone");
                    img.title = "Poltrona " + fileira + c;
                    img.id = id;
                    img.setAttribute("onclick", "reserva.reservar('" + id + "')");

                    coluna.appendChild(img);
                }
            } // for c
        } // for l
    } // listarCadeiras()

    reservar(id) {
        let comboSessaoSelecionado = document.getElementById("sessao").selectedIndex;

        for (let i = 0; i < this.sessoes.length; i++) {
            if (i == comboSessaoSelecionado) {
                this.sessoes[i].cadeiras[id].ocupado = true;

                localStorage.setItem("sessoes", JSON.stringify(this.sessoes));
            } // if
        } // for

        this.mostrarReservas();
    } // reservar

    mostrarReservas() {
        this.listarCadeiras();

        let comboSessaoSelecionado = document.getElementById("sessao").selectedIndex;

        let temReserva = false;
        for (let i = 0; i < 60; i++) {
            if (this.sessoes[comboSessaoSelecionado].cadeiras[i].ocupado) {
                temReserva = true;
                let c = document.getElementById(i);
                c.setAttribute("onclick", "");
                c.classList.add("reservarCadeira");
                c.title = "Poltrona indisponível";
                document.getElementById("listagem-de-cadeiras").classList.add("mostrar-cadeiras");
            } // if
        } // for
    } // Fim de mostrarReservas()

    preencherListaDeSessoes() {
        let select = document.getElementById("sessao");

        for (let i = 0; i < this.sessoes.length; i++) {
            let option = document.createElement("option");
            option.id = i;
            option.innerText = this.sessoes[i].filme +
                ", " + this.sessoes[i].data +
                ", " + this.sessoes[i].horario +
                ", " + this.sessoes[i].linguagem +
                ", " + this.sessoes[i].imagem +
                " - " + this.sessoes[i].sala;
            select.appendChild(option);
        }
    }

    limparCampos() {
        document.getElementById("sessao").value = "";
    }

    salvar() {
        if (this.isEdicao) {
            this.reservas[this.idEdicao].sessao = document.getElementById("sessao").value;

            this.isEdicao = false;
            this.listar();
            this.limparCampos();
            this.listarCadeiras();
        } else {
            let sessao = document.getElementById("sessao").value;
            let c = this.cadeiras;

            let reserva = {};
            reserva.sessao = sessao;
            reserva.reservas = c;

            this.reservas.push(reserva);

            this.listar();
            this.limparCampos();
            this.listarCadeiras();
        }
    }

    listar() {
        this.cadeiras = [];
        let tabela = document.getElementById("tbody");
        tabela.innerHTML = "";

        for (let i = 0; i < this.reservas.length; i++) {
            let linha = tabela.insertRow();
            let colunaCliente = linha.insertCell(0);
            let colunaSessao = linha.insertCell(1);
            let colunaCadeira = linha.insertCell(2)
            let colunaEditar = linha.insertCell(3);
            let colunaExcluir = linha.insertCell(4);

            colunaSessao.innerText = this.reservas[i].sessao;

            let imgExcluir = document.createElement("img");
            imgExcluir.src = "img/excluir.svg";
            imgExcluir.title = "Excluir";
            imgExcluir.classList.add("icone");
            imgExcluir.setAttribute("onclick", "reserva.excluir('" + i + "')");

            let imgEditar = document.createElement("img");
            imgEditar.src = "img/editar.svg";
            imgEditar.title = "Editar";
            imgEditar.classList.add("icone");
            imgEditar.setAttribute("onclick", "reserva.editar('" + i + "')");

            colunaEditar.appendChild(imgEditar);
            colunaExcluir.appendChild(imgExcluir);
        }
    }

    excluir(i) {
        this.reservas.splice(i, 1);
        this.listar();
    }

    editar(i) {
        this.isEdicao = true;
        this.idEdicao = i;

        document.getElementById("sessao").value = this.reservas[i].sessao;

        console.log(this.reservas[i].reservas[i].cadeiras);

    }
}

var reserva = new Reserva();