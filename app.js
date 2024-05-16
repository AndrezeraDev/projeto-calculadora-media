// Seleciona o formulário pelo seu ID
const form = document.getElementById('form-atividade');

// Define as tags de imagem para os emojis de aprovado e reprovado
const imgAprovado = '<img src="images/aprovado.png" alt="emoji festejando"></img>';
const imgReprovado = '<img src="images/reprovado.png" alt="emoji triste"></img>';

const atividades = [];
const notas = [];

const spanAprovado = '<span class ="Resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class ="Resultado reprovado">Reprovado</span>';

const notaMinima = parseFloat(prompt("Digite a nota mínima:"));


// Inicializa uma string vazia para armazenar as linhas da tabela
let linhas = '';

// Adiciona um ouvinte de evento para o envio do formulário
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o comportamento padrão do envio do formulário

    adicionaLinha();
    atualizaTabela();
});

function adicionaLinha(){
        // Seleciona os elementos de entrada do formulário pelo ID
        const inputNomeAtividade = document.getElementById('nome-atividade');
        const inputNotaAtividade = document.getElementById('nota-atividade');

        if (atividades.includes(inputNomeAtividade.value)){
            alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
        } else {
            atividades.push(inputNomeAtividade.value);
            notas.push(parseFloat(inputNotaAtividade.value));
        
            // Constrói a linha da tabela com os valores dos inputs
            let linha = '<tr>';
            linha += `<td>${inputNomeAtividade.value}</td>`; // Adiciona o nome da atividade na célula da tabela
            linha += `<td>${inputNotaAtividade.value}</td>`; // Adiciona a nota da atividade na célula da tabela
            linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; // Adiciona o emoji de aprovado ou reprovado com base na nota
            linha += '</tr>';
        
            linhas += linha; // Adiciona a linha construída à variável linhas, que armazena todas as linhas da tabela
        }

        inputNomeAtividade.value = ''; // Limpa o valor do input de nome da atividade
        inputNotaAtividade.value = ''; // Limpa o valor do input de nota da atividade
}

function atualizaTabela(){
    const corpoTabela = document.querySelector('tbody'); // Seleciona o corpo da tabela
    corpoTabela.innerHTML = linhas; // Atualiza o conteúdo do corpo da tabela com as linhas construídas

    atualizaMediaFinal();
}

function atualizaMediaFinal(){
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal(){
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++){
        somaDasNotas += notas[i];
    }
    return somaDasNotas / notas.length;
}