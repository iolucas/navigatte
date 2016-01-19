'use strict';

angular.module('nvgttApp.chart')

.directive('nvgttDraggable', function() {
	return {
		scope: {},
		restrict: 'A',
		link: function(scope, lElem) {
			var elem = lElem[0];
			console.log(elem);
			elem.addEventListener("mousedown", function() {
				console.log('test');
			});
		}
	}

})

.directive('nvgttBlock', function($timeout) {
	return {
		restrict: 'E',
		link: function(scope, lElement, lAttr, ctrl, transc) {

			var blockText = makeSvgNode('text');
			blockText.textContent = lAttr.name;
			var textBox = blockText.getBBox();

			if(textBox.width < 40)
				textBox.width = 40; 

			var rectSideMargin = 30;
			var blockHeight = 50;
			var blockWidth = textBox.width + rectSideMargin * 2;

			blockText.setAttribute("class", "nvgtt-block-text");
			blockText.setAttribute("text-anchor", "middle");
			blockText.setAttribute("x", blockWidth / 2);
			blockText.setAttribute("y", (blockHeight - textBox.height) / 2 - textBox.y);

			var blockRect = makeSvgNode('rect');
			blockRect.setAttribute("class", "nvgtt-block-rect");
			//blockRect.setAttribute("fill", lAttr.color || "yellow");
			blockRect.setAttribute("width", blockWidth);
			blockRect.setAttribute("height", blockHeight);

			var blockGroup = makeSvgNode('g', lAttr);
			blockGroup.setAttribute("class", "nvgtt-block");
			
			blockGroup.appendChild(blockRect);
			blockGroup.appendChild(blockText);

			lElement.replaceWith(angular.element(blockGroup));
    	}
	};
});





/* Create a shape node with the given settings. */
function makeSvgNode(name, settings) {
  var ns = 'http://www.w3.org/2000/svg';
  var node = document.createElementNS(ns, name);
  for (var attribute in settings) {
    var value = settings[attribute];
    if (value !== null && value !== null && !attribute.match(/\$/) &&
      (typeof value !== 'string' || value !== '')) {
      node.setAttribute(attribute, value);
    }
  }
  return node;
}