import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Subscriber from 'App/Models/Subscriber'
import Database from '@ioc:Adonis/Lucid/Database';

export default class SubscribersController {
    
    public async index(){
        return await Subscriber.all();
    }

    public async store({request}:HttpContextContract){
        
        const newUserSchema = schema.create({
            name:schema.string({},[
                rules.required()
            ]),
            lastname:schema.string({},[
                rules.required()
            ]),
            email:schema.string({},[
                rules.email(),
                rules.required()
            ])
        })
        
        try {
            await request.validate({ 
              schema: newUserSchema,
              messages: {
                required: 'El campo {{ field }} es requerido para crear una cuenta.'
              }
            })

            const userFound = await Subscriber.findBy('email',request.input('email'));

            if (userFound) {
                return 'Ya existe un usuario con este Email.';
            }
            
            const user = await Subscriber.create({
                name: request.input('name').toLowerCase(),
                email: request.input('email').toLowerCase(),
                lastname:request.input('lastname').toLowerCase()
            });

            return user;

        } catch (error) {
            //response.badRequest(error.messages)
            return error;
        }
    }

    public async delete({request}:HttpContextContract){
        const id=request.input('id');
        const subscriber=await Subscriber.find(id);
        await subscriber?.delete();
        
        await Database.rawQuery('ALTER TABLE monitoreocav2.subscriber AUTO_INCREMENT = ?', [id])
        return subscriber;
    }
    
}
