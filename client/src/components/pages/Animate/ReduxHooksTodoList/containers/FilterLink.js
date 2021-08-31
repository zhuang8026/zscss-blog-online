import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Link from '../components/Link';

/**
 *  請注意
 * connect(state, action) -> 只會取得 state 和 dispatch
 * ownProps 是上層 父元件中包入的 內容
 * <父元件> ownProps inner <父元件>
 */

const mapStateToProps = (state, ownProps) => {
    console.log('state:', state);
    console.log('ownProps:', ownProps); // ownProps 來自於 <XXXX 我是ownProps="我是ownProps">

    return {
        active: ownProps.filter === state.visibilityFilter
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter));
        }
    };
};

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default FilterLink;
