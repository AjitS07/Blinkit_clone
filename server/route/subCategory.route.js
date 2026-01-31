import {Router} from "express"
import { AddSubcategoryController } from "../controllers/subCategory.controller"
import auth from "../middleware/auth.js"

const subCategoryRouter =Router()
subCategoryRouter.post('/create',auth,AddSubcategoryController)


export default subCategoryRouter