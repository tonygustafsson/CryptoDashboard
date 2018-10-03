import { connect } from 'react-redux';
import GlobalMarket from '../components/GlobalMarket';

const mapStateToProps = state => {
    return {
        statistics: state.dashboard.statistics,
        connectedToServer: state.dashboard.connectedToServer,
        view: state.dashboard.view
    };
};

export default connect(mapStateToProps)(GlobalMarket);
