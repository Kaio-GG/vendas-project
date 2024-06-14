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

export async function AlterarDadosApi(nome , email, id){
    try {
        const resp = await api.put('/atualizar/dados',{
            nome: nome ,
            email : email ,
            id : id
        })
        return resp;
    } catch (err) {
        console.log(err.message)
    }
}