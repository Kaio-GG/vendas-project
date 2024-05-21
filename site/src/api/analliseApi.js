import api from "./conection";


export async function historicoApi(id){
    try {
        const r = await api.get(`/historico/${id}`);
        return r.data
    } catch (err) {
        console.log(err.message)
    }
}

