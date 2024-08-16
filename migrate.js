const dbmigrate = require("db-migrate");
const config = require("./database.json"); // Your database configuration

async function runMigrations() {
  const instance = dbmigrate.getInstance(true, {
    config: {
      dev: config.development,
      driver: config.development.driver,
    },
    cmdOptions: {
      "migrations-dir": "./migrations",
    },
  });

  try {
    await instance.up().then((result) => {
      if (result) {
        console.log("Migrations executed successfully.");
      }
    });
  } catch (error) {
    console.error("Error executing migrations:", error);
  }
}

runMigrations();
