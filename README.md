# `ts-dxf`

[![npm](https://img.shields.io/npm/v/ts-dxf)](https://www.npmjs.com/package/ts-dxf)

A ts lib to parse dxf in browser

## install

```
npm install ts-dxf
```

## use

``` ts
let datas = ...; // from dxf file
let dxfDoc = new DxfDocument();

dxfDoc.parse(datas);

// get lwpolyline
dxfDoc.entities.get('LWPOLYLINE');

// get layers
dxfDoc.layers;
```

## continue ...

support export *.dxf file