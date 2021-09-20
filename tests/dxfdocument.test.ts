import * as fs from 'fs';
import * as path from 'path';
import DxfDocument from '../lib';

describe('dxf parse', () => {
    test('all data/*.dxf parse to res/*.json', () => {
        let dxfNames = fs.readdirSync('./tests/data').filter(name => name.endsWith('.dxf'));
        let dxfDoc = new DxfDocument();

        dxfNames.forEach(name => {
            let destPath = path.join('./tests/res', `${name}.json`);
            let dxfValue = fs.readFileSync(path.join('./tests/data', name), 'utf-8');
            dxfDoc.parse(dxfValue);
            fs.writeFileSync(destPath, JSON.stringify(dxfDoc));
        })
    })
})