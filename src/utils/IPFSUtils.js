import { create } from 'ipfs-http-client'
import axios from 'axios';
//import IPFS from 'nano-ipfs-store'

const client = create('https://ipfs.infura.io:5001/api/v0');

const uploadFileToIPFS = async (files) => {
    let lists = [];
    try{
        for(let i = 0;i<files.length;i++){
            const added = await client.add(files[i])
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            //console.log("[GD], FileName = ", files[i].name, ", Hash: ", added.path)
            lists.push(url)
        }
        return lists
    } catch(err) {
        //console.log("Error uploading file: ", err)
        return []
    }    
}

const uploadTextToIPFS = async (data) => {
    try{
        let doc = JSON.stringify(data)
        const added = await client.add(doc)
        return added.path
    }catch(err){
        //console.log("Error: ", err)
        return null
    }
}

const loadFromIPFS = async (url) => {
    let res = await axios.get(`https://ipfs.infura.io/ipfs/${url}`)
    return res;
}


const IPFSUtils = {
    uploadFileToIPFS,
    uploadTextToIPFS,
    loadFromIPFS
}


export default IPFSUtils;