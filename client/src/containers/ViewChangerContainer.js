import { connect } from 'react-redux';
import { autoChangeView, changeView } from '../actions';
import ViewChanger from '../components/ViewChanger';
import * as constants from '../constants';

let nextView = null,
    autoUpdateViewTimer = null,
    autoUpdateViews = false;

const mapStateToProps = state => {
    autoUpdateViews = state.dashboard.autoUpdateViews;

    if (autoUpdateViews) {
        let views = Object.values(constants.VIEWS),
            viewIndexOf = views.indexOf(state.dashboard.view),
            nextViewIndex = viewIndexOf === views.length - 1 ? 0 : viewIndexOf + 1;

        nextView = views[nextViewIndex];
    }

    return {
        view: state.dashboard.view,
    };
};

const mapDispatchToProps = dispatch => {
    autoUpdateViewTimer = setInterval(() => {
        if (!autoUpdateViews) {
            clearInterval(autoUpdateViewTimer);
            return;
        }

        dispatch(autoChangeView(nextView, true));
    }, constants.AUTOUPDATEVIEWTIMEOUT);

    return {
        changeView: (view) => dispatch(changeView(view)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewChanger);
