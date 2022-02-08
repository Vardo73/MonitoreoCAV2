import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Bandera extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  
  @column()
  public description: string
  
  @column()
  public lim_oms: number
  
  @column()
  public lim_nom: number
  
  @column()
  public tipo_id: number
  
  @column()
  public contaminante_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
