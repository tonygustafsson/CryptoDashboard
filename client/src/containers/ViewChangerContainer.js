import { connect } from 'react-redux';
import ViewChanger from '../components/ViewChanger';
import { changeView } from '../actions';

const mapStateToProps = state => {
    return {
        view: state.dashboard.view
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeView: view => dispatch(changeView(view))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewChanger);
