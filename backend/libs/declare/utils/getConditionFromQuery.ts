import { set } from 'lodash';

const DATA = 'data';

export interface AddKeyValueInObjectProps<Entity> {
  stack: string[];
  relations: Record<string, boolean>;
  select: Record<string, boolean>;
  expandRelation?: boolean;
  hasCountType?: boolean;
}

export interface GetInfoFromQueryProps<Entity> {
  relations: Record<string, boolean>;
  select: Record<string, boolean>;
}

const addKeyValuesInObject = <Entity>({
  stack,
  relations,
  select,
  expandRelation,
  hasCountType,
}: AddKeyValueInObjectProps<Entity>): GetInfoFromQueryProps<Entity> => {
  if (stack.length) {
    let stackToString = stack.join('.');

    if (hasCountType) {
      if (stack[0] !== DATA || (stack.length === 1 && stack[0] === DATA)) {
        return { relations, select };
      }
      stackToString = stackToString.replace(`${DATA}.`, '');
    }

    if (expandRelation) {
      relations[stackToString] = true;
    }

    select[stackToString] = true;
  }

  return { relations, select };
};

export const getInfoFromQuery = <Entity>(
  query: string,
  hasCountType?: boolean,
): GetInfoFromQueryProps<Entity> => {
  // Assuming a simple parsing logic for REST queries
  const splitted = query.split(',');

  const stack = [];

  return splitted.reduce(
    (acc, line) => {
      const replacedLine = line.trim();

      stack.push(replacedLine);

      return addKeyValuesInObject({
        stack,
        relations: acc.relations,
        select: acc.select,
        expandRelation: true,
        hasCountType,
      });
    },
    {
      relations: {},
      select: {},
    },
  );
};
