import { connect } from 'react-redux';
import ETHQuotes from '../components/ETHQuotes';

const mapStateToProps = state => {
    return {
        statistics: state.dashboard.statistics,
        connectedToServer: state.dashboard.connectedToServer,
        view: state.dashboard.view
    };
};

export default connect(mapStateToProps)(ETHQuotes);
