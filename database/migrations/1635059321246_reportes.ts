import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Reportes extends BaseSchema {
  protected tableName = 'reportes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tipo_id').unsigned().references('id').inTable('tipos');
      table.integer('contaminante_estacion_id').unsigned().references('id').inTable('contaminante_estacions')
      table.string('name',80).notNullable().unique();
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
