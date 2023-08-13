class CaixaDaLanchonete {

    CARDAPIO =  new Map([
    //  código          [preco, requisito]
        ['cafe',        [3.00, false]],
        ['chantily',    [1.50, 'cafe']],
        ['suco',        [6.20, false]],
        ['sanduiche',   [6.50, false]],
        ['queijo',      [2.00, 'sanduiche']],
        ['salgado',     [7.25, false]],
        ['combo1',      [9.50, false]],
        ['combo2',      [7.5, false]],
    ])
    DESCONTO = 0.05;
    ACRESCIMO = 0.03;

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length === 0){
            return 'Não há itens no carrinho de compra!';
        }
        if (metodoDePagamento.length === 0 || metodoDePagamento === 'especie'){        
            return 'Forma de pagamento inválida!';
        }
        let codigosDoPedido = [];
        let subtotal = 0.0;

        
        for (const item of itens){
            
            let entrada = item.split(',')
            let codigo = entrada[0];
            let quantidade = parseInt(entrada[1]);
            
            if (quantidade < 1){
                return 'Quantidade inválida!'
            }

            if (this.CARDAPIO.has(codigo)){
                codigosDoPedido.push(codigo);
                let requisito =  this.CARDAPIO.get(codigo)[1];    
                if (requisito != false && !(codigosDoPedido.includes(requisito))) return 'Item extra não pode ser pedido sem o principal';                
            } else{
                return 'Item inválido!'
            }

            subtotal += parseFloat(this.CARDAPIO.get(entrada[0])) * quantidade;
        }
        
        if (metodoDePagamento === 'credito'){
            subtotal += subtotal * this.ACRESCIMO;
        } else if (metodoDePagamento === 'dinheiro'){
            subtotal -= subtotal * this.DESCONTO;
        }
        let valor = subtotal.toFixed(2).toString().replace('.',',');
        
        return `R$ ${valor}`;
    }
}
export { CaixaDaLanchonete };