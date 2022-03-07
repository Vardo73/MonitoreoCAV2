import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Estacion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public channel: number

  @column()
  public apikey: string

  @column()
  public modelo_id: number

  @column()
  public localidad_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
