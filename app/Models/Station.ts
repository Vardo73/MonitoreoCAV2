import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Station extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public slug: number

  @column()
  public model_id: number
  
  @column()
  public name: string

  @column()
  public channel: number

  @column()
  public apikey: string

  @column()
  public longitude: number

  @column()
  public latitude: number

  @column()
  public active: boolean

  @column.dateTime()
  public createdAt: DateTime
}
