import React from "react"; // 👈 you'll need the reducer hook
import { useReducer } from "react"; // reducer hook

// 👇 these are the types of actions that can change state
const CHANGE_INPUT = "CHANGE_INPUT";
const RESET_FORM = "RESET_FORM";

// 👇 create your initial state object here
const initialState = {
  authorName: "", // 👈 authorName is an empty string
  quoteText: "", // 👈 quoteText is an empty string
};

// 👇 create your reducer function here
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};
// This reducer function handles state changes based on dispatched actions. For CHANGE_INPUT, it updates the specified field in the state. For RESET_FORM, it returns the initial state.

export default function TodoForm({ createQuote = () => {} }) {
  // 👇 use the reducer hook to spin up state and dispatch
  const [state, dispatch] = useReducer(reducer, initialState);

  // Event Handlers: These functions handle form input changes, form reset, and form submission respectively. They dispatch appropriate actions to update the state.
  const onChange = () => {
    // 👇 implement
    const { name, value } = event.target;
    dispatch({ type: CHANGE_INPUT, payload: { name, value } });
  };
  const resetForm = () => {
    // 👇 implement
    dispatch({ type: RESET_FORM });
  };
  const onNewQuote = () => {
    // 👇 implement
    event.preventDefault();
    createQuote(state);
    resetForm();
  };

  // 👇 some props are missing in the JSX below:
  return (
    <form id="quoteForm" onSubmit={onNewQuote}>
      <h3>New Quote Form</h3>
      <label>
        <span>Author:</span>
        <input
          type="text"
          name="authorName"
          value={state.authorName} // missing
          placeholder="type author name"
          onChange={onChange}
        />
      </label>
      <label>
        <span>Quote text:</span>
        <textarea
          type="text"
          name="quoteText"
          value={state.quoteText} // missing
          placeholder="type quote"
          onChange={onChange}
        />
      </label>
      <label>
        <span>Create quote:</span>
        <button role="submit">DO IT!</button>
      </label>
    </form>
  );
}
