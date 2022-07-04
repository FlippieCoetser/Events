module.exports = function(wallaby) {
    return {
        files: [
            "importmap.js",
            "src/**/*.ts",
            "node_modules/@browser-modules/dictionary/lib/dictionary.js"
        ],
        tests: [
            "test/*.ts"
        ],
        filesWithNoCoverageCalculated: ['node_modules/@browser-modules/dictionary/lib/dictionary.js'], 
        compilers: {
            '**/*.ts': wallaby.compilers.typeScript({
                "module": "es2020",
                "target": "es2020",
                "sourceMap": true,
                "inlineSources": true
            })
        }
    };
}