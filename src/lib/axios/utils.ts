import {
  cloneDeep,
  isArray,
  isNull,
  isUndefined,
  join,
  map
} from "es-toolkit/compat";

// URL
export const genreateBasePath = (path: string) => `/${path}`;
export const generateURL = (path: string, query = "") => path + "?" + query;
export const generatePathByBase = (base: string, ...paths: string[]) =>
  join([base, ...paths], "/");
export const sanitizeQueryObj = (dict: {
  [key in any]: string | number | boolean | null | any[];
}) => {
  const copy = cloneDeep(dict);
  const entried = Object.entries(dict);
  for (const [key, value] of entried) {
    if (isUndefined(value) || isNull(value)) {
      delete copy[key];
    } else if (isArray(value) && value.length === 0) {
      delete copy[key];
    } else if (value === "") {
      delete copy[key];
    }
  }

  return copy;
};
export const generateQueryParams = (dict: {
  [key in string]: string | number | boolean | any[];
}) => {
  const kvJoin = (kv: [string, any]) => join(kv, "=");
  const andJoin = (queries: string[]) => join(queries, "&");

  const result = andJoin(
    map(Object.entries(sanitizeQueryObj(dict)), ([k, v]) =>
      isArray(v)
        ? v.reduce((prev, cur) => andJoin([prev, kvJoin([k, cur])]), "")
        : kvJoin([k, v])
    )
  );

  return result;
};

type RequireField<T, K extends keyof T> = Pick<T, K>;

interface RequestOptions<D, P, Q> {
  data: D;
  pathParams: P;
  query: Q;
}

/** @RequestOption data property만 사용해 요청하는 경우 */
export type RoOnlyDataType<D> = RequireField<
  RequestOptions<D, object, object>,
  "data"
>;
/** @RequestOption pathParams property만 사용해 요청하는 경우 */
export type RoOnlyPathParamsType<P> = RequireField<
  RequestOptions<object, P, object>,
  "pathParams"
>;
/** @RequestOption query property만 사용해 요청하는 경우 */
export type RoOnlyQueryType<Q> = RequireField<
  RequestOptions<object, object, Q>,
  "query"
>;

/** @RequestOption data, pathParams property를 사용해 요청하는 경우 */
export type RoDataAndPathParamsType<D, P> = RequireField<
  RequestOptions<D, P, object>,
  "data" | "pathParams"
>;
/** @RequestOption data, query property를 사용해 요청하는 경우 */
export type RoDataAndQueryType<D, Q> = RequireField<
  RequestOptions<D, object, Q>,
  "data" | "query"
>;
/** @RequestOption pathParams, query property를 사용해 요청하는 경우 */
export type RoPathParamsAndQueryType<P, Q> = RequireField<
  RequestOptions<object, P, Q>,
  "pathParams" | "query"
>;

/** @RequestOption 모든 property를 사용해 요청하는 경우 */
export type RoAllType<D, P, Q> = RequestOptions<D, P, Q>;
