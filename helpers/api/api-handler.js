import { db } from './db';
import { errorHandler } from './error-handler';

//import {productRepo} from './productos-repo'
export { apiHandler };

function apiHandler(handler) {
    return async (req, res) => {
        const method = req.method.toLowerCase();
        if (!handler[method])
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        try {
            if (!db.initialized){
            await db.initialize();
            db.initialized = true;
            }
            await handler[method](req, res);
   

        } catch (err) {
            errorHandler(err, res);
        }
    }
}