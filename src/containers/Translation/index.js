import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { getTranslationList } from './store/action'

class Translation extends React.Component {
	componentDidMount() {
		if (!this.props.list.length) {
			this.props.getTranslationList()
		}
	}
	getList() {
		const { list } = this.props
		return list.map(item => <li key={item.id}>{item.title}</li>)
	}
	render() {
		if (this.props.login) {
			return (
				<div>
					<ul style={{color: 'skyblue'}}>
						{ this.getList() }
					</ul>
					<button onClick={() => { alert('click') }}>click</button>
				</div>
			)
		} else {
			// 跳转到首页
			return <Redirect to='/' />
		}
	}
}

Translation.loadData = (store) => {
	console.log('Translation.loadData')
	return store.dispatch(getTranslationList())
}

const mapStateToProps = (state) => ({
	list: state.translation.translationList,
	login: state.header.login
})

const mapDispatchToProps = (dispatch) => ({
	getTranslationList() {
		dispatch(getTranslationList())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Translation)