import api from "./conection";



export async function novaVenda(idUsuario, desconto, data, descricao, qtd, nome, preco, gasto, liquido){
    try {
        const resposta = await api.post('novo/venda',
            {
             idUsuario :idUsuario, 
             desconto :desconto, 
             data : data,  
             qtd  : qtd,
             descricao:descricao,
             nome:nome,
             preco:preco,
             gasto:gasto, 
             liquido:liquido
            })
        return resposta        
    } catch (err) {
        console.log(err.message)
    }
}

export async function excluirVendaApi (id){
    try {
        const r = await api.delete(`/deletar/venda/${id}`)
        return r.data
    } catch (err) {
        console.log(err.message)
    }
}