import { connect } from 'react-redux';
import Quotes from '../components/Quotes';

const mapStateToProps = (state, ownProps) => {
    return {
        statistics: state.dashboard.statistics,
        connectedToServer: state.dashboard.connectedToServer,
        view: state.dashboard.view,
        title: ownProps.title,
        symbol: ownProps.symbol
    };
};

export default connect(mapStateToProps)(Quotes);
