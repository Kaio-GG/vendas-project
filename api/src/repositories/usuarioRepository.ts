import {con} from './connection';

const conectado = con()

export async function login(email:string, senha:string) {
    const comando = `
    select 
    nm_usuario,
    ds_email
    from tb_usuario
    where 
    ds_email = ? &&
    ds_senha = ?
    `

    const [linha] = await (await conectado).query(comando,[email,senha])
    return linha
}

export async function cadastro(nome:string, email:string, senha:string) {
    const comando = `
        insert into tb_usuario(nm_usuario,ds_email,ds_senha)
                        values	( ? , ? , ?)
    `
    const [linha] = await (await conectado).query(comando,[nome, email, senha]);
    return linha.affectedRows;
}


