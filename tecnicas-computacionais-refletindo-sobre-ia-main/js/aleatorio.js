//lista com os nomes dos membros da equipe
const nomes = ["Fernanda", "Giuliana", "Maria Eduarda", "Marcelo", "Amanda", "Gustavo", "Gabriel"];
//exporta a função para escolher um nome aleatorio
export function aleatorio (lista){
    const posicao = Math.floor(Math.random()* lista.length);
    return lista[posicao];
}
//exporta a lista
export const nome = aleatorio(nomes)
