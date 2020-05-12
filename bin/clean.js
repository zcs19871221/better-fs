const path = require('path');
const remove = require('./util/remove_sync').default;

remove(path.join(__dirname, '../dist'));
