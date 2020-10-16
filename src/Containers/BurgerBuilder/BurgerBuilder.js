import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import * as actions from "../../store/actions/index"
import axios from "../../axios-orders"

import Auxiliary from "../../hoc/Auxiliary/Auxiliary"
import Burger from "../../Components/Burger/Burger"
import BuildControls from "../../Components/Burger/BuildControls/BuildControls"
import Modal from "../../Components/UI/Modal/Modal"
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../Components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"

const BurgerBuilder = (props) => {
	const [purchasing, setPurchasing] = useState(false)

	useEffect(() => {
		props.onInitIngredients()
	}, [props.onInitIngredients])

	const updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((igKeys) => {
				return ingredients[igKeys]
			})
			.reduce((sum, el) => {
				return sum + el
			}, 0)
		return sum > 0
	}

	const purchaseHandler = () => {
		setPurchasing(true)
	}

	const purchaseCancelHandler = () => {
		setPurchasing(false)
	}

	const purchaseContinueHandler = () => {
		props.onInitPuchase()
		props.history.push({ pathname: "checkout" })
	}

	const disabledInfo = {
		...props.ings,
	}
	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0
	}
	let orderSummary = null

	let burger = props.error ? (
		<p style={{ textAlign: "center" }}>
			<strong>ingredients can't be loaded! </strong>
		</p>
	) : (
		<Spinner />
	)

	if (props.ings) {
		burger = (
			<Auxiliary>
				<Burger ingredients={props.ings} />
				<BuildControls
					addIngredient={props.onIngredientAdded}
					removeIngredient={props.onIngredientRemoved}
					disabled={disabledInfo}
					price={props.price}
					purchasable={updatePurchaseState(props.ings)}
					orded={purchaseHandler}
				/>
			</Auxiliary>
		)
		orderSummary = (
			<OrderSummary
				ingredients={props.ings}
				purchaseCancelled={purchaseCancelHandler}
				purchaseContinued={purchaseContinueHandler}
				price={props.price.toFixed(2)}
			/>
		)
	}

	return (
		<Auxiliary>
			<Modal modalClosed={purchaseCancelHandler} show={purchasing}>
				{orderSummary}
			</Modal>
			{burger}
		</Auxiliary>
	)
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.price,
		error: state.burgerBuilder.error,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPuchase: () => dispatch(actions.puchaseInit()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
