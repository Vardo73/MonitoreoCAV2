import nodemailer from 'nodemailer'
import nodemailerSendgrid from 'nodemailer-sendgrid'
import View from '@ioc:Adonis/Core/View'
import Env from '@ioc:Adonis/Core/Env'
export default class Email{

    private createTrans(){

        //TRANSPORTER MAILTRAP
        /*const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "62a0b1ec7673aa",
              pass: "6fffa4e520fe89"
            }
        });*/

        //TRANSPORTER SENDGRID
        const transport = nodemailer.createTransport(
            nodemailerSendgrid({
                apiKey:Env.get('SENDGRID_API_KEY')
            })
        );

        return transport;
    }

    public async sendMail(averages,day:string){
        try {
            const view = View.getRenderer()
            const transporter= this.createTrans()
            const info =await transporter.sendMail({
                from:'"Sistemas" <sistemas@cerca.org.mx>',
                to:"salud.calidadambiental@cerca.org.mx, comunicacion@cerca.org.mx",
                subject:"Promedios diarios",
                html: await view.render('admin/email',{averages,day})
            })
            //console.log('Correo ENVIADO!!')
        } catch (error) {
            console.log('ERROR sendMail')
            console.log(error)
        }
    }

}