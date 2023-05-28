//fix error SyntaxError: Cannot use import statement outside a module
//require fs
const fs = require('fs');
const us = require('./gz_2010_us_050_00_20m.json')
const counties = require('./custom.geo.json')

// copy us to another variable and save as output.json
const output = us;

// add a property to all properties  in output.features called POPULATION with a value of 0
output.features.forEach((feature) => {
    feature.properties.POPULATION = counties[feature.properties.NAME]
});
// console.log(output['features'][0]['properties'])
// add counties to output
// output.features = output.features.concat(counties.features);

// save output to file
fs.writeFileSync('output.json', JSON.stringify(output));
