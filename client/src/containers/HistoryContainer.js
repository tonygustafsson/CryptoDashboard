import { connect } from 'react-redux';
import History from '../components/History';

const mapStateToProps = state => {
    return {
        statistics: state.dashboard.statistics,
        connectedToServer: state.dashboard.connectedToServer,
        view: state.dashboard.view,
    };
};

export default connect(mapStateToProps)(History);
