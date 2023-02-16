module.exports = function check(str, bracketsConfig) {
  const elementsPair = {};
  for (let i = 0; i < bracketsConfig.length; i++) {
    const openingElement = bracketsConfig[i][0];
    const closingElement = bracketsConfig[i][1];
    elementsPair[closingElement] = openingElement;
  }

  const openElement = [];
  const sameElement = [];
  for (let i = 0; i < bracketsConfig.length; i++) {
    const openElem = bracketsConfig[i][0];
    const closeElem = bracketsConfig[i][1];
    if (openElem === closeElem) {
      sameElement.push(openElem);
    } else {
      openElement.push(openElem);
    }
  }

  let stack = [];
  for (let i = 0; i < str.length; i++) {
    let currentSymbol = str[i];

    if (openElement.includes(currentSymbol)) {
      stack.push(currentSymbol);
    } else if (sameElement.includes(currentSymbol)) {
      if (stack.length > 0 && stack[stack.length - 1] === currentSymbol) {
        stack.pop();
      } else {
        stack.push(currentSymbol);
      }
    } else {
      if (stack.length === 0) {
        return false;
      }

      let topStackElement = stack[stack.length - 1];
      if (elementsPair[currentSymbol] === topStackElement) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
}