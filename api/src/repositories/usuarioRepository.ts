import {con} from './connection';

const conectado = con()

export async function login(email:string, senha:string) {
    const comando:string = `
    select
    id_usuario id, 
    nm_usuario nome,
    ds_email email
    from tb_usuario
    where 
    ds_email = ? &&
    ds_senha = ?
    `

    const [linha]:any = await (await conectado).query(comando,[email,senha])
    return linha[0]
}

export async function cadastro(nome:string, email:string, senha:string) {
    const comando = `
        insert into tb_usuario(nm_usuario,ds_email,ds_senha)
                        values	( ? , ? , ?)
    `
    const [linha]:any = await (await conectado).query(comando,[nome, email, senha]);
    return linha.affectedRows;
}


