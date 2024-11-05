import { aleatorio, nome } from './aleatorio.js'; // importa os scripts de aleatorio
import { perguntas } from './perguntas.js'; // importa os scripts e listas de perguntas

const caixaPrincipal = document.querySelector(".caixa-principal"); // cria uma veriavel - epga o valor equivalente a ela do index html
const caixaPerguntas = document.querySelector(".caixa-perguntas");// cria uma veriavel - epga o valor equivalente a ela do index html
const caixaAlternativas = document.querySelector(".caixa-alternativas");// cria uma veriavel - epga o valor equivalente a ela do index html
const caixaResultado = document.querySelector(".caixa-resultado");// cria uma veriavel - epga o valor equivalente a ela do index html
const textoResultado = document.querySelector(".texto-resultado");// cria uma veriavel - epga o valor equivalente a ela do index html
const botaoJogarNovamente = document.querySelector(".novamente-btn"); // cria uma variavel equivalente ao botão jogar novamente no index html
const botaoIniciar = document.querySelector(".iniciar-btn"); // cria uma variavel equivalente ao botão iniciar no index html
const telaInicial = document.querySelector(".tela-inicial"); // cria uma variavel equivalente a tela inicial da pagina

let atual = 0; // variavel que vai ser utilizada para escolher as posições na lista de perguntas e respostas
let perguntaAtual; // varivel que vai ser utilizada para pegar a pergunta atual que sera mostrada na tela
let historiaFinal = ""; // variavel que recebera a historia final quando ela estiver terminada

botaoIniciar.addEventListener('click', iniciaJogo); // verifica se o botão iniciar foi clicado

function iniciaJogo() { // função que inicia as escolhas da historia
    atual = 0; // reseta a variavel atual para 0
    historiaFinal = ""; // reseta a historia final para vazia
    telaInicial.style.display = 'none'; // faz a tela inicial ser escondida
    caixaPerguntas.classList.remove("mostrar"); // faz a caixa de perguntas ser escondida
    caixaAlternativas.classList.remove("mostrar");// faz a caixa de alternativas ser escondida
    caixaResultado.classList.remove("mostrar"); // faz a caixa com o resultado final ser escondida
    mostraPergunta(); // executa a função mostaPergunta
}

function mostraPergunta() { // função para mostras as perguntas na tela
    if (atual >= perguntas.length) { // verifica se a valor dentro da varivel atual tem uma posição equivalente dentro da lista de perguntas
        mostraResultado(); // caso não tenha mostra o resultado
        return; // retorna
    }
    perguntaAtual = perguntas[atual]; // pega a pergunta da posição equivalente a varuavel atual
    caixaPerguntas.textContent = perguntaAtual.enunciado;// pega o enunciado da pergunta selecionada
    caixaAlternativas.textContent = ""; // pega o texto das alternativas
    mostraAlternativas(); // executa a função para mostrar as alternativas
}

function mostraAlternativas() { // função para mostraras alternativas
    for (const alternativa of perguntaAtual.alternativas) { // pega os textos das alternativas 
        const botaoAlternativas = document.createElement("button"); // cria botoes para as alternativas
        botaoAlternativas.textContent = alternativa.texto;// coloca as alternativas dentro de botoes
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa)); // verifica qual alternativa foi clicada
        caixaAlternativas.appendChild(botaoAlternativas); 
    }
}

function respostaSelecionada(opcaoSelecionada) {  // função responsavel por escolher a resposta
    const afirmacoes = aleatorio(opcaoSelecionada.afirmacao); // cria uma varivel que pega o valor selecionado na função anterior
    historiaFinal += afirmacoes + " "; // adiciona o valor da alternativa a historiaFinal
    if (opcaoSelecionada.proxima !== undefined) { // verifica se existe uma proxima pergunta ne sequencia, caso não exista mostra o resultado final
        atual = opcaoSelecionada.proxima; // caso exista uma proxima pergunta adiciona o valor de sua posição a variavel atual
    } else {
        mostraResultado(); // caso não exista mostra o resultado
        return;
    }
    mostraPergunta(); // executa a função para mostrar as perguntas
}

function mostraResultado() { // função paramostrar o resultado
    caixaPerguntas.textContent = `Em 2049, ${nome}`; // adiciona o texto ao resultado
    textoResultado.textContent = historiaFinal; // pega o valor da historia final
    caixaAlternativas.textContent = ""; // limpa o campo das alternativas
    caixaResultado.classList.add("mostrar"); // faz a caixa com o resultado final aparecer
    botaoJogarNovamente.addEventListener("click", jogaNovamente); // verifica se o botao jogar novamente foi clicado
}

function jogaNovamente() { // função para resetar os valores, para poder jogar novamente
    atual = 0;
    historiaFinal = "";
    caixaResultado.classList.remove("mostrar");
    mostraPergunta();
}

function substituiNome() { // função para substituir uma palavra dentro do texto
    for (const pergunta of perguntas) { // verifica as palavras dos textos das perguntas
        pergunta.enunciado = pergunta.enunciado.replace(/você/g, nome);//neste caso quando encontra a palavra voce no enunciado a substitui pelo nome selecionado
    }
}

substituiNome(); // executa a função para substituir o nome