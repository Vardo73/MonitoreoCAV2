import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ModelsController {
    public async show({view}:HttpContextContract){
        return view.render('admin/model');
    }
}
