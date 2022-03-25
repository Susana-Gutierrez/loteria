set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "userId" serial NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "username" TEXT NOT NULL UNIQUE,
  "hashedPassword" TEXT NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "images" (
  "imageId" serial NOT NULL,
  "imageName" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  CONSTRAINT "images_pk" PRIMARY KEY ("imageId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "cards" (
  "cardId" serial NOT NULL,
  "cardName" TEXT NOT NULL,
  CONSTRAINT "cards_pk" PRIMARY KEY ("cardId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "imagesAssigned" (
  "imagesAssignedId" serial NOT NULL,
  "cardId" integer NOT NULL,
  "imageId" integer NOT NULL,
  CONSTRAINT "imagesAssigned_pk" PRIMARY KEY ("imagesAssignedId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "games" (
  "gameId" serial NOT NULL,
  "gameName" TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMPTZ NOT NULL default now(),
  CONSTRAINT "games_pk" PRIMARY KEY ("gameId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "cardsAssigned" (
  "cardAssignedId" serial NOT NULL,
  "userId" integer NOT NULL,
  "cardId" integer NOT NULL,
  "gameId" integer NOT NULL,
  CONSTRAINT "cardsAssigned_pk" PRIMARY KEY ("cardAssignedId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "points" (
  "pointsId" serial NOT NULL,
  "gameId" integer NOT NULL,
  "userId" integer NOT NULL,
  "points" integer NOT NULL,
  CONSTRAINT "points_pk" PRIMARY KEY ("pointsId")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "imagesAssigned" ADD CONSTRAINT "imagesAssigned_fk0" FOREIGN KEY ("cardId") REFERENCES "cards"("cardId");
ALTER TABLE "imagesAssigned" ADD CONSTRAINT "imagesAssigned_fk1" FOREIGN KEY ("imageId") REFERENCES "images"("imageId");
ALTER TABLE "cardsAssigned" ADD CONSTRAINT "cardsAssigned_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "cardsAssigned" ADD CONSTRAINT "cardsAssigned_fk1" FOREIGN KEY ("cardId") REFERENCES "cards"("cardId");
ALTER TABLE "cardsAssigned" ADD CONSTRAINT "cardsAssigned_fk2" FOREIGN KEY ("gameId") REFERENCES "games"("gameId");
ALTER TABLE "points" ADD CONSTRAINT "points_fk0" FOREIGN KEY ("gameId") REFERENCES "games"("gameId");
ALTER TABLE "points" ADD CONSTRAINT "points_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
