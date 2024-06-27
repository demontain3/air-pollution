// export function processOperator(operator: string, value: any, key: string) {
//     let customFilters = {};
//     switch (operator.toLowerCase()) {
//       case 'gt':
//         customFilters[key] = { $gt: value };
//         break;
//       case 'gte':
//         customFilters[key] = { $gte: value };
//         break;
//       case 'lt':
//         customFilters[key] = { $lt: value };
//         break;
//       case 'lte':
//         customFilters[key] = { $lte: value };
//         break;
//       case 'ne':
//         customFilters[key] = { $ne: value };
//         break;
//       case 'eq':
//         customFilters[key] = { $eq: value };
//         break;
//       case 'true':
//         customFilters[key] = true;
//         break;
//       case 'like':
//         customFilters[key] = { $regex: new RegExp(value, 'i') };
//         break;
//       case 'false':
//         customFilters[key] = false;
//         break;
//       default:
//         customFilters[key] = value;
//         break;
//     }
//     return customFilters;
//   }
import mongoose from 'mongoose';

export function processOperator(operator: string, value: string | number, key: string) {
  let finalValue: string | number | mongoose.Types.ObjectId = !isNaN(Number(value)) ? Number(value) : value;

  // Convert _id fields to ObjectId
  if (key.split('.').includes('_id') && mongoose.Types.ObjectId.isValid(String(value))) {
    finalValue = new mongoose.Types.ObjectId(String(value));
  }

  switch (operator) {
    case 'eq':
    case '=':
      return { [key]: finalValue };
    case 'ne':
      return { [key]: { $ne: finalValue } };
    case 'gt':
      return { [key]: { $gt: finalValue } };
    case 'gte':
      return { [key]: { $gte: finalValue } };
    case 'lt':
      return { [key]: { $lt: finalValue } };
    case 'lte':
      return { [key]: { $lte: finalValue } };
    case 'in':
      return { [key]: { $in: String(value).split(',').map(val => !isNaN(Number(val)) ? Number(val) : val) } };
    case 'nin':
      return { [key]: { $nin: String(value).split(',').map(val => !isNaN(Number(val)) ? Number(val) : val) } };
    case 'like':
      return { [key]: new RegExp(String(value), 'i') }; // Case-insensitive regex search
    case 'or':
      return { $or: String(value).split(',').map(val => ({ [key]: !isNaN(Number(val)) ? Number(val) : val })) };
    case 'and':
      return { $and: String(value).split(',').map(val => ({ [key]: !isNaN(Number(val)) ? Number(val) : val })) };
    default:
      return { [key]: finalValue };
  }
}