import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Pollutant from 'App/Models/Pollutant'
import PollutantModel from 'App/Models/PollutantModel'
import Database from '@ioc:Adonis/Lucid/Database'
import Model from 'App/Models/Model';

export default class ModelsController {
    public async show({view}:HttpContextContract){

        const models=await Model.all();
        const pollutants=await Pollutant.all();
        const relacion=await Database
        .from('pollutant_models')
        .join('pollutants', (query) => {
            query
            .on('pollutants.id', '=', 'pollutant_models.pollutant_id')
        })
        .select('pollutant_models.pollutant_id')
        .select('pollutants.name')
        .select('pollutant_models.model_id')

        return view.render('admin/model',{models,pollutants,relacion});
    }
    
    public async store({request}:HttpContextContract){

        try {
            let pollutants= request.input('pollutants');
            const model= await Model.create({
                name: request.input('name'),
                description:request.input('description')
            });
            let idM=model.id
            console.log(idM)
            console.log(pollutants)

            pollutants.forEach(async element => {
                const polluMod= await PollutantModel.create({
                    pollutant_id: element,
                    model_id:idM
                });
            });

            return 'Modelo registrado con exito.';

        } catch (error) {
            console.log(error);
            return error
        }
    }

    
    public async delete({request}:HttpContextContract){
        const id=request.input('id');
        try {
            const model=await Model.findOrFail(id);
            

            await Database.from('pollutant_models')
            .whereRaw('pollutant_models.model_id=? ',[id]).delete();
            
            await model.delete();
            return 'Modelo eliminado con exito.'
        } catch (error) {
            console.log(error);
            return error
        }
    }

    public async showModel({request}:HttpContextContract){
        const id=request.input('id');
        try {
            const model=await Model.findOrFail(id);
            const relacion=await Database
            .from('pollutant_models')
            .select('pollutant_models.pollutant_id')
            .whereRaw('pollutant_models.model_id=? ',[id])


            return [model,relacion]

        } catch (error) {
            
            console.log(error);
            return error;
        }
    }

    
    public async edit({request}:HttpContextContract){
        const id=request.input('id');
        const name=request.input('name');
        const description=request.input('description');
        let pollutants= request.input('pollutants');
        let aux: any[]=[];
        try {
            
            const model=await Model.findOrFail(id);
            model.name=name;
            model.description=description;
            
            await model.save()

            
            const relacion=await Database
            .from('pollutant_models')
            .select('pollutant_models.pollutant_id')
            .select('pollutant_models.id')
            .whereRaw('pollutant_models.model_id=? ',[id])

            relacion.forEach( async element => {
                aux.push(element.pollutant_id)
                if(!pollutants.includes(element.pollutant_id)){
                    const mod=await PollutantModel.findOrFail(element.id);
                    await mod.delete();
                }
            });

            pollutants.forEach( async element => {
                if(!aux.includes(element)){
                    const contMod= await PollutantModel.create({
                        pollutant_id: element,
                        model_id:id
                    });
                }
            });


            return 'Modelo actualizado con exito.';

        } catch (error) {
            console.log(error)
            return error
        }
    }
}
