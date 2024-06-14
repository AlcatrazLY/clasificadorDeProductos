import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/products`;
export const productService = {
    create,
    getAll,
    getById,
    update,
    delete: _delete,
    hello
};
async function create(params) {
    return await fetchWrapper.post(`${baseUrl}/create`, params);
}
async function hello() {
    return await fetchWrapper.post(`${baseUrl}/hello`);
}
async function getAll() {
    return await fetchWrapper.get(baseUrl);
}
async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}
async function update(id, params) {
   return await fetchWrapper.put(`${baseUrl}/${id}`, params);
}
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);
}