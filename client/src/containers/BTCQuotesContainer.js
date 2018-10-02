import { connect } from 'react-redux';
import BTCQuotes from '../components/BTCQuotes';

const mapStateToProps = state => {
    return {
        statistics: state.dashboard.statistics,
        connectedToServer: state.dashboard.connectedToServer,
        view: state.dashboard.view,
    };
};

export default connect(mapStateToProps)(BTCQuotes);
