import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from '../reducers';

const configureStore = (preloadedState) => {

	const store = createStore(
		mainReducer,
		preloadedState,
		applyMiddleware(thunk)
	);

	if (module.hot) {
    
		module.hot.accept('../reducers', () => {
			
			store.replaceReducer(mainReducer);

    });
    
	}

  return store;
  
}

export default configureStore;
