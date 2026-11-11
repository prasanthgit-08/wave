/**
 * Updates the state of a date field, either locally or via a Redux action.
 *
 * @param {function} setter - The setter function used to update the local state. Typically obtained via the `useState` hook.
 * @param {object} payload - An object representing the new state to be merged into the current state.
 *                           This can contain one or multiple fields to be updated.
 * @param {function} [dispatch] - (Optional) The dispatch function from Redux. If provided, it will be used to dispatch the action.
 *
 * @example <caption>Local State Update</caption>
 * const [invoiceDate, setInvoiceDate] = useState({ date: '', dateInput: '', isDateValid: true });
 * updateField(setInvoiceDate, { date: '2024-04-20' });
 *
 * @example <caption>Redux State Update</caption>
 * import { useDispatch } from 'react-redux';
 * import { updateInvoiceDate } from 'redux/invoiceSlice';
 * const dispatch = useDispatch();
 * updateField(updateInvoiceDate, { date: '2024-04-20' }, dispatch);
 *
 * @example <caption>Reducer Definition</caption>
 * const invoiceSlice = createSlice({
 *   name: 'invoice',
 *   initialState: {
 *     date: {
 *       date: '',
 *       dateInput: '',
 *       isDateValid: true,
 *     },
 *   },
 *   reducers: {
 *     updateInvoiceDate: (state, action) => {
 *       // For updating the state
 *       if (action.payload) {
 *         state.date = { ...state.date, ...action.payload };
 *       } else { // For clearing the state
 *         state.date = {
 *           date: '',
 *           dateInput: '',
 *           isDateValid: true,
 *         };
 *       }
 *     },
 *   },
 * });
 * export const { updateInvoiceDate } = invoiceSlice.actions;
 *
 */
const updateField = (setter, payload, dispatch) => {
  if (!dispatch) {
    setter((prevState) => ({ ...prevState, ...payload }));
  } else {
    dispatch(setter(payload));
  }
};

export { updateField };
