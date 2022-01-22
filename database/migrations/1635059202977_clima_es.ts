import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClimaEs extends BaseSchema {
  protected tableName = 'clima_es'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('estacion').references('id').inTable('estacions')
      table.float('vel_viento',8,2)
      table.integer('dir_viento',5)
      table.float('temperatura',8,2)
      table.float('humedad',8,2)
      table.float('hPa',8,2)
      table.float('radiacion',8,2)
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
