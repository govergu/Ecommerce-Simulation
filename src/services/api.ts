import axios from "axios";

export const api = axios.create({
    baseURL: "https://dummyjson.com",
  });
  
export const getproducts = async () =>{
    const response = await api.get('/products')
    return response.data;    
}

export const searchproducts = async (item: string) =>{
  const response = await api.get(`/search?q=${item}`)
  return response.data;
}