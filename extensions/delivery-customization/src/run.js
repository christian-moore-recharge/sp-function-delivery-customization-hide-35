// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */


// ---------------------------------------------------------------
//CODE TO HIDE IF 1 SELLING PLAN LINE INCLUDED IN THE CART
// ---------------------------------------------------------------


export function run(input) {
  var subtotal = input.cart.cost.subtotalAmount.amount
  var lines = input.cart.lines
  var hasSubs = false
  var targetHandle = ''
  console.log(input)

  var hide_ops;

  for (var item of lines) {
      if (item.sellingPlanAllocation?.sellingPlan.id) {
        hasSubs = true
      }
  }




  if (hasSubs){
    if (subtotal >= 35 && subtotal < 70) {
      for (var delivOption of input.cart.deliveryGroups[0].deliveryOptions) {
        if (delivOption.title == 'Standard Shipping' && delivOption.cost.amount > 0){
          targetHandle = delivOption.handle
        }
      }


      hide_ops = {
        "operations": [{
          "hide":{
            "deliveryOptionHandle": targetHandle
          }
        }]
      }
    } else {
      return NO_CHANGES
    }
  } else {
    if (subtotal >= 35 && subtotal < 70) {
      for (var delivOption of input.cart.deliveryGroups[0].deliveryOptions) {
        if (delivOption.title == 'Free Standard Shipping' && delivOption.cost.amount == "0.0"){
          targetHandle = delivOption.handle
        }
      }
      hide_ops = {
        "operations": [{
          "hide":{
            "deliveryOptionHandle": targetHandle
          }
        }]
      }

    } else {
      return NO_CHANGES
    }
  }

  return hide_ops;
};
