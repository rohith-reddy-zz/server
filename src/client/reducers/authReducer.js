import { FETCH_CURRENT_USER } from '../actions';

export default (state=null, action) => {
	switch(action.type){
		case FETCH_CURRENT_USER:
			return action.payload.data || false; 
			// returns data only if the user is authenticated and hence action.payload.data becomes undefined incase the user is not authenticated
		default:
			return state;
	}
};