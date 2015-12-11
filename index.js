var yaml = require('js-yaml');
var fs = require('fs');

var baseConfiguration = fs.readFileSync('./conf/base.yaml', 'utf-8');
baseConfiguration += '\n\n' + fs.readFileSync('./conf/settings.yaml', 'utf-8');


console.log('Original', baseConfiguration);
console.log('\n\n');

// replacement for "shorthand"
var matcher = /^(\w+(\.\w+)+:)/gm;
var expandedConfiguration = baseConfiguration.replace(matcher, function(match) {
    var result = '';
    var isStart = true;
    var indent = '';
    var parts = match.replace(':', '').split('.');
    for (var part in parts) {
        result += (!isStart ? '\n' : '') + indent + parts[part] + ':';
        isStart = false;
        indent += '    ';
    }
    return result;
});

console.log('Expanded', expandedConfiguration);
console.log('\n\n');

var settings = yaml.safeLoad(expandedConfiguration);
console.log('Settings', JSON.stringify(settings, null, 2));


// load base configuration with "all settings" in it
// append "overlay" on top of object, via extend???