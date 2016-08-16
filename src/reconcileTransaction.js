const CallbackQueue = require('react/lib/CallbackQueue');
const PooledClass = require('react/lib/PooledClass');
const Transaction = require('react/lib/Transaction');

const ON_RENDERER_READY_QUEUEING = {
  initialize: function() {
    this.reactMountReady.reset();
  },

  close: function() {
    this.reactMountReady.notifyAll();
  },
};

const TRANSACTION_WRAPPERS = [ON_RENDERER_READY_QUEUEING];

function StackglReconcileTransaction() {
  this.reinitializeTransaction();
  this.reactMountReady = CallbackQueue.getPooled(null);
}

const Mixin = {
  getTransactionWrappers: function() {
    return TRANSACTION_WRAPPERS;
  },

  getReactMountReady: function() {
    return this.reactMountReady;
  },

  destructor: function() {
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

