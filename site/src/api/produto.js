import api from "./conection";


export async function criarProduto(id , nome , valor , gasto , liquido, descricao){
    try {
        const resposta = await api.post('/novo/produto', {
            id: id ,
            nome: nome, 
            valor: valor ,
            gasto: gasto , 
            liquido:liquido, 
            descricao:descricao,
            
        });
        return resposta
    } catch (err) {
        console.log(err)
    }
}


export async function carregarProdutoApi(id){
    try {
        const resposta = await api.get(`/carregar/produto/${id}`);
        return resposta.data;

    } catch (err) {
        console.log(err.message)
    }
}


export async function alterarProduto(id,nome,preco,gasto,liquido,desc){
    try {
        const r = await api.put('/alterar/produto',
        {
             id : id,
             nome :  nome , 
             preco : preco, 
             gasto : gasto, 
             liquido : liquido, 
             descricao :  desc
          }
        )
        return r.data
    } catch (err) {
        console.log(err.message)
    }
}

export async function deletarProdutoApi(id){
    try {
        const r = await api.delete(`/deletar/produto/${id}`)
        return r.data
    } catch (err) {
        console.log(err.message)
    }
}