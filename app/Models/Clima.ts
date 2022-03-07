import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Clima extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public localidad_id: number

  @column()
  public velViento: number

  @column()
  public dirViento: number

  @column()
  public temperatura: number

  @column()
  public humedad: number

  @column()
  public hpa: number

  @column()
  public radiacion: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
