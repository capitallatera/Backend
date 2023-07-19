const { randomFillSync } = require('crypto');
const fs = require('fs');
const path = require('path');
const busboy = require('busboy');

// const random = (() => {
//     const buf = Buffer.alloc(16);
//     return () => randomFillSync(buf).toString('hex');
// })();

const uploadFile = (req, res) => {
    const bb = busboy({ headers: req.headers });
    let fileName = ''
    bb.on('file', (name, file, info) => {
        fileName = info.filename;
        const saveTo = path.join(__dirname, '..', 'public/images', `${info.filename}`)
        file.pipe(fs.createWriteStream(saveTo))
    });
    bb.on('close', () => {
        res.writeHead(200, {'Connection': 'close'});
        console.log('Endpoint : ', `/files/${fileName}`)
        res.end("File successfully uploaded!");
    });
    req.pipe(bb);
    return;
}

module.exports = uploadFile;