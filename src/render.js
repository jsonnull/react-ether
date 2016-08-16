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

export const render = function (element, canvas) {
  // Ensure the first element is valid
  // TODO: Ensure the canvas is a valid dom element
  invariant(
    ReactElement.isValidElement(element),
    'render(): You must pass a valid ReactElement.'
  )

  const rootId = ReactInstanceHandles.createReactRootID(0)
  const component = instantiateReactComponent(element) 

  ReactUpdates.batchedUpdates(function () {
    const transaction = ReactUpdates.ReactReconcileTransaction.getPooled()
    transaction.perform(function () {
      component.mountComponent(
        transaction,
        rootId,
        // TODO: what is _idCounter used for and when should it be nonzero?
        {_idCounter: 0},
        {}
      );
    })
    ReactUpdates.ReactReconcileTransaction.release(transaction)
  })
}
