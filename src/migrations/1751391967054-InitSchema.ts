import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1751391967054 implements MigrationInterface {
    name = 'InitSchema1751391967054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "caste" character varying(100) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "caste"`);
    }

}
