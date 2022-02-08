import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ContaminanteModelos extends BaseSchema {
  protected tableName = 'contaminante_modelos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('contaminante_id').unsigned().references('id').inTable('contaminantes');
      table.integer('modelo_id').unsigned().references('id').inTable('modelos');
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
