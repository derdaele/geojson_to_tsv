# geojson_to_tsv

Dead simple script (or snippet) to transform a geojson FeaturesCollection into a TSV

## Getting started

A column containing geographical data will always be generated however each data source must define how to read other kind of data, from the "properties" of a given Feature.

Example:
I want to transform schools.geojson, I create a script schools.js
```javascript
module.exports = [
    (x) => x.IDTYPE,
    (x) => JSON.stringify({
        name: x.appellatio,
        public: x.priv_public == null
    })
]
```

then I run
```bash
$ geojson_to_tsv samples/schools
```