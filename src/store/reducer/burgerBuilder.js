import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  price: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.4,
  bacon: 0.6,
  cheese: 0.6,
  meat: 0.8,
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1 
                },
                price: state.price + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
              ...state,
              ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
              },
              price: state.price - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS:
          return {
            ...state,
            ingredients: {
              salad: action.ingredients.salad,
              bacon: action.ingredients.bacon,
              cheese:action.ingredients.cheese,
              meat:action.ingredients.meat
            },
            price: 4,
            error: false
          };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
          return {
            ...state,
            error: true
          }
        default:
            return state;
    }
};

export default reducer;