import {Router} from "express"
import { AddSubcategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryControllerr } from "../controllers/subCategory.controller.js"
import auth from "../middleware/auth.js"

const subCategoryRouter =Router()
subCategoryRouter.post('/create',auth,AddSubcategoryController)
subCategoryRouter.post('/get',getSubCategoryController)
subCategoryRouter.put('/update',auth,updateSubCategoryControllerr)
subCategoryRouter.delete('/deletesub',auth,deleteSubCategoryController)


export default subCategoryRouter