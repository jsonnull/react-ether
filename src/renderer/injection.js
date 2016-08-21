import ReactInjection from 'react/lib/ReactInjection'
import ReactDefaultBatchingStrategy from 'react/lib/ReactDefaultBatchingStrategy'
import ReactComponentEnvironment from 'react/lib/ReactComponentEnvironment'
import reconcileTransaction from './reconcileTransaction'
import StackglComponent from './component'

function inject () {
  (ReactInjection.NativeComponent || ReactInjection.HostComponent).injectGenericComponentClass(
    StackglComponent
  )

  ReactInjection.Updates.injectReconcileTransaction(
    reconcileTransaction
  )

  ReactInjection.Updates.injectBatchingStrategy(
    ReactDefaultBatchingStrategy
  )
}

export default inject
