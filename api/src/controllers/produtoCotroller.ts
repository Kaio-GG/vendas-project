import { Request, Response , Router } from "express";
import { carregarProduto, deletarProduto, editarProduto, novoProduto } from "../repositories/produtoRepository";

const server = Router();



server.post('/novo/produto', async (req:Request, res:Response) =>{
    try {
        const {id , nome , valor , gasto , liquido, descricao} = req.body;
        if(!id || !nome || !valor || !gasto || !liquido || !descricao){
            throw new Error('Preencha todos ous campos');
        }
        let respostaBD:any = await novoProduto(id,nome,valor,gasto,liquido,descricao);
        let msg:string = '';
        if(!respostaBD){
            msg = "Ocorreu um erro inesperado"
        }else if( 'affectedRows' in respostaBD){
            if (respostaBD.affectedRows == 1) {
                msg = "Novo produto cadastrado com sucesso";
            }
        }
        res.json(msg)
    } catch (err:any) {
        res.status(400).json({
            erro: err.message
        })
    }
})

server.put('/alterar/produto', async (req: Request, res: Response) =>{
    try {
        const {id, nome, preco ,liquido , gasto, descricao} = req.body;
        if(!id || !nome || !preco || !gasto || !liquido || !descricao){
            throw new Error('Preencha todos ous campos');
        }
        let respostaBD:any = await editarProduto(id, nome, preco, gasto, liquido , descricao);
        let msg:string = '';
        if(!respostaBD){
            msg = "Ocorreu um erro inesperado"
        }else if( 'affectedRows' in respostaBD){
            if (respostaBD.affectedRows == 1) {
                msg = " produto editado com sucesso";
            }
        }
        res.json(msg)
    } catch (err:any) {
        res.status(400).json({
            erro: err.message
        })
    }
})

server.delete('/deletar/produto/:id', async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        let respostaBD:any = await deletarProduto(Number(id));
        let msg:string = '';
        if(!respostaBD){
            msg = "Ocorreu um erro inesperado"
        }else if( 'affectedRows' in respostaBD){
            if (respostaBD.affectedRows == 1) {
                msg = "Novo produto cadastrado com sucesso";
            }
        }
        res.json(msg)
    } catch (err:any) {
        res.status(400).json({
            erro: err.message
        })
    }
})



server.get('/carregar/produto/:id', async (req:Request, resp:Response)=>{
    try {
        const {id} = req.params;
        const resposta = await carregarProduto(Number(id));
        resp.send(resposta)
    } catch (err:any) {
        resp.status(400).json({
            erro: err.message
        })
    }
})

export default server;