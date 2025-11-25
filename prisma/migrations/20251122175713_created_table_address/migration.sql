CREATE TABLE "addresses" (
    "id" TEXT PRIMARY KEY,
    "street" TEXT,
    "houseNumber" TEXT,
    "zipCode" TEXT,
    "neighborhood" TEXT,
    "complement" TEXT,
    "city" TEXT,
    "state" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    "userId" TEXT NOT NULL
);

CREATE INDEX "idx_addresses_userId" ON "addresses"("userId");

ALTER TABLE "addresses"
ADD CONSTRAINT "addresses_userId_fkey"
FOREIGN KEY ("userId")
REFERENCES "User"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;
