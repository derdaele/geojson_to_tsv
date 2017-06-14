#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const wkt = require('wellknown');
const JSONStream = require('JSONStream');

let args = process.argv.slice(2);

if(args.length != 1) {
    console.error("Usage: <input>");
    process.exit(1);
}

let target = args[0];
let input = fs.createReadStream(target + ".geojson", {encoding: 'utf8'});
let processor = require(path.join(process.cwd(), target + '.js'));
let output = fs.createWriteStream(target + ".tsv");
console.log(`Transforming GeoJSON...`)

input.pipe(JSONStream.parse('features.*', x => {
    let cols = processor.map((col) => {
        switch(typeof col) {
            case "function":
                return col(x.properties);
            case "string":
                return x.properties[col];
            default:
                throw "Column definition must be a string or a function";
        }
    })
    cols.push("SRID=4326;" + wkt.stringify(x.geometry));
    return cols.join("\t") + "\n";
})).pipe(output);
