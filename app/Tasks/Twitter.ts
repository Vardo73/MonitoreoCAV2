import { BaseTask } from 'adonis5-scheduler/build'
import Logic from 'App/Methods/Logic'
import TwitterService from 'App/Methods/TwitterService'
import Database from '@ioc:Adonis/Lucid/Database'
import moment from 'moment'
const LIM_PM2=35.5 ;
const LIM_PM10=155;

export default class Twitter extends BaseTask {
	public static get schedule() {
		return '0 10 * * * *'
	}
	/**
	 * Set enable use .lock file for block run retry task
	 * Lock file save to `build/tmpTaskLock`
	 */
	public static get useLock() {
		return false
	}

	public async handle() {
    	this.BotRun()
  	}

	public async BotRun(){
		console.log('Bot activo')
		let hora=parseFloat(moment().format('HH'));
		let suburbs:any=[]
		const logic= new Logic();
		const twitterService= new TwitterService();
		const stations=await Database
		.from('stations')
		.join('models', (query) => {
			query
			.on('stations.model_id', '=', 'models.id')
		})
		.select('stations.id')
		.select('stations.slug')
		.select('stations.name ')
		.select('stations.apikey')
		.whereRaw('stations.active=? ',[true])
		.andWhereILike('models.name','%purple%')
		.orWhereILike('models.name', '%Purple%')
		.orWhereILike('models.name', '%PURPLE%')

		try {
			if(stations.length>0){
				let i=0;
				
		        console.log('Monitores consultados')
				while(i<stations.length){
					let url= `https://api.purpleair.com/v1/sensors/${stations[i].slug}`
					let query=await logic.QueryPurple(url)

					console.log(`Monitor ${i+1} consultado`)
					if (query[0]) {
						let data=query[1].data.sensor;
						if( Object.keys(data).length != 0 ){
							if(data.hasOwnProperty('pm2.5') && data.hasOwnProperty('pm10.0')){
								let PM2=parseFloat(data["pm2.5"]);
								let PM10=parseFloat(data["pm10.0"]);
								if(PM2!=null && PM10!=null){    
									if(PM2>=LIM_PM2 || PM10>=LIM_PM10){
										//agrega el monitor con lecturas altas al arreglo
										suburbs.push(stations[i].suburb)
									}
								}
							}
						}
					}
					i++;
				}
				
		        console.log('Termino de consultas a monitores')
				if(suburbs.length>0){
	
					let msg=`De acuerdo a los datos de la red de monitoreo de CERCA del día d\u00EDa ${moment().format('DD/MM/YYYY')} a las ${moment().format('hh:mm a')}, se registra un ascenso de la contaminaci\u00F3n en la(s) colonia(s) ${suburbs.join(',')}.\n` 
					+`Para m\u00E1s informaci\u00F3n puedes consultar nuestra p\u00E1gina cerca.org.mx y airelimpiobcs.org.mx \n`
					+`#airelimpioBCS #eloceanoeselairequerespiras #monitoresCERCA #BCScalidaddeaire #elairedeBCS`
					
					console.log(msg)
					await twitterService.post(msg)
				}else{
					if(hora==0 || hora==6 || hora==12 || hora==18){
						let msg=`Se registra un aire saludable en la red de monitoreo de CERCA, el d\u00EDa ${moment().format('DD/MM/YYYY')} a las ${moment().format('hh:mm a')}.\n`
						+`Para m\u00E1s informaci\u00F3n puedes consultar nuestra p\u00E1gina cerca.org.mx y airelimpiobcs.org.mx \n`
						+`#airelimpioBCS #eloceanoeselairequerespiras #monitoresCERCA #BCScalidaddeaire #elairedeBCS`
	
						console.log(msg)
						await twitterService.post(msg)
					}
				}
			}
		} catch (error) {
			console.log(error)
		}
	}
}
