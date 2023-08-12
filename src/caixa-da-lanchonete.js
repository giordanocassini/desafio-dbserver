class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        if(itens.length === 0) return 'Não há itens no carrinho de compra!';

        const chaves = [];
        const valores = [];
        itens.forEach(element => {
            const [chave, valorString] = element.split(',');
            const valor = Number(valorString);
            chaves.push(chave);
            valores.push(valor);
        });

        if (valores.includes(0)) return "Quantidade inválida!";


        return "";
    }

}

export { CaixaDaLanchonete };
