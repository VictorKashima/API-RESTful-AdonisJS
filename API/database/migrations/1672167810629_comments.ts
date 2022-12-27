import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('user_name')
      table.string('user_comment')

      table.integer('mydevday_id').unsigned().references('mydevdays.id').onDelete('CASCADE')
      /*integer             = Tabela com números inteiros
        unsigned            = As células só terão números positivos
        references          = Passar a tabela que será referenciada (mydevdays na célula de ID)
        onDelete('CASCADE') = Ao deletar um "Dia" que possui comentários, todos comentários serão deletados também

       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
