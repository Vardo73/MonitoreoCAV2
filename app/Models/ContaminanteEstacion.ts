import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ContaminanteEstacion extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public contaminante_id: number

  @column()
  public estacion_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
