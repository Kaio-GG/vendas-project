import { con } from "./connection";

const connection = con();

export async function historico(idUsuario:number) {
    try {
        const comando:string = `
        select 
        nm_produto nome,
        vl_preco preco,
        vl_liquido liquido,
        vl_gasto gasto,
        ds_quantidade qtd,
        dt_venda data
        from tb_venda 
        inner join tb_produto
        on tb_venda.id_produto = tb_produto.id_produto
        where tb_venda.id_usuario = ?
        order by tb_venda.dt_venda desc`
        const [linhas]:any = await (await connection).query(comando,[idUsuario]);
        return linhas 
    } catch (err:any) {
        console.log(err.message)
    }
}