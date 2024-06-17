export function processOperator(operator: string, value: any, key: string) {
    let customFilters = {};
    switch (operator.toLowerCase()) {
      case 'gt':
        customFilters[key] = { $gt: value };
        break;
      case 'gte':
        customFilters[key] = { $gte: value };
        break;
      case 'lt':
        customFilters[key] = { $lt: value };
        break;
      case 'lte':
        customFilters[key] = { $lte: value };
        break;
      case 'ne':
        customFilters[key] = { $ne: value };
        break;
      case 'eq':
        customFilters[key] = { $eq: value };
        break;
      case 'true':
        customFilters[key] = true;
        break;
      case 'like':
        customFilters[key] = { $regex: new RegExp(value, 'i') };
        break;
      case 'false':
        customFilters[key] = false;
        break;
      default:
        customFilters[key] = value;
        break;
    }
    return customFilters;
  }