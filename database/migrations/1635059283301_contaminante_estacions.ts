import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ContaminanteEstacions extends BaseSchema {
  protected tableName = 'contaminante_estacions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('contaminante_id').unsigned().references('id').inTable('contaminantes');
      table.integer('estacion_id').references('id').inTable('estacions');
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
