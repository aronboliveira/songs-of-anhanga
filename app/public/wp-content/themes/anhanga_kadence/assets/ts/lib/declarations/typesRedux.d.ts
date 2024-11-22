export type AppReducer = Reducer<
  StoreStateConfiguration,
  Action<string>,
  Partial<StoreStateConfiguration>
>;

export type AppThunk = ThunkDispatch<StoreStateConfiguration, any, Action<any>>;
