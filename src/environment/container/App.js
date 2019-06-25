import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/counter';
import * as CounterActions from '../actions';

const mapStateToProps = (state) => ({
	counter: state.counter
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
