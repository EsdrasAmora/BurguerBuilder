import React, { useState } from "react"
import { connect } from "react-redux"
import Button from "../../../Components/UI/Button/Button"
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"
import Spinner from "../../../Components/UI/Spinner/Spinner"
import Input from "../../../Components/UI/Input/Input"
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler"
import * as actions from "../../../store/actions/index"

const ContactData = (props) => {
	const [orderForm, setOrderForm] = useState({
		name: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Your Name",
			},
			value: "",
		},
		street: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Street",
			},
			value: "",
		},
		zipCode: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "ZIP Code",
			},
			value: "",
		},
		country: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Country",
			},
			value: "",
		},
		email: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Your E-Mail",
			},
			value: "",
		},
		deliveryMethod: {
			elementType: "select",
			elementConfig: {
				options: [
					{ value: "fastest", displayValue: "Fastest" },
					{ value: "chepest", displayValue: "Chepest" },
				],
			},
			value: "fastest",
		},
	})

	const orderHandler = (event) => {
		event.preventDefault()
		const formData = {}
		for (let formElement in orderForm) {
			formData[formElement] = orderForm[formElement].value
		}
		const order = {
			ingredients: props.ings,
			price: props.price,
			orderData: formData,
		}

		props.onOrderBurger(order)
	}

	const inputChangedHandler = (event, inputId) => {
		const updatedOrderForm = {
			...orderForm,
		}
		const updatedInput = {
			...updatedOrderForm[inputId],
		}
		updatedInput.value = event.target.value
		updatedOrderForm[inputId] = updatedInput
		setOrderForm({ updatedInput })
	}

	const formElementsArray = []
	for (let key in orderForm) {
		formElementsArray.push({
			id: key,
			config: orderForm[key],
		})
	}
	let form = (
		<form onSubmit={orderHandler}>
			{formElementsArray.map((formElement) => (
				<Input
					key={formElement.id}
					changed={(event) => inputChangedHandler(event, formElement.id)}
					inputtype={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
				/>
			))}
			<Button className={classes.Input} btnType="Success" clicked={orderHandler}>
				ORDER
			</Button>
		</form>
	)
	if (props.loading) {
		form = <Spinner />
	}
	return (
		<div className={classes.ContactData}>
			<h4>Enter your Contact Data</h4>
			{form}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.price,
		loading: state.order.loading,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
