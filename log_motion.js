const child = require("child_process")
const winston = require("winston");

const { format } = winston;
const { combine, timestamp, prettyPrint, printf } = format;

const PORT = 25;
main();

async function main() {
    const myFormat = printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message.replaceAll('\n', '')}`;
    });
    const logger = winston.createLogger({
        format: combine(
            timestamp(),
            myFormat
        ),
        level: 'info',
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: `logs/gpio.log` })
        ]
    });

    while (true) {
        try {
            const { stdout, stderr } = await getLog();
            logger.info(stdout);

        } catch (e) {
            logger.error(e);
        }
        await delay(1000);
    }
}
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function getLog() {
    return new Promise((resolve, reject) => {
        child.exec(`raspi-gpio get ${PORT}`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            resolve({ stdout, stderr })
        });
    })
}