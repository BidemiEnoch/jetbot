const units = require('./units.json');
const replaceUnit = require('./replaceUnit');

module.exports = (str) => {
       if (!/(\d+)[a-zA-Z]/.test(str)) throw new Error('invalid values were provided');

       let [value, unit] = str.match(/\d+|.+/g);
       value = parseInt(value);
       unit = replaceUnit(unit);
       const unitValue = units[unit];
       return unitValue * value;
};
