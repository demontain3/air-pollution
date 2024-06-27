// import { PopulateOptions } from "mongoose";

// export interface FindOptions {
//     projection?: any;
//     limit?: number;
//     skip?: number;
//     sort?: any;
//     populate?: string | PopulateOptions | (string | PopulateOptions)[];
//     customFilters?: any; // Additional custom filters if needed
//   }
  
import { PopulateOptions } from 'mongoose';

export interface FindOptions {
  projection?: any;
  limit?: number;
  skip?: number;
  sort?: any;
  populate?: string | PopulateOptions | (string | PopulateOptions)[];
  customFilters?: any; // Additional custom filters if needed
}