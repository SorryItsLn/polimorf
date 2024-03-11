/**
 * A handler function receiving context as input and returning a primitive
 */
export type PolymorpheusHandler<C extends object> = (context: C) => string | number;
