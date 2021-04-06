'use strict';
const { RegPatterns } = require('./constants');

exports.datePostfix = (num) => {
       const str_num = num.toString(),
              end = parseInt(str_num[str_num.length - 1]);
       if (num > 3 && num < 21) return 'th';
       if (end === 0 || (end > 3 && end <= 9)) return 'th';
       return ['st', 'nd', 'rd'][(num % 10) - 1];
};

exports.getId = (str) => {
       const { isRole, isChannel, isUser, isAllNumbers } = RegPatterns;
       if (isRole.test(str)) return str.substring(3, str.length - 1);
       if (isChannel.test(str) || isUser.test(str)) return str.substring(2, str.length - 1);
       if (isAllNumbers.test(str)) return str;
       else return '';
};

exports.splitAtIndex = (str, index) => ({
       first: str.substring(0, index),
       last: str.substring(index, str.length).trim()
});

exports.shuffleArr = (arr) => {
       for (let index = arr.length - 1; index > 0; index--) {
              const randIndex = Math.floor(Math.random() * index);
              [arr[randIndex], arr[index]] = [arr[index], arr[randIndex]];
       }
       return arr;
};

exports.parseUsers = (str) => {
       const re = '((\\s*<@\\d+>\\s*)|(\\s*\\d+\\s*))';
       const isAllUsers = new RegExp(`^${re}+$`);
       if (!isAllUsers.test(str)) return null;
       const mapFn = (e) => e.replace(/(\s|\n)/g, '');
       return str.match(new RegExp(re, 'g')).map(mapFn);
};
