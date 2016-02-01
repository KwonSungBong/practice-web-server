import React, {Component, PropTypes} from 'react'; 
import {connect} from 'react-redux'; 
import {pushState} from 'redux-router'; 

export function requireAuthentication(ViewComponent){
	class AuthenticatedComponent extends Component {
		componentWillMount(){
			this.checkAuth();
		}
		
		componentWillReceiveProps(nextProps){
			this.checkAuth();
		}
		
		checkAuth(){
			if (!this.props.isAuthenticated) { 
				 let redirectAfterLogin = this.props.location.pathname; 
				 this.props.dispatch(pushState(null, `/login?next=${redirectAfterLogin}`)); 
			} 
		}
		
		render(){
			return (
				<div>
					<ViewComponent {...this.props}/>
				</div>
			)
		}
	}
	
	const mapStateToProps = (state) => ({
		token: state.auth.token,
		isAuthenticated: state.auth.isAuthenticated
	})
	
	return connect(mapStateToProps)(AuthenticatedComponent);
}
