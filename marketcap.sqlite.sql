BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "MarketQuotes" (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"time"	INTEGER NOT NULL,
	"symbol"	TEXT NOT NULL,
	"supply"	INTEGER,
	"maxSupply"	INTEGER,
	"price"	INTEGER,
	"volume24h"	INTEGER,
	"percentChange1h"	INTEGER,
	"percentChange24h"	INTEGER,
	"percentChange7d"	INTEGER,
	"marketCap"	INTEGER
);
CREATE TABLE IF NOT EXISTS "GlobalMarket" (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"time"	INTEGER NOT NULL,
	"marketcap"	INTEGER,
	"volume24h"	INTEGER,
	"btcDominance"	INTEGER,
	"ethDominance"	INTEGER,
	"noCryptocurrencies"	INTEGER,
	"noExchanges"	INTEGER
);
COMMIT;
