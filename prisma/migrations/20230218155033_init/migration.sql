-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idService" INTEGER NOT NULL,
    "idHourInit" INTEGER NOT NULL,
    "idHourEnd" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hours" (
    "id" SERIAL NOT NULL,
    "hora" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_idHourInit_key" ON "Schedule"("idHourInit");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_idHourEnd_key" ON "Schedule"("idHourEnd");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_idService_fkey" FOREIGN KEY ("idService") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_idHourInit_fkey" FOREIGN KEY ("idHourInit") REFERENCES "Hours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_idHourEnd_fkey" FOREIGN KEY ("idHourEnd") REFERENCES "Hours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
