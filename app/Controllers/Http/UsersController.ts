import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
    public async index(ctx:HttpContextContract){
        return await User.all();
    }
    
    public async store({request}:HttpContextContract){
        
        const newUserSchema = schema.create({
            username:schema.string({},[
                rules.required()
            ]),
            email:schema.string({},[
                rules.email(),
                rules.required()
            ]),
            password:schema.string({},[
                rules.required()
            ])
        })
        
        try {
            const payload = await request.validate({
              schema: newUserSchema,
              messages: {
                required: 'El campo {{ field }} es requerido para crear una cuenta.'
              }
            })

            const userFound = await User.findBy('email',request.input('email'));

            if (userFound) {
                return 'Ya existe un usuario con este Email.';
            }
            
            const user = await User.create({
                username: request.input('username').toLowerCase(),
                email: request.input('email').toLowerCase(),
                password:request.input('password')
            });

            return user;

        } catch (error) {
            //response.badRequest(error.messages)
            return error;
        }
    }
    

    public async login({auth, request, response,session}:HttpContextContract){
        const email = request.input('email');
        const password = request.input('password');

        try {
            await auth.use('web').attempt(email, password);

            return response.redirect('/station');
            
        } catch (error){
            session.flash('notification','No pudimos verificar sus credenciales.')
            return response.redirect('back')
        }
    }
    
    public async logout({ auth, response }:HttpContextContract){
        try {
            await auth.use('web').logout();
            return response.redirect('/');
        } catch (error) {
            return error;
        }
    }
    
    public async someone({ auth, response }:HttpContextContract){
        await auth.use('web').authenticate()
        return auth.use('web').isLoggedIn
    }

    public async delete({request}:HttpContextContract){
        const id=request.input('id');
        const user=await User.find(id);
        await user?.delete();
        return user;
    }
    public async showLogin ({view}:HttpContextContract){
        return view.render('auth/login');
    }

}
