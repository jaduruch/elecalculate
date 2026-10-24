CREATE TABLE "notebook" (
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"note" text DEFAULT '' NOT NULL,
	"route" text NOT NULL,
	"snapshot" jsonb NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"deletedAt" timestamp with time zone
);
