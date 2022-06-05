import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PollutantsController {
    public async show({view}:HttpContextContract){
        return view.render('admin/pollutant');
    }
}
