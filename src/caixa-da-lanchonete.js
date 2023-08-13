
// "cardapio" e "valores" são dois arrays organizados de forma que o index do elemento em um seja igual ao index do seu elemento correspondente no outro.
import cardapio from './database/cardapio';
import valores from './database/valores';
// "formaDePagamento" é um array com as formas de pagamento.
import formasDePagamento from './database/formasDePagamento';

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    // faz as verificações mais simples primeiro.
    if (!formasDePagamento.includes(metodoDePagamento)) return 'Forma de pagamento inválida!';
    if (itens.length === 0) return 'Não há itens no carrinho de compra!';

    // separa itens em dois arrays seguindo a lógica chave (codigos), valor (quantidades).
    const codigos = [];
    const quantidades = [];
    for (const item of itens) {
      const [codigo, quantidadeString] = item.split(','); // cria uma string "codigo" com tudo que vem antes da virgula e outra "quantidadeString" com o que vem depois.
      // faz as verificações relacionadas aos elementos do array "itens".
      if (quantidadeString == 0) return 'Quantidade inválida!';
      if (!cardapio.includes(codigo)) return 'Item inválido!';
      
      codigos.push(codigo);  
      quantidades.push(Number(quantidadeString)); // cria um array de numeros em vez de strings.
    }

    // aqui são feitas as verificações de itens extra.
    if (codigos.includes('queijo') && !codigos.includes('sanduiche')) return 'Item extra não pode ser pedido sem o principal';
    if (codigos.includes('chantily') && !codigos.includes('cafe')) return 'Item extra não pode ser pedido sem o principal';

    // todas as verificações feitas, é hora de calcular o valor a ser pago.
    let somaTotal = 0;
    codigos.forEach((codigo, i) => {
      const valor = valores[cardapio.indexOf(codigo)]; // aqui se faz a "consulta ao banco de dados", pegando o valor correspondende ao código do produto na venda.
      somaTotal = somaTotal + quantidades[i] * valor;
    });

    // soma total calculada, é hora de aplicar o desconto ou acrescimo.
    let valorAPagar = somaTotal;
    switch (metodoDePagamento) {
      case 'dinheiro':
        valorAPagar = somaTotal * (1 - 5 / 100);
        break;
      case 'credito':
        valorAPagar = somaTotal * 1.03;
        break;
    }

    return 'R$ ' + valorAPagar.toFixed(2).replace('.', ','); // formata a string a ser retornada para que se adeque aos testes.
  }
}

export { CaixaDaLanchonete };
