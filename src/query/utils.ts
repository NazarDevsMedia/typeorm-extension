import {Parameter, ParameterType, ParseOutput} from "@trapi/query";

import {
    applyQueryFieldsParseOutput,
    applyQueryPaginationParseOutput,
    applyQueryRelationsParseOutput,
    applyQueryFiltersParseOutput
} from "./parameter";

import {SelectQueryBuilder} from "typeorm";

export function applyQueryParseOutput<T>(
    query: SelectQueryBuilder<T>,
    context: ParseOutput
) : ParseOutput {
    for(const key in context) {
        switch (key as ParameterType) {
            case Parameter.FIELDS:
                applyQueryFieldsParseOutput(query, context.fields);
                break;
            case Parameter.FILTERS:
                applyQueryFiltersParseOutput(query, context.filters);
                break;
            case Parameter.PAGINATION:
                applyQueryPaginationParseOutput(query, context.pagination);
                break;
            case Parameter.RELATIONS:
                applyQueryRelationsParseOutput(query, context.relations);
                break;
            case Parameter.SORT:
                applyQueryRelationsParseOutput(query, context.sort);
                break;
        }
    }

    return context;
}
