import axios from 'axios'

let getAPI = async({method, url, headers, data}) =>{
    try{
        let res = await axios({
            method: method,
            url: url,
            headers: headers,
            data: data
        })
        let kq = res.data
        return kq
    }catch(e){
        console.error(e)
    }
}

export {getAPI}