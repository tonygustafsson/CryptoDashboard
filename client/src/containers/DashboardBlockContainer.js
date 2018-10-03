import React from 'react';
import PropTypes from 'prop-types';
import DashboardBlock from '../components/DashboardBlock';

class DashboardBlockContainer extends React.Component {
    static propTypes = {
        heading: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        text: PropTypes.string,
        size: PropTypes.string
    };

    componentWillMount() {
        this.setState({
            animate: false
        });
    }

    componentWillUpdate() {
        if (this.state.animate) return;

        this.setState({
            animate: true
        });

        setTimeout(() => {
            this.setState({
                animate: false
            });
        }, 1000);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.heading !== this.props.heading || nextState.animate !== this.state.animate;
    }

    render() {
        return (
            <DashboardBlock
                size={this.props.size}
                animate={this.state.animate}
                heading={this.props.heading}
                text={this.props.text}
            />
        );
    }
}

export default DashboardBlockContainer;
