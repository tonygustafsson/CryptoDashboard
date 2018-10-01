import { connect } from 'react-redux';
import App from '../components/App';
import { fetchStatistics } from '../actions';

const mapStateToProps = state => {
    return {
        statistics: state.dashboard.statistics,
        loading: state.dashboard.loading,
        connectedToServer: state.dashboard.connectedToServer
    };
};

const mapDispatchToProps = dispatch => {
    dispatch(fetchStatistics());
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
