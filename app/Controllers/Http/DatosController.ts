import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Dato from 'App/Models/Dato'

export default class DatosController {
    
    async storeHora(tipo_id,estacion_id,temperatura_s,humedad_s,promedio,createdAt){
        try {
            const datohora=await Dato.create({
                tipo_id,
                estacion_id,
                temperatura_s,
                humedad_s,
                promedio,
                createdAt
            })
            return datohora;
        } catch (error) {
            console.log(error) ;
        }
    }

}
