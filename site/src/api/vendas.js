import api from "./conection";



export async function novaVenda(idProduto, idUsuario, desconto, data, descricao, qtd){
    try {
        const resposta = await api.post('novo/venda',
            {
             idProduto :idProduto,
             idUsuario :idUsuario, 
             desconto :desconto, 
             data : data, 
             descricao : descricao , 
             qtd  : qtd
            })
        return resposta        
    } catch (err) {
        console.log(err.message)
    }
}