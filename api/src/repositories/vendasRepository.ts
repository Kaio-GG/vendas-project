import {con} from './connection';
const connection = con();




export async function novaVenda(idProduto:number, idUsuario:number, desconto:number, data:string, descricao:string, qtd:number) {
 try {
    const comando:string = `
    insert into tb_venda(id_produto,id_usuario,ds_desconto,dt_venda,ds_venda,ds_quantidade)
                    values( ?, ?, ?, ?, ? , ?)`;
    const [linhas]:any = await (await connection).execute(comando,[idProduto,idUsuario,desconto,data,descricao,qtd]);
    return linhas
 } catch (err) {
    console.log(err)
 }   
}

export async function deletarVenda(id:number) {
    try {
        const comando:string = `
        delete from tb_venda where id_venda = ?`;
        const [linha]:any = await (await connection).execute(comando[id]);
        return linha
    } catch (err:any) {
        console.log(err)
    }
}

