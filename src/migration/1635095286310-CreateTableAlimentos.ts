import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableAlimentos1635095286310 implements MigrationInterface {
    name = 'CreateTableAlimentos1635095286310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`alimento_usuario\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Desayuno\` varchar(255) NULL, \`Comida\` varchar(255) NULL, \`Cena\` varchar(255) NULL, \`Merienda\` varchar(255) NULL, \`ComidaExtra\` varchar(255) NULL, \`FechaCreacion\` datetime NOT NULL, \`FechaModificacion\` datetime NULL, PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`alimento_usuario\``);
    }

}
