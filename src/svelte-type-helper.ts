// ----------------------------------------------------------------------
// type utilities.
// ----------------------------------------------------------------------

// fooBar => FooBar
type Capitalize<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S;

type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
    ? F[K]
    : never;
};

// ----------------------------------------------------------------------
// Define dispatcher type from svelte props.
// ----------------------------------------------------------------------

// 'a' | 'b' | 'c' => () => 'a' & () => 'b' & () => 'c'
type UnionToIntersectionFn<U> = (
  U extends unknown ? (k: () => U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

// 'a' | 'b' | 'c' => 'c'
type GetLastUnion<U> = UnionToIntersectionFn<U> extends () => infer R
  ? R
  : never;

type GetSingleDispatcherPublisherType<P, U extends keyof P> = {
  change: {
    type: U;
    value: P[U];
  };
};

export type GetDispatcherPublisherType<
  P extends Record<string, unknown>,
  Keys extends keyof P = keyof P,
  T = undefined
> = [Keys] extends [never]
  ? T
  : GetLastUnion<Keys> extends Keys
  ? T extends undefined
    ? GetDispatcherPublisherType<
        P,
        Exclude<Keys, GetLastUnion<Keys>>,
        GetSingleDispatcherPublisherType<P, GetLastUnion<Keys>>
      >
    : GetDispatcherPublisherType<
        P,
        Exclude<Keys, GetLastUnion<Keys>>,
        T | GetSingleDispatcherPublisherType<P, GetLastUnion<Keys>>
      >
  : never;

type GetSingleDispatcherSubscriberDetailType<P, U extends keyof P> = {
  type: U;
  value: P[U];
};

type GetDispatcherSubscriberDetailType<
  P extends Record<string, unknown>,
  Keys extends keyof P = keyof P,
  T = undefined
> = [Keys] extends [never]
  ? T
  : GetLastUnion<Keys> extends Keys
  ? T extends undefined
    ? GetDispatcherSubscriberDetailType<
        P,
        Exclude<Keys, GetLastUnion<Keys>>,
        GetSingleDispatcherSubscriberDetailType<P, GetLastUnion<Keys>>
      >
    : GetDispatcherSubscriberDetailType<
        P,
        Exclude<Keys, GetLastUnion<Keys>>,
        T | GetSingleDispatcherSubscriberDetailType<P, GetLastUnion<Keys>>
      >
  : never;

export type GetDispatcherSubscriberType<P extends Record<string, unknown>> = (
  event: "change",
  handler: (event: { detail: GetDispatcherSubscriberDetailType<P> }) => void
) => void;

// ----------------------------------------------------------------------
// Define svelte wrapper component's props from svelte props.
// ----------------------------------------------------------------------

type GetSingleSvelteWrapperProps<
  P extends Record<string, unknown>,
  U extends keyof P
> = U extends string
  ? Merge<
      {
        [key in U]: P[U];
      },
      { [key in `onChange${Capitalize<U>}`]: (key: P[U]) => void }
    >
  : never;

export type GetSvelteWrapperProps<
  P extends Record<string, unknown>,
  Keys extends keyof P = keyof P,
  T = undefined
> = [Keys] extends [never]
  ? T
  : GetLastUnion<Keys> extends Keys
  ? T extends undefined
    ? GetSvelteWrapperProps<
        P,
        Exclude<Keys, GetLastUnion<Keys>>,
        GetSingleSvelteWrapperProps<P, GetLastUnion<Keys>>
      >
    : GetSvelteWrapperProps<
        P,
        Exclude<Keys, GetLastUnion<Keys>>,
        Merge<T, GetSingleSvelteWrapperProps<P, GetLastUnion<Keys>>>
      >
  : never;
