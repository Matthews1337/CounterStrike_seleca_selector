// To DO: 
//     Web site que faz sorteio entre os 10 players 
//     Apenas um jogador é responsavel por indicar os outros 9 jogadores e rodar a roda
//     O site irá distribuir 5 jogadores para cada Time, de forma que o nível (média) total de cada time seja igual
//     Ao indicar os jogadores, também deve ser indicado o nivel (gc, pontuacaoMM, etc)

let infoPlayers = []

function CriarLista(array){
    let listaLI = []
    array.forEach(element => {
        let listaChild = document.createElement("li");
        listaChild.textContent = `${element.Nivel} ${element.Nome}`;
        listaLI.push(listaChild);
    });
    return listaLI
}


function reset(){
    let inputAddAmigo = document.querySelector("#amigo");
    let inputAddLevel = document.querySelector("#level");
    let form = document.querySelector("#amigoForm"); // Seleciona o formulário
    inputAddAmigo.value = "";
    inputAddLevel.value = "";

}


document.getElementById("amigoForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    let inputAddAmigo = document.querySelector("#amigo");
    let inputAddLevel = document.querySelector("#level");
    let level = parseFloat(inputAddLevel.value)

    if (infoPlayers.length < 10){
        infoPlayers.push({
                Nome: inputAddAmigo.value,
                Nivel: level,
            })
    }

    limitarQtdPlayers()
    let listaAmigos = document.querySelector('#listaAmigos');
    listaAmigos.innerHTML = '';
    let NovaListaNomes = CriarLista(infoPlayers);
    NovaListaNomes.forEach(li => listaAmigos.appendChild(li));
    inputAddAmigo.value = "";
    inputAddLevel.value = "";
    inputAddAmigo.focus();

});


function limitarQtdPlayers() {
    let qtdRestante = document.querySelector('.main__container__section__title');
    let form = document.querySelector("#amigoForm"); // Seleciona o formulário
    let totalMaximo = 10;
    let jogadoresRestantes = totalMaximo - infoPlayers.length;

    if (jogadoresRestantes > 0) {
        qtdRestante.textContent = `Players restantes: ${jogadoresRestantes}`;
    } else {
        qtdRestante.textContent = `Limite de jogadores atingido!`;
        //form.remove(); // Remove o formulário da tela
    }
}


let sortearTime = () => {
    // Obtém os times balanceados diretamente da lista de jogadores
    let [time1, time2] = balanceLists(infoPlayers);
    // let [time1, time2] = unbalanceLists(infoPlayers);

    const resultado = document.querySelector("#resultado");
    resultado.innerHTML = `
        <tr>
            <th>Time 1</th>
            <th>Time 2</th>
        </tr>
    `; // Limpa e recria o cabeçalho da tabela

    // Define o tamanho máximo de linhas na tabela
    let maxRows = Math.max(time1.length, time2.length);

    for (let i = 0; i < maxRows; i++) {
        let player1 = time1[i] ? `${time1[i].Nome} (${time1[i].Nivel})` : ""; // Evita erro se faltar jogador
        let player2 = time2[i] ? `${time2[i].Nome} (${time2[i].Nivel})` : "";

        let row = document.createElement("tr");
        row.innerHTML = `<td>${player1}</td><td>${player2}</td>`;
        resultado.appendChild(row);
    }
};


function balanceLists(players) {
    // Ordena os jogadores em ordem decrescente pelo nível
    let sortedPlayers = players.slice().sort((a, b) => b.Nivel - a.Nivel);

    // Inicializa duas listas vazias
    let list1 = [], list2 = [];
    let sum1 = 0, sum2 = 0;

    // Distribui os jogadores para equilibrar as somas
    for (let player of sortedPlayers) {
        if (sum1 <= sum2) {
            list1.push(player);
            // sum1 += player.Nivel;
            sum1 += 1;
        } else {
            list2.push(player);
            // sum2 += player.Nivel;
            sum2 += 1;
        }
    }

    // Retorna as duas listas resultantes
    return [list1, list2];
}


function unbalanceLists(players) {
    // Ordena os jogadores em ordem decrescente pelo nível
    let sortedPlayers = players.slice().sort((a, b) => b.Nivel - a.Nivel);

    // Divide a lista ao meio
    let middleIndex = Math.ceil(sortedPlayers.length / 2); // Garante que `list1` tenha mais se for ímpar

    let list1 = sortedPlayers.slice(0, middleIndex); // Metade superior (maiores níveis)
    let list2 = sortedPlayers.slice(middleIndex);    // Metade inferior (menores níveis)

    return [list1, list2];
}










