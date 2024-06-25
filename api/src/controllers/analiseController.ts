import { Request, Response , Router } from "express";
import { historico, maisVendido } from "../repositories/anaiseRepository";


const server = Router();



server.get('/historico/:id', async(req:Request, resp:Response)=>{
    try {
        const {id} = req.params;
        const lista = await historico (Number(id));
        resp.send(lista);
    } catch (err:unknown) {
        if(err instanceof Error){
            resp.status(400).json({
                erro: err.message
            })
        }else{
            resp.status(400).json({erro: 'ocorreu um erro inesperado'})
        }
    }
});


server.get('/maisvendido/:id', async( req: Request, res:Response) =>{
    try {
        const {id} = req.params;
        const lista = await maisVendido(Number(id));
        res.send(lista)
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