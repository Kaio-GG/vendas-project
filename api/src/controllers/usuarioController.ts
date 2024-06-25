import { Router, Request, Response } from "express";
import { cadastro, login, alterarDados } from "../repositories/usuarioRepository";

const server = Router();

server.post("/login", async (req: Request, res: Response) => {
    try {
        const { senha, email } = req.body;
  
        if (!email || !senha ) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }
        const resultado:any = await login(email, senha);
        if(!resultado){
            return res.status(202).json({mesage:" usuario pu senha invalidos" })
        }
        return res.status(200).json(resultado);
    } catch (err:unknown) {
        if(err instanceof Error){
            res.status(401).json({
                erro: err.message
            })
        }else{
            res.status(400).json({erro: 'ocorreu um erro inesperado'})
        }
    }
});

server.post('/cadastro', async (req:Request, res:Response) => {
    try {
        const {nome, email, senha} = req.body;
        if(!nome || !email || !senha){
            return res.status(400).json('Preencha todos os campos')
        }
        const resultado:any = await cadastro( nome, email, senha);
        return res.status(200).json({
            resultado
        })
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

server.put('/atualizar/dados', async(req:Request, res:Response) =>{
    try {
        const { nome , email, id } = req.body;
        
        if(!nome || !email || !id){
            return res.status(400).json('Preencha todos os campos')
        }
        const resultado:any = await alterarDados(id,nome,email);
        if(resultado < 1 || !resultado){
            return res.status(400).json('Ocorreu um erro!')
        }
        return res.status(202).json('Alterado com sucesso ')

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
