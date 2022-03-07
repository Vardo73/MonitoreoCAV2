import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Localidad from 'App/Models/Localidad'

export default class LocalidadsController {
    public async index(ctx:HttpContextContract){
        return await Localidad.all();
    }

    public async store({request}:HttpContextContract){
        try {
            const localidad= await Localidad.create({
                name: request.input('name'),
                id:request.input('id')
            });
    
            
           return [true,'Localidad registrada con exito.'];

        } catch (error) {
            return [false,error];
        }
    }

    public async edit({request, response,session}:HttpContextContract){
        
        try {

            const localidad= await Localidad.findOrFail(request.input('id'))
            localidad.name=request.input('name');

            await localidad.save();
            
            
            return [true,'Localidad editada con exito.'];
        } catch (error) {
           return [false,error];
        }
    }

    public async consultaClima({request, response,session}:HttpContextContract){
        const id=request.input('id');
        try {

            const localiad=await Database
            .from('climas')
            .select('climas.vel_viento')
            .select('climas.dir_viento ')
            .select('climas.temperatura')
            .select('climas.humedad')
            .select('climas.hPa')
            .select('climas.radiacion')
            .select('climas.created_at')
            .whereRaw('climas.localidad_id=? ',[id]).limit(72)

            return [true,localiad];
        } catch (error) {
            return [false,error];;
        }
    }

     //Elimina un registro de Tipo
    public async delete({request}:HttpContextContract){
        const id=request.input('id');
        try {
            const localidad=await Localidad.findOrFail(id);
            await localidad.delete();
            return [true,'Localidad eliminada con exito.'];
        } catch (error) {
            return [false,error];;
        }
    }
}
