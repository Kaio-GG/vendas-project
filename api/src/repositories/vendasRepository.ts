import {con} from './connection';
const connection = con();




export async function novaVenda( idUsuario:number, desconto:number, data:string, qtd:number, nome:string, preco:number, gasto:number, liquido:number, descricao:string) {
 try {
    const comando:string = `
    insert into tb_venda(id_usuario ,ds_desconto, dt_venda, ds_quantidade,nm_produto,vl_preco,vl_gasto,vl_liquido,ds_descricao )
                  values( ?, ? , ?, ?, ?, ? , ? , ?, ?)`;
    const [linhas]:any = await (await connection).execute(comando,[idUsuario, desconto, data, qtd, nome,preco, gasto, liquido, descricao ]);
    return linhas
 } catch (err) {
    console.log(err)
 }   
}

export async function deletarVenda(id:number) {
    try {
        const comando:string = `
            delete from tb_venda where id_venda = ?`;
        const [linha]:any = await (await connection).query(comando,[id]);
        return linha
    } catch (err:any) {
        console.log(err)
    }
}

