/* eslint-disable react/prop-types */
import { lazy, Suspense, useContext, useEffect } from "react";
import { ReactReduxContext } from "react-redux";

export function LazyLoadRoutes({ reducers = [], sagas = [], componentName }) {
  const { store } = useContext(ReactReduxContext);

  useEffect(() => {
    return () => {
      store.reducerManager.remove(reducers);
      store.sagaManager.cancelSaga(sagas);
    }
  });

  const LazyElement = lazy(() => {
    const reducerPromises = reducers.map((reducer) => {
      return import(`./redux/reducers/${reducer}.reducer.js`).then((module) => {
        return { type: "reducer", name: reducer, module: module.default };
      });
    });

    const sagaPromises = sagas.map((saga) => {
      return import(`./redux/sagas/${saga}.saga.js`).then((module) => {
        return { type: "saga", name: saga, module: module.default };
      });
    });

    return Promise.all([...reducerPromises, ...sagaPromises]).then((items) => {
      const AsyncReducers = {};
      const asyncSagas = {};

      items.forEach((eachItem) => {
        if (eachItem.type === "reducer") {
          AsyncReducers[eachItem.name] = eachItem.module;
        }
        if (eachItem.type === "saga") {
          asyncSagas[eachItem.name] = eachItem.module;
        }
      });
      store.reducerManager.add(AsyncReducers);
      store.sagaManager.runSaga(asyncSagas);

      return import(`./pages/${componentName}/${componentName}.jsx`);
    });
  });

  return (
    <Suspense fallback="Loading...">
      <LazyElement />
    </Suspense>
  );
}
