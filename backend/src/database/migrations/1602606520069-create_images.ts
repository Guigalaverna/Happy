import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602606520069 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'images',
			columns: [
				{
					name: 'id',
					type: 'integer',
					unsigned: true,
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'path',
					type: 'varchar'
				},
				{
					name: 'orphanage_id',
					type: 'integer'
				}
			],
			foreignKeys: [
				{
					name: 'ImageOrphanage',
					columnNames: ['orphanage_id'],
					referencedTableName: 'orphanges',
					referencedColumnNames: ['id'],
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE'
				}
			]
		}))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable('images')
  }

}
