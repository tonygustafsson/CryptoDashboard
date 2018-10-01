import { connect } from 'react-redux';
import ActiveUsers from '../components/ActiveUsers';

const mapStateToProps = state => {
    return {
        locations: state.dashboard.statistics.activeUsers,
        loading: state.dashboard.loading,
        connectedToServer: state.dashboard.connectedToServer,
        view: state.dashboard.view
    };
};

export default connect(mapStateToProps)(ActiveUsers);
