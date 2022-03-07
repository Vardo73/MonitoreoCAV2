import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Datoes extends BaseSchema {
  protected tableName = 'datoes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tipo_id').unsigned().references('id').inTable('tipos');
      table.integer('estacion_id').references('id').inTable('estacions');
      table.integer('contaminante_id').unsigned().references('id').inTable('contaminantes');
      table.float('temperatura_s',10,2)
      table.float('humedad_s',10,2)
      table.float('promedio',10,2)
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
