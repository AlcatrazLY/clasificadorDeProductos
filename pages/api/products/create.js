import { apiHandler } from '../../../helpers/api/api-handler';  // Subir tres niveles
import { productRepo } from '../../../helpers/api/productos-repo';  // Subir tres niveles

export default apiHandler({
    post: create
});
async function create(req, res) {
    let product = await productRepo.create(req.body);
    return res.status(200).json({ product });
}