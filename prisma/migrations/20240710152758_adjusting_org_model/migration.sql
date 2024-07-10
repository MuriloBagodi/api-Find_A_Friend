/*
  Warnings:

  - Made the column `whatsapp` on table `orgs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cep` on table `orgs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `orgs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `orgs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `neighborhood` on table `orgs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `street` on table `orgs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `about` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `age` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `energy_level` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `environment` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orgs" ALTER COLUMN "whatsapp" SET NOT NULL,
ALTER COLUMN "cep" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "neighborhood" SET NOT NULL,
ALTER COLUMN "street" SET NOT NULL;

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "about" SET NOT NULL,
ALTER COLUMN "age" SET NOT NULL,
ALTER COLUMN "size" SET NOT NULL,
ALTER COLUMN "energy_level" SET NOT NULL,
ALTER COLUMN "environment" SET NOT NULL;
