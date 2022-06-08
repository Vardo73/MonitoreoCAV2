import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Pollutant extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  
  
  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}