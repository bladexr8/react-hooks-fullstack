/**
 * contain all three ways to update state with React hooks, 
 * useState, useReducer and useContext
 */

import React, { useContext, useState, useEffect, useReducer } from 'react';
import * as ACTIONS from '../store/actions/actions';
import * as Reducer1 from '../store/reducers/plain_reducer';
import Context from '../utils/context';

const HooksContainer1 = () => {

  const context = useContext(Context)

  const [value, setValue] = useState(0)

  const [useEffectValue, setUseEffectValue] = useState(null)

  const [state, dispatch] = useReducer(Reducer1.Reducer1, Reducer1.initialState)

  useEffect(() => {
    setTimeout(() => setUseEffectValue("useEffect worked"), 3000);
  }, [value])

  // update local state with useState() hook
  const incrementValue = () => {
    setValue(value + 1)
  }

  const decrementValue = () => {
    setValue(value - 1)
  }

  // update the useEffectValue
  // property of local state
  const handleUseEffectValue = () => {
    setUseEffectValue("some string")
  }

  // dispatch actions to change
  // stateprop1 in Reducer1 from
  // true to false and vice versa
  // note these are local state
  const handleDispatchTrue = () => {
    // dispatch2(type: "SUCCESS")
    // dispatch2(ACTIONS.SUCCESS)
    dispatch(ACTIONS.success())
  }

  const handleDispatchFalse = () => {
    // dispatch2(type: "FAILURE")
    // dispatch2(ACTIONS.FAILURE)
    dispatch(ACTIONS.failure())
  }

  // handleContextDispatchTrue and handleContextDispatchFalse
  // is how we update our global state using the same actions
  // and reducer as the handleDispatchTrue and handleDispatchFalse
  // functions

  return (
    <div>
      <div>
      <button onClick={() => handleUseEffectValue()}> Handle Value  </button>
      <button onClick={() => handleDispatchTrue()}>Dispatch True </button>
      <button onClick={() => handleDispatchFalse()}>Dispatch False </button>
      <button onClick={() => context.dispatchContextTrue()}>Dispatch Context True </button>
      <button onClick={() => context.dispatchContextFalse()}>Dispatch Context False </button>
      <button onClick={() => incrementValue()}> Add Local Value </button>
      <button onClick={() => decrementValue()}> Dec Local Value </button>
      <br />
      <br />
      {context.useContextSubmitState
        ? <h3> {context.useContextSubmitState} </h3>
        : <h3> No User Text </h3>
      }
      <br />
      {state.stateprop1
        ? <p> stateprop1 is true </p>
        : <p> stateprop1 is false </p>
      }
      <br />
      {context.stateProp2
        ? <p> stateprop2 is true </p>
        : <p> stateprop2 is false </p>
      }
      <br />
      {useEffectValue
        ? <p> { useEffectValue }</p>
        : <p> No value </p>
      }
      <br />
      <p>Local Value: {value}</p>
      <br />
      <br />
      </div>
    </div>
  )
}

export default HooksContainer1;