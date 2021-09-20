import * as fs from 'fs';
import * as path from 'path';
import DxfDocument  from '../lib';


let dxfNames = fs.readdirSync('./tests/data').filter(name => name.endsWith('.dxf'));
let dxfDoc = new DxfDocument();

dxfNames.forEach(name => {
    let destPath = path.join('./tests/ret', `${name}.json`);
    let dxfValue = fs.readFileSync(path.join('./tests/data', name), 'utf-8');
    dxfDoc.parse(dxfValue);
    fs.writeFileSync(destPath, JSON.stringify(dxfDoc));
})