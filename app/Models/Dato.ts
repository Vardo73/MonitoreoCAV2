import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Dato extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public tipo_id: number

  @column()
  public contaminante_estacion_id: number

  @column()
  public clima_id: number

  @column()
  public temperatura_s: number
  
  @column()
  public humedad_s: number

  @column()
  public promedio: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
