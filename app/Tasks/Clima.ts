import { BaseTask } from 'adonis5-scheduler/build'
import Database from '@ioc:Adonis/Lucid/Database'
import Axios from 'axios';
import Localidad from 'App/Models/Localidad';
import Climas from 'App/Models/Clima';

/* CLIMA
'http://api.openweathermap.org/data/2.5/weather?id='+localidades[i].id+
'&appid=a6a8c5cb4e6a97396e00b8a5337777a2&units=metric'
*/ 

export default class Clima extends BaseTask {
	public static get schedule() {
		return '0 * * * * *'
	}
	/**
	 * Set enable use .lock file for block run retry task
	 * Lock file save to `build/tmpTaskLock`
	 */
	public static get useLock() {
		return false
	}

	public async handle() {
		console.log('Clima')

		await this.PeticionClima()

  	}

	  
	public async PeticionClima(){
		
		const localidades= await Localidad.all();
		let i=0;
	
		while (i<localidades.length) {
			let res=await Axios.get('http://api.openweathermap.org/data/2.5/weather?id='+localidades[i].id+'&appid=a6a8c5cb4e6a97396e00b8a5337777a2&units=metric')
			let dat=res.data;
	
			let localidad_id=localidades[i].id;
			let velViento=dat.wind.speed;
			let dirViento=dat.wind.deg;
			let temperatura=dat.main.temp;
			let humedad=dat.main.humidity;
			let hPa=dat.main.pressure;
			
			//console.log(dat)
	
			const ele=[
				localidad_id,
				velViento,
				dirViento,
				temperatura,
				humedad,
				hPa
			]
			console.log(ele)
			if(ele){
				const clima=await Climas.create({
					localidad_id:localidad_id,
					velViento:velViento,
					dirViento:dirViento,
					temperatura:temperatura,
					humedad:humedad,
					hpa:hPa
				});
				console.log('Se consultó el clima.')
			}else{
				const clima=await Climas.create({
					localidad_id,
					velViento:0,
					dirViento:0,
					temperatura:0,
					humedad:0,
					hpa:0
				});
				console.log('Se consultó el clima.')
			}
			i++;
		}
	}
}
