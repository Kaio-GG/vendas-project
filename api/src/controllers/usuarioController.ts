import { Router, Request, Response } from "express";
import { cadastro, login } from "../repositories/usuarioRepository";

const server = Router();

server.post("/login", async (req: Request, res: Response) => {
    try {
        const { senha, email } = req.body;
        if (!email || !senha ) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }
        const resultado = await login(email, senha);
        return res.status(200).json(resultado);
    } catch (error) {
        console.error("Erro:", error);
        return res.status(500).json({ message: "Ocorreu um erro interno." });
    }
});

server.post('/cadastro', async (req:Request, res:Response) => {
    try {
        const {nome, email, senha} = req.body;
        if(!nome || !email || !senha){
            return res.status(400).json('Preencha todos os campos')
        }
        const resultado = await cadastro( nome, email, senha);
        return res.status(200).json({
            resultado
        })
    } catch (error) {
        console.error("Erro", error)
        return res.status(400).json({
            erro: "ocorreu um erro"
        })
    }
    
})




export default server;
