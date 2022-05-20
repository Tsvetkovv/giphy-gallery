const fs = require('fs');
const { argv } = require('yargs');
const invariant = require('invariant');

require('dotenv').config();

// Would be passed to script like this:
// `node set-env.js --environment=dev`
// we get it from yargs's argv object
console.log(argv);
const environment = argv.environment;
const isProd = environment !== 'development';

// Configure Angular `environment.ts` file path
const devFileName = `./src/environments/environment.ts`;
const prodFileName = `./src/environments/environment.prod.ts`;
const targetPath = isProd ? prodFileName : devFileName;
if (isProd) {
  // non prod file should exist
  fs.writeFileSync(devFileName, '');
}

const apiKey = process.env['GIPHY_API_KEY'];
invariant(apiKey, 'GIPHY_API_KEY must be specified');

const envConfigFile = `export const environment = {
   giphyApiKey: '${apiKey}',
   production: ${isProd}
};
`;
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
