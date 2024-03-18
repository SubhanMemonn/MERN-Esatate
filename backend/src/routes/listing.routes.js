import Router from 'express'
import {
    create,
    getListing,
    deleteListing,
    updateListing,
    getListings
} from '../controllers/listing.controller.js'
import JWTVerify from '../middlewares/auth.middleware.js'
const router = Router()


router.post('/create', JWTVerify, create);
router.get('/get', getListings);

router.route('/:id')
    .get(getListing)
    .patch(JWTVerify, updateListing)
    .delete(JWTVerify, deleteListing);






export default router