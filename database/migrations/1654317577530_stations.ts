import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'stations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('slug').unsigned().unique().notNullable();
      table.integer('model_id').unsigned().references('id').inTable('models');
      table.string('name',25).notNullable();
      table.integer('channel',15).unique()
      table.string('apikey',50).unique()
      table.float('longitude',10,7);
      table.float('latitude',10,7);
      table.boolean('active');
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
