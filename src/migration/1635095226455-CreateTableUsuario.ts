import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableUsuario1635095226455 implements MigrationInterface {
    name = 'CreateTableUsuario1635095226455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`UserName\` varchar(255) NOT NULL, \`PassWord\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_f315fdf1549648102e61748a0e\` (\`UserName\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_f315fdf1549648102e61748a0e\` ON \`usuario\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
    }

}
