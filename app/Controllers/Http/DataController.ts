import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DataController {
    public async show({view}:HttpContextContract){
        return view.render('admin/report');
    }
}
