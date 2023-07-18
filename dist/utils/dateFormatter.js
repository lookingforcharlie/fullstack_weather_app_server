"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formattedDateHistory = exports.formattedDateYesterday = void 0;
// create a date for yesterday formatted in yyyy-mm-dd
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1);
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
exports.formattedDateYesterday = `${year}-${month}-${day}`;
// create a date 5 days ago formatted in yyyy-mm-dd
const currentDateHistory = new Date();
currentDateHistory.setDate(currentDateHistory.getDate() - 5);
const yearHistory = currentDateHistory.getFullYear();
const monthHistory = String(currentDateHistory.getMonth() + 1).padStart(2, '0');
const dayHistory = String(currentDateHistory.getDate()).padStart(2, '0');
exports.formattedDateHistory = `${yearHistory}-${monthHistory}-${dayHistory}`;
//# sourceMappingURL=dateFormatter.js.map