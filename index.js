#!/usr/bin/env node
const fs = require('fs');
const wkt = require('wellknown');
const JSONStream = require('JSONStream');

let args = process.argv.slice(2);

if(args.length != 1) {
    console.error("Usage: <input>");
    process.exit(1);
}

let target = args[0];
let input = fs.createReadStream(target + ".geojson", {encoding: 'utf8'});
let processor = require('./' + target + '.js');
let output = fs.createWriteStream(target + ".tsv");

console.log(`Transforming GeoJSON...`)

input.pipe(JSONStream.parse('features.*', x => {
    let cols = processor.map((fun) => fun(x.properties))
    cols.push("SRID=4326;" + wkt.stringify(x.geometry))
    return cols.join("\t") + "\n";
})).pipe(output);
