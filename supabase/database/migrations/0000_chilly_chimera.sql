CREATE TYPE "public"."tradeApprovals" AS ENUM('pending', 'accepted', 'declined');--> statement-breakpoint
CREATE TABLE "Chats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"members" uuid[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chat" uuid NOT NULL,
	"text" text,
	"image" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Category" (
	"name" text PRIMARY KEY NOT NULL,
	CONSTRAINT "Category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "SubCategory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"picturesUrl" text[] NOT NULL,
	"value" integer,
	"available" boolean DEFAULT true,
	"owner" uuid,
	"createdAt" date DEFAULT now() NOT NULL,
	"subCategory" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Trades" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"requestedBy" uuid NOT NULL,
	"product" uuid NOT NULL,
	"productRequested" uuid NOT NULL,
	"approvalStatus" "tradeApprovals" DEFAULT 'pending' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"email" text NOT NULL,
	"profilePiture" text,
	"favoriteProducts" text[] DEFAULT '{}' NOT NULL,
	"subscriptionExpirationDate" date,
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_chat_Chats_id_fk" FOREIGN KEY ("chat") REFERENCES "public"."Chats"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_category_Category_name_fk" FOREIGN KEY ("category") REFERENCES "public"."Category"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Products" ADD CONSTRAINT "Products_owner_Users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Products" ADD CONSTRAINT "Products_subCategory_SubCategory_id_fk" FOREIGN KEY ("subCategory") REFERENCES "public"."SubCategory"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Trades" ADD CONSTRAINT "Trades_requestedBy_Users_id_fk" FOREIGN KEY ("requestedBy") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Trades" ADD CONSTRAINT "Trades_product_Products_id_fk" FOREIGN KEY ("product") REFERENCES "public"."Products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Trades" ADD CONSTRAINT "Trades_productRequested_Products_id_fk" FOREIGN KEY ("productRequested") REFERENCES "public"."Products"("id") ON DELETE no action ON UPDATE no action;