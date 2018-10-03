import { connect } from 'react-redux';
import ErrorMessage from '../components/ErrorMessage';

const mapStateToProps = state => {
    return {
        connectedToServer: state.dashboard.connectedToServer
    };
};

export default connect(mapStateToProps)(ErrorMessage);
