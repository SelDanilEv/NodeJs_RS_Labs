const commander = require('commander');
const program = new commander.Command();
const encryption = require('./encryption')
const logger = require('./logger')
const fm = require('./file_manager')
const fs = require('fs')
const {pipeline, Transform} = require('stream')

program
    .storeOptionsAsProperties(false)
    .passCommandToAction(false)
    .option('-d, --debug', 'output extra debugging')
    .requiredOption('-s, --shift <number>', 'shift to Caesar cipher')
    .requiredOption('-a, --action <action>', 'What to do')
    .option('-i, --input <file>', 'Input file')
    .option('-o, --output <file>', 'output file');

program.parse(process.argv);

const programOptions = program.opts();

if (programOptions.debug) console.log(programOptions);

if (!['encode', 'decode'].includes(programOptions.action)) {
    logger.printError(
        'ERROR: invalid parameter action. Valid values: encode,decode'
    );
    process.exit(1);
}

if (programOptions.input)
    if (!fm.isExits(programOptions.input)) {
        logger.printError(
            'ERROR: file doesn\'t exist: ' + programOptions.input
        );
        process.exit(1);
    }

if (programOptions.output)
    if (!fm.isExits(programOptions.output)) {
        logger.printError(
            'ERROR: file doesn\'t exist: ' + programOptions.output
        );
        process.exit(1);
    }



const newTransform = new Transform({
        transform(chunk, encoding, callback) {
            let data;
            switch (programOptions.action) {
                case 'encode':
                    data = encryption.encode(chunk.toString(), +programOptions.shift);
                    break;
                case 'decode':
                    data = encryption.decode(chunk.toString(), +programOptions.shift);
                    break;
            }
            callback(null, data);
        }
    }
);

pipeline(
    programOptions.input ? fs.createReadStream(programOptions.input) : process.stdin,
    newTransform,
    programOptions.output ? fs.createWriteStream(programOptions.output) : process.stdout,
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
            process.exit(1)
        }
    }
)


