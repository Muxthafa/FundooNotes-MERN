import { combineReducers } from 'redux'
import { noteReducer } from './noteReducer'

const reducers = combineReducers({
    allNotes: noteReducer,
})

export default reducers