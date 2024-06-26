import { Request, Response , Router } from "express";
import { carregarProduto, deletarProduto, editarProduto, novoProduto } from "../repositories/produtoRepository";

const server = Router();



server.post('/novo/produto', async (req:Request, res:Response) =>{
    try {
        const {id , nome , valor , gasto , liquido, descricao} = req.body;
        if(!id || !nome || !valor || Number(gasto) < 0 || !liquido || !descricao){
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
    } catch (err:unknown) {
        if(err instanceof Error){
            res.status(400).json({
                erro: err.message
            })
        }else{
            res.status(400).json({erro: 'ocorreu um erro inesperado'})
        }
    }
})

server.put('/alterar/produto', async (req: Request, res: Response) =>{
    try {
        const {id, nome, preco ,liquido , gasto, descricao} = req.body;
        if(!id || !nome || !preco  || !liquido || !descricao || Number(gasto) < 0){
            throw new Error('Preencha todos ous campos');
        }
        let respostaBD:any = await editarProduto(id, nome, preco, Number(gasto), liquido , descricao);
        let msg:string = '';
        if(!respostaBD){
            msg = "Ocorreu um erro inesperado"
        }else if( 'affectedRows' in respostaBD){
            if (respostaBD.affectedRows == 1) {
                msg = " produto editado com sucesso";
            }
        }
        res.json(msg)
    }catch (err:unknown) {
        if(err instanceof Error){
            res.status(400).json({
                erro: err.message
            })
        }else{
            res.status(400).json({erro: 'ocorreu um erro inesperado'})
        }
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
                msg = "Produto deletado com sucesso";
            }
        }
        res.json(msg)
    }catch (err:unknown) {
        if(err instanceof Error){
            res.status(400).json({
                erro: err.message
            })
        }else{
            res.status(400).json({erro: 'ocorreu um erro inesperado'})
        }
    }
})



server.get('/carregar/produto/:id', async (req:Request, res:Response)=>{
    try {
        const {id} = req.params;
        const resposta = await carregarProduto(Number(id));
        res.send(resposta)
    } catch (err:unknown) {
        if(err instanceof Error){
            res.status(400).json({
                erro: err.message
            })
        }else{
            res.status(400).json({erro: 'ocorreu um erro inesperado'})
        }
    }
})

export default server;