import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Reporte extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public tipo_id: number

  @column()
  public contaminante_estacion_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
