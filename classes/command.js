const perms = require('../jsons/permissions.json');
const categories = ['general', 'admin', 'info', 'utility', 'fun'];

class Command {
       constructor(category, args = '', hasOptionalArgs = false) {
              this.category = this.setCategory(category);
              this.args = args;
              this.hasOptionalArgs = hasOptionalArgs;
              this.isGuildOnly = true;
              this.access = 'public';
              this.perms = []; //array<string>
              this.description; //string
              this.run; //function
       }

       setPerms(array) {
              const isValidArray = array.every((e) => perms.includes(e));
              if (!isValidArray) throw new Error('invalid permissions were provided');
              this.perms = array;
       }

       setAccess(access) {
              if (!/^(public|admin|owner)+$/.test(access)) throw new Error('an invalid access was provided');
              this.access = access;
       }

       setFunc(func) {
              this.run = func;
       }

       setCategory(category) {
              if (!categories.includes(category)) throw new Error('an invalid category was provided');
              return category;
       }

       setDescription(description) {
              this.description = description;
       }
}

module.exports = Command;
