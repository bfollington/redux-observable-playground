import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import epics from './epics';

export type ActionType = 
  | 'INCREMENT'
  | 'DECREMENT'
  | 'PING'
  | 'CONTINUE'
  | 'PONG'

export type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'CONTINUE' }
  | { type: 'PING' }
  | { type: 'PONG' }

function counter(state = 0, action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

function pingPong(state = 'None', action: Action) {
  switch (action.type) {
    case 'PING':
      return 'PING'
    case 'PONG':
      return 'PONG'
    default:
      return state
  }
}

const composeEnhancers = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware()
const rootEpic = combineEpics(
  epics
)

const store = createStore(
  combineReducers({
    counter,
    pingPong,
  }),
  composeEnhancers(
    applyMiddleware(epicMiddleware)
  )
)

epicMiddleware.run(rootEpic)

export default store