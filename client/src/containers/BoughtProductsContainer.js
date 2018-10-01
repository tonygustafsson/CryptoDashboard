import { connect } from 'react-redux';
import { } from '../actions';
import BoughtProducts from '../components/BoughtProducts';

const mapStateToProps = state => {
    return {
        products: state.dashboard.statistics.products,
        loading: state.dashboard.loading,
        connectedToServer: state.dashboard.connectedToServer,
        view: state.dashboard.view,
    };
};

export default connect(mapStateToProps)(BoughtProducts);
