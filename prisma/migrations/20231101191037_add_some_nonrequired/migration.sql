-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "avatarUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "descriptions" DROP NOT NULL,
ALTER COLUMN "policies" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "avatarUrl" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "birthday" DROP NOT NULL,
ALTER COLUMN "citizenId" DROP NOT NULL;
