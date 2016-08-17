import ReactInstanceHandles from 'react/lib/ReactInstanceHandles'
import ReactElement from 'react/lib/ReactElement';
import ReactUpdates from 'react/lib/ReactUpdates'
import instantiateReactComponent from 'react/lib/instantiateReactComponent'
import inject from './injection'
import invariant from 'invariant'

/*
 * Inject new native dependencies for stackgl into React
 */
inject()

export const render = function (element, gl) {
  invariant(
    ReactElement.isValidElement(element),
    'render(): You must pass a valid ReactElement.'
  )

  invariant(
    gl instanceof WebGLRenderingContext,
    'render(): You must pass a WebGLRenderingContext'
  )

  const component = instantiateReactComponent(element) 

  ReactUpdates.batchedUpdates(function () {
    const transaction = ReactUpdates.ReactReconcileTransaction.getPooled()
    transaction.perform(function () {
      component.mountComponent(
        transaction,
        gl,
        {_idCounter: 0},
        {}
      );
    })
    ReactUpdates.ReactReconcileTransaction.release(transaction)
  })
}
