import CallbackQueue from 'react/lib/CallbackQueue'
import PooledClass from 'react/lib/PooledClass'
import Transaction from 'react/lib/Transaction'
import ReactUpdateQueue from 'react/lib/ReactUpdateQueue'


const ON_RENDERER_READY_QUEUEING = {
  initialize: function () {
    this.reactMountReady.reset()
  },

  close: function () {
    this.reactMountReady.notifyAll()
  },
};

const TRANSACTION_WRAPPERS = [ON_RENDERER_READY_QUEUEING];

function StackglReconcileTransaction() {
  this.reinitializeTransaction()
  this.reactMountReady = CallbackQueue.getPooled(null)
}

const Mixin = {
  getTransactionWrappers: function () {
    return TRANSACTION_WRAPPERS
  },

  getReactMountReady: function () {
    return this.reactMountReady
  },

  getUpdateQueue: function () {
    return ReactUpdateQueue
  },

  destructor: function () {
    CallbackQueue.release(this.reactMountReady);
    this.reactMountReady = null;
  },
};

Object.assign(
  StackglReconcileTransaction.prototype,
  Transaction.Mixin,
  StackglReconcileTransaction,
  Mixin
);

PooledClass.addPoolingTo(StackglReconcileTransaction);

export default StackglReconcileTransaction;

