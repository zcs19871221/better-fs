const path = require('path');
const remove = require('../dist/remove_sync').default;

remove(path.join(__dirname, '../dist'));
