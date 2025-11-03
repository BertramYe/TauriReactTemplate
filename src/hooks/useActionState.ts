import React from "react";
import useMessager, { type TMessager } from "./useMessager";

type TState = TMessager & TResponse<TObject>

interface IAction<T, S = TState> {
  (prev: S, formData: T): TState | void | Promise<TState | void>;
}

/**
 * defined the Hook: useActionState
 * support aync action、void return
 */
const useActionState = <TInput,S extends TState= TState>(action: IAction<TInput, S>, initialState?: S, permalink?: string ) => {
  const [state, dispatch, isPending] = React.useActionState<S, TInput>(action as any, initialState as any, permalink);

  // pass message into the useMessager to show the message
  useMessager(state);

  return [state, dispatch, isPending] as const;
}

export default useActionState;


export {
  type TState,
  type IAction
}
