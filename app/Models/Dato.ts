import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Dato extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public tipo_id: number

  @column()
  public estacion_id: number

  @column()
  public contaminante_id: string

  @column()
  public temperatura_s: number
  
  @column()
  public humedad_s: number

  @column()
  public promedio: number

  @column.dateTime()
  public createdAt: DateTime

}
