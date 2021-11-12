import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelations1635095341191 implements MigrationInterface {
    name = 'addRelations1635095341191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`alimento_usuario\` ADD \`IdUsuario\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`alimento_usuario\` ADD CONSTRAINT \`FK_855a2a5ea1d8ab63586e0db322e\` FOREIGN KEY (\`IdUsuario\`) REFERENCES \`usuario\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`alimento_usuario\` DROP FOREIGN KEY \`FK_855a2a5ea1d8ab63586e0db322e\``);
        await queryRunner.query(`ALTER TABLE \`alimento_usuario\` DROP COLUMN \`IdUsuario\``);
    }

}
