import { BaseTask } from 'adonis5-scheduler/build'
import Database from '@ioc:Adonis/Lucid/Database'
import Axios from 'axios';
import Localidad from 'App/Models/Localidad';
import Clima from 'App/Models/Clima';
const moment = require("moment");
import Datos from 'App/Models/Dato'

/* Datos generales del monitor
https://www.purpleair.com/json?key=7X87EFT46TOH2OL9&show=39465
*/

/*Datos Capturados por el monitor
https://api.thingspeak.com/channels/'+estaciones[i].channel+'/feeds.json?api_key='+
	estaciones[i].apikey+'&average=60&timezone=America/Mazatlan&start='
	+fecha+'%20'+hora+':00:00&end='+fecha+'%20'+hora+':00:00&round=2
*/

export default class Dato extends BaseTask {
	public static get schedule() {
		return '0 10 * * * *'
	}

	public static get useLock() {
		return false
	}

	public async handle() {
		//console.log('Datos')
		await this.PeticionPurpleAir()
  	}
	

	public async PeticionPurpleAir(){
		try {
			let hora=moment().format('HH');
			let fecha=moment().format('YYYY-MM-DD');
	
			const pm2 = await Database
			.from('contaminantes')
			.select('contaminantes.id')
			.where('contaminantes.name','like','%2.5%');

			const pm10 = await Database
			.from('contaminantes')
			.select('contaminantes.id')
			.where('contaminantes.name','like','%10%');
			
			const estaciones = await Database
			.from('estacions')
			.join('modelos', (query) => {
				query
				.on('estacions.modelo_id', '=', 'modelos.id')
			})
			.select('estacions.id')
			.select('estacions.name ')
			.select('estacions.channel ')
			.select('estacions.apikey')
			.where('modelos.name','like','%urple%');

	
			if(estaciones.length>0){
				let i=0;
				while (i<estaciones.length){
					
					let url='https://api.thingspeak.com/channels/'+estaciones[i].channel+'/feeds.json?api_key='+
					estaciones[i].apikey+'&average=60&timezone=America/Mazatlan&start='
					+fecha+'%20'+hora+':00:00&end='+fecha+'%20'+hora+':07:00&round=2';
	
					
					let peticion=await Axios.get(url);

					
					if(peticion){
                
						let pet=peticion.data;
						let l=0;
						let creado;
		
						while (l<pet.feeds.length) {
							creado=pet.feeds[l].created_at
							let promedio_PM2=parseFloat(pet.feeds[l].field2);
							let promedio_PM10=parseFloat(pet.feeds[l].field3);
							let temperatura_s=parseFloat(pet.feeds[l].field6);
							let humedad_s=parseFloat(pet.feeds[l].field7);
		
							if(pet.feeds[l].field2!=null && pet.feeds[l].field3!=null){
								if(pet.feeds[l].field6!=null && pet.feeds[l].field7!=null){
															
									
									const datohoraPM2=await Datos.create({
										
										tipo_id:1,
										estacion_id:estaciones[i].id,
										contaminante_id:pm2[0].id,
										temperatura_s:temperatura_s,
										humedad_s:humedad_s,
										promedio:promedio_PM2,
										createdAt:creado
									})

									const datohoraPM10=await Datos.create({
										
										tipo_id:1,
										estacion_id:estaciones[i].id,
										contaminante_id:pm10[0].id,
										temperatura_s:temperatura_s,
										humedad_s:humedad_s,
										promedio:promedio_PM10,
										createdAt:creado
									})
								}else{
								}
							}
							l++;
						}
		
					}
				  i++;
				}
			}
			console.log('Datos hora actulizados')
		} catch (error) {
			console.log(error)
		}
	}

	public async PeticionASL(){

	}

	public async PeticionFWOP(){

	}

}
