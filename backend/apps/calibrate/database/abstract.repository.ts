import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import {
  applyCustomFilters,
  applyLimit,
  applyPopulation,
  applyProjection,
  applySkip,
  applySort,
} from './find/find.methods';
import { FindOptions } from '../src/types';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
  }

  async getAll(
    filterQuery:  FilterQuery<any> = {},
    options: FindOptions = {},
  ): Promise<{ data: TDocument[]; total: number }> {
    try {
      console.log("here",filterQuery,options,)
      let query = this.model.find(filterQuery);
      query = applyProjection(query, options.projection);
      query = applyCustomFilters(query, options.customFilters);

      const countQuery = this.model.find(filterQuery);
      const total = await countQuery.countDocuments();

      query = applyLimit(query, options.limit);
      query = applySkip(query, options.skip);
      query = applySort(query, options.sort);
      query = applyPopulation(query, options.populate);

      const results = await query.lean<TDocument[]>(true);
      return { data: results, total };
    } catch (error) {
      console.log('Error finding documents', error);
      throw new Error('Failed to find documents');
    }
  }
}

// options: FindOptions = { limit: 10, skip: 1 }
