import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pollutant from 'App/Models/Pollutant'
import Ailment from 'App/Models/Ailment'
import AilmentPollutant from 'App/Models/AilmentPollutant'
import AilLo from 'App/Models/AilLo'
import Database from '@ioc:Adonis/Lucid/Database';

export default class AilmentsController {
    public async show({view}:HttpContextContract){

        const pollutants=await Pollutant.all();
        const ailments=await Ailment.all();

        const relacion=await Database
        .from('ailment_pollutants')
        .join('pollutants', (query) => {
            query
            .on('pollutants.id', '=', 'ailment_pollutants.pollutant_id')
        })
        .select('ailment_pollutants.pollutant_id')
        .select('pollutants.name')
        .select('ailment_pollutants.ailment_id')
        
        return view.render('admin/ailment',{pollutants,ailments,relacion});
    }


    
    public async store({request}:HttpContextContract){

        try {
            let pollutants= request.input('pollutants');
            const ailment= await Ailment.create({
                name: request.input('name')
            });
            let idA=ailment.id

            pollutants.forEach(async element => {
                await AilmentPollutant.create({
                    pollutant_id: element,
                    ailment_id:idA
                });
            });

            return 'Padecimiento registrado con exito.';

        } catch (error) {
            console.log(error);
            return error
        }
    }

    
    public async delete({request}:HttpContextContract){
        const id=request.input('id');
        try {
            const ailments=await Ailment.findOrFail(id);

            await Database.from('ailment_pollutants')
            .whereRaw('ailment_pollutants.ailment_id=? ',[id]).delete();

            await Database.from('ail_los')
            .whereRaw('ail_los.ailment_id=? ',[id]).delete();
            
            await ailments.delete();
            await Database.rawQuery('ALTER TABLE monitoreocav2.ailments AUTO_INCREMENT = ?', [id])

            return 'Padecimiento eliminado con exito.'
        } catch (error) {
            console.log(error);
            return error
        }
    }

    
    public async edit({request}:HttpContextContract){
        const id=request.input('id');
        const name=request.input('name');
        let pollutants= request.input('pollutants');
        let aux: any[]=[];
        try {
            
            const model=await Ailment.findOrFail(id);
            model.name=name;
            
            await model.save()

            
            const relacion=await Database
            .from('ailment_pollutants')
            .select('ailment_pollutants.pollutant_id')
            .select('ailment_pollutants.id')
            .whereRaw('ailment_pollutants.ailment_id=? ',[id])

            relacion.forEach( async element => {
                aux.push(element.pollutant_id)
                if(!pollutants.includes(element.pollutant_id)){
                    const mod=await AilmentPollutant.findOrFail(element.id);
                    await mod.delete();
                }
            });

            pollutants.forEach( async element => {
                if(!aux.includes(element)){
                    await AilmentPollutant.create({
                        pollutant_id: element,
                        ailment_id:id
                    });
                }
            });


            return 'Padecimiento actualizado con exito.';

        } catch (error) {
            console.log(error)
            return error
        }
    }



    public async showAilment({request}:HttpContextContract){
        const id=request.input('id');
        try {
            const relacion=await Database
            .from('ailment_pollutants')
            .select('ailment_pollutants.pollutant_id')
            .whereRaw('ailment_pollutants.ailment_id=? ',[id])


            return relacion;

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    public async storeAilLoc({request}:HttpContextContract){
        try {
            let obj=request.input('obj');
            let year=request.input('year');


            obj.forEach(async element => {
                await AilLo.create({
                    location_id: element.unidad_medica,
                    ailment_id:element.padecimiento,
                    year:year,
                    total:element.total
                });
            });
            return 'Datos capturados exitosamente.';
        } catch (error) {
            console.log(error);
            return error
        }
    }
}
