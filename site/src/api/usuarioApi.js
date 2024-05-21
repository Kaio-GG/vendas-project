import api from './conection.js';



export async function login(email, senha){
    try {
        const resp = await api.post('/login',{
            "email": email,
            "senha": senha
        } )
        return resp
    } catch (err) {
        console.log(err)
    }
}


export async function cadastrar(nome, email, senha){
    try {
        const resp = await api.post('/cadastro', {
            nome: nome,
            email: email,
            senha: senha
        })
        
        return resp;
    } catch (err) {
        console.log(err)
    }
}