import React from "react"; // 👈 you'll need the reducer hook
import Quotes from "./Quotes";
import QuoteForm from "./QuoteForm";
import { useReducer } from "react"; // 👈 you'll need the reducer hook

// 👇 these are the types of actions that can change state
const CREATE_QUOTE = "CREATE_QUOTE";
const DELETE_QUOTE = "DELETE_QUOTE";
const EDIT_QUOTE_AUTHENTICITY = "EDIT_QUOTE_AUTHENTICITY"; // 👈 toggles the apocryphal property of a single quote
const SET_HIGHLIGHTED_QUOTE = "SET_HIGHLIGHTED_QUOTE"; // 👈 highlights a quote (or un-highlights it)
const TOGGLE_VISIBILITY = "TOGGLE_VISIBILITY"; // 👈 toggles whether to show all or only non-apocryphal

let id = 1;
const getNextId = () => id++; // 👈 this is a helper to create new quotes

// 👇 create your initial state object here
const initialState = {
  quotes: [
    {
      id: getNextId(),
      quoteText: "Don't cry because it's over, smile because it happened.",
      authorName: "Dr. Seuss",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "So many books, so little time.",
      authorName: "Frank Zappa",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "Be yourself; everyone else is already taken.",
      authorName: "Oscar Wilde",
      apocryphal: false,
    },
  ],
  displayAllQuotes: true,
  highlightedQuote: null,
};

// Reducer function. Taking STATE and ACTION as parameters
const reducer = (state, action) => {
  // Using switch statement to handle different action types.
  switch (action.type) {
    // CREATE_QUOTE, returning a new state object with the new quote added to the quotes array.
    case CREATE_QUOTE:
      return {
        ...state,
        quotes: [...state.quotes, action.payload],
      };
    // DELETE_QUOTE, returning a new state object with the quote removed from the quotes array.
    case DELETE_QUOTE:
      return {
        ...state,
        quotes: state.quotes.filter((quote) => quote.id !== action.payload), // 👈 filter out the quote with the matching id
        highlightedQuote:
          state.highlightedQuote === action.payload
            ? null
            : state.highlightedQuote,
      }; // 👈 if the highlighted quote is the one being deleted, un-highlight it
    // EDIT_QUOTE_AUTHENTICITY, returning a new state object with the apocryphal property of the quote toggled.
    case EDIT_QUOTE_AUTHENTICITY:
      return {
        ...state,
        quotes: state.quotes.map((quote) =>
          quote.id === action.payload
            ? { ...quote, apocryphal: !quote.apocryphal }
            : quote
        ),
      }; // 👈 toggle the apocryphal property of the quote with the matching id
    // SET_HIGHLIGHTED_QUOTE, returning a new state object with the highlightedQuote property set to the quote id or null.
    case SET_HIGHLIGHTED_QUOTE:
      return {
        ...state,
        highlightedQuote:
          state.highlightedQuote === action.payload ? null : action.payload,
      };
    // TOGGLE_VISIBILITY, returning a new state object with the displayAllQuotes property toggled.
    case TOGGLE_VISIBILITY:
      return {
        ...state,
        displayAllQuotes: !state.displayAllQuotes,
      };
    // Default case, returning the state as is.
    default:
      return state;
  }
};

export default function App() {
  // 👇 use the reducer hook to spin up state and dispatch
  const [state, dispatch] = useReducer(reducer, initialState);

  // 👇 This function dispatches a CREATE_QUOTE action with a new quote object.
  const createQuote = ({ authorName, quoteText }) => {
    // 👇 use the helper function above to create a new quote
    // 👇 and dispatch it over to the reducer
    dispatch({
      type: CREATE_QUOTE,
      payload: {
        id: getNextId(),
        authorName,
        quoteText,
        apocryphal: false,
      },
    });
  };

  // 👇 This function dispatches a DELETE_QUOTE action with the id of the quote to delete.
  const deleteQuote = (id) => {
    // 👇 implement
    dispatch({ type: DELETE_QUOTE, payload: id });
  };

  // 👇 This function dispatches an EDIT_QUOTE_AUTHENTICITY action with the id of the quote to edit.
  const editQuoteAuthenticity = (id) => {
    // 👇 implement
    dispatch({ type: EDIT_QUOTE_AUTHENTICITY, payload: id });
  };

  // 👇 This function dispatches a SET_HIGHLIGHTED_QUOTE action with the id of the quote to highlight.
  const setHighlightedQuote = (id) => {
    // 👇 implement
    dispatch({ type: SET_HIGHLIGHTED_QUOTE, payload: id });
  };

  // 👇 This function dispatches a TOGGLE_VISIBILITY action.
  const toggleVisibility = () => {
    // 👇 implement
    dispatch({ type: TOGGLE_VISIBILITY });
  };

  return (
    <div id="mp">
      <h2>Module Project</h2>
      <Quotes
        // 👇 lots of props are missing! Check the Quotes component
        quotes={state.quotes} // 👈 pass in the quotes array from state
        highlightedQuote={state.highlightedQuote} // 👈 pass in the highlightedQuote from state
        displayAllQuotes={state.displayAllQuotes} // 👈 pass in the displayAllQuotes from state
        deleteQuote={deleteQuote} // 👈 pass in the deleteQuote function
        editQuoteAuthenticity={editQuoteAuthenticity} // 👈 pass in the editQuoteAuthenticity function
        setHighlightedQuote={setHighlightedQuote} // 👈 pass in the setHighlightedQuote function
        toggleVisibility={toggleVisibility} // 👈 pass in the toggleVisibility function
      />
      <QuoteForm createQuote={createQuote} />
    </div>
  );
}
