import { Request, Response, Router } from "express";
import { novaVenda, deletarVenda } from "../repositories/vendasRepository";


const server = Router();



server.post('/novo/venda', async (req:Request, res:Response) =>{
    try {
        const {idProduto, idUsuario, desconto, data, descricao, qtd} = req.body;
        const respostaBD:any = await novaVenda(idProduto, idUsuario, desconto, data, descricao, qtd);
        let msg:string = '';
        if(!respostaBD){
            msg = "Ocorreu um erro inesperado"
        }else if( 'affectedRows' in respostaBD){
            if (respostaBD.affectedRows == 1) {
                msg = "Venda cadastrado com sucesso";
            }
        }
        res.json(msg)
    } catch (err:any) {
        res.status(400).json({
            erro: err
        })
    }
})

server.delete('/deletar/venda/:id', async (req:Request, res:Response) =>{
    try {
        const {id} = req.params;
        const respostaBD:any= await deletarVenda(Number(id));
        let msg:string= '';
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
            erro: err
        })
    }
})



export default server;