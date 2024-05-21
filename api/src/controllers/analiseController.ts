import { Request, Response , Router } from "express";
import { historico } from "../repositories/anaiseRepository";


const server = Router();



server.get('/historico/:id', async(req:Request, resp:Response)=>{
    try {
        const {id} = req.params;
        const lista = await historico (Number(id));
        resp.send(lista);
    } catch (err:any) {
        resp.send(err.message)
    }
})


export default server;