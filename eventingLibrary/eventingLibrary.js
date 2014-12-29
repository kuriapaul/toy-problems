/**
 * Make an eventing system mix-in that adds .trigger() and .on() to any input
 * object.
 *
 * Example usage:
 * var obj = mixEvents({ name: 'Alice', age: 30 });
 * obj.on('ageChange', function(){ // On takes an event name and a callback function
 *    console.log('Age changed');
 * });
 * obj.age++;
 * obj.trigger('ageChange'); // This should call our callback! Should log 'age changed'.
 *
 * Caveats:
 * - mixEvents should return the original object it was passed after extending it.
 * - If we repeatedly call .on with the same event name, it should
 *   continue to call the old function as well. That is to say, we can have multiple
 *   listeners for an event.
 * - If `obj.trigger` is called with additional arguments, pass those to the 
 *   listeners.
 * - It is not necessary to write a way to remove listeners.
 */

var mixEvents = function (obj) {
  var storage = {};

  obj.on = function on (eventType, callback) {
    if (on.length < 2) {
      throw new Error('Not enough arguments');
    }

    if (typeof callback !== 'function') {
      throw new Error('Callback needs to be a function');
    }

    // check if event already exists in storage
    storage[eventType] = storage[eventType] || [];
    storage[eventType].push(callback);
  };

  obj.trigger = function (eventType) {
    if (eventType === void 0) { return; }

    var args = Array.prototype.slice.call(arguments, 1);
    var listOfCallbacks = storage[eventType] || [];

    listOfCallbacks.forEach(function (cb) {
      cb.apply(obj, args);
    });
  };

  return obj;
};