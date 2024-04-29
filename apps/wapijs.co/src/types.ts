import { Excerpt } from "@microsoft/api-extractor-model";
import { DocSection } from "@microsoft/tsdoc";

export interface ResolvedParameter {
    description?: DocSection | undefined;
    isOptional: boolean;
    name: string;
    parameterTypeExcerpt: Excerpt;
}