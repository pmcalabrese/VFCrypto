const initialState = {
  current_currency: "USD"
};

export function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case "CHANGE_CURRENT_CURRENCY":
      return {
        // ...state,
        current_currency: action.payload
      };
    default:
      return state;
  }
}
