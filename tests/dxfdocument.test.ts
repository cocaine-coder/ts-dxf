import * as fs from 'fs';
import * as path from 'path';
import DxfDocument from '../lib';

const dataDir = './tests/data';
const resDir = './tests/res';

describe('dxf parse', () => {
    test('all data/*.dxf parse to res/*.json', () => {
        let dxfPaths = fs.readdirSync(dataDir).filter(name => name.endsWith('.dxf'));
        if(!fs.existsSync(resDir))
                fs.mkdirSync(resDir);

        let dxfDoc = new DxfDocument();
        dxfPaths.forEach(value => {
            let destPath = path.join(resDir, `${value}.json`);
            let dxfValue = fs.readFileSync(path.join(dataDir, value), 'utf-8');
            dxfDoc.parse(dxfValue);
            fs.writeFileSync(destPath, JSON.stringify(dxfDoc, null, "\t"));
        })
    })
})