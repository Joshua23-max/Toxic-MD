const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0JEV3dLRlprSGMwNkJDa0M1d3lzS01iKzdlcWNIZVczdlhCb1k4c2hXUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiejhGdmpoN3UvMVd6Vm9rZHREMXR6TzZYTWdJZVlTMmJsSGpLRmtWcmZCcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1T2loc0R6dnZOblkrQ3JqaDhwZXJCRmR6ejViQm8wc2NOWEJJTDdHWFVjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGc1NiZHNORFZ3VkdoQ3ptZ2Z0TFV4cGhOUjVXd3lXd2haMHpwS2VFM2xNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZCRG14UnE4NS9PS0ErZlpGWUFid2ZGQnJua3ZzMDRlRm94dEl0UzBJMFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InN2akVsR0owTEk4eVQxYmNGOFF5NTNMNFFScHFLYXgzWDRYRFY5QnF4VWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0JocGdqRW1xT01DcENPU2FseVJmdDF6bGQvL2xyalZtVXJoR05vRWIzcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieDRTSUt4NjZuMExhZEhvSWgrYjZHcVBlWlpFV0oyNVF2dEw1blBzZGwwND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtPVzhhMzF1N0xOeHdtbklhZkNtRGl4amd5U1lmR2NVbEltZkRFSDhtSlVXU3REdVlEcWNYRE0yQnNGU0xSQU5GWUtkRFlNQXdGU3Z0eEo2Mi9kb2pnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQzLCJhZHZTZWNyZXRLZXkiOiI2amJ6aUx4c3hKOEVseTVhaTRqN0RxTXcxcGZuR1MrbVJQOCswQkpXaGt3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIybGc4RUhPdlRmZWRNQU1idUtMMl9nIiwicGhvbmVJZCI6ImU3MWZkODA3LTRjZGQtNDNiNy05N2JiLWM3ODFiZTliODgzOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrVTJSaVNZdHVRdkRHMWEwakNDcFNubk96Ync9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVh1QkZvMGxOWWpBeW9wODVLRng4Nk8rVlhZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkNWSlAyODhRIiwibWUiOnsiaWQiOiIyNzg0NTQzMjQxMTo2M0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTU9kaHM4RkVPYWp0Y0FHR0JvZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNGJqTktmVDlwdTJHYXBBWW1rSVo5QzByRzd4NTQwaHZVbkprZDdWSk5Icz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWGVIcFJEeUsrVDFNNkFFeDlNNm4yY3RhazN2ZDEwejI5ajlyUSs4Q0w0UmlNeEMySHlKZUdJQ2trUXFoYmNxZy9saGtQUU84aFZreDlWQzNrbnFHQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6IklBdml0eWxnQkx0VnBNUHp2OUV1WkVyeTV5OCtJRE1tMmh3OFRKZm9KWXVRVlJud0lqY1BnS1ZZUFhYRWVER1o0ODRXVDZ2cUViUmJoQmpGZ2N4SGp3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc4NDU0MzI0MTE6NjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZUc0elNuMC9hYnRobXFRR0pwQ0dmUXRLeHU4ZWVOSWIxSnlaSGUxU1RSNyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTcwMzQxMn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "xh_clinton",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254735342808",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
