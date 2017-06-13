module.exports = [
    'IDTYPE',
    (x) => JSON.stringify({
        name: x.appellatio,
        public: x.priv_public == null
    })
]
