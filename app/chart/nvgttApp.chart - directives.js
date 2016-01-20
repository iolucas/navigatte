'use strict';

angular.module('nvgttApp.chart')

.directive('nvgttBlockContainers', function() {
	return {
		scope: {},
		restrict: 'A',
		link: function(scope, lElem, lAttrs) {
			//Get the reference for the element children array
			scope.children = lElem[0].children;

			scope.columns = [];

			console.log(lElem);

			scope.$watchCollection('children', function(children) {
				var row = 10;

				for(var i = 0; i < children.length; i++) {
					if(children[i].classList.contains('navi-nodes')) {
						console.log(d3.select(children[i]));
						children[i].translate(10, row);
						row += 60;
					}
				}
			});
		}
	}
})

.directive('testOne', function() {
	return {
		restrict: 'AEC',
		priority: 2000,
		compile: function() {
			console.log("Compiled One");
			return function() {
				console.log("Linked One");		
			}
		}
	}
})

.directive('testTwo', function() {
	return {
		restrict: 'AEC',
		priority: 3000,
		compile: function() {
			console.log("Compiled Two");
			return function() {
				console.log("Linked Two");		
			}
		}
	}
})

.directive('testThree', function() {
	return {
		restrict: 'AEC',
		priority: 4000,
		compile: function() {
			console.log("Compiled Three");
			return function() {
				console.log("Linked Three");		
			}
		}
	}
})

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
		scope: false,
		restrict: 'C',
		compile: function(tElem, tAttrs) {

			//Append elements of the navigatte block

			var blockText = $(makeSvgNode('text'))
				.attr("class", "nvgtt-block-text")
				.attr("fill", tAttrs.textColor || "#fff")
				.attr("text-anchor", "middle")
				.text(tAttrs.name || "");

			var blockRect = $(makeSvgNode('rect'))
				.attr("fill", tAttrs.backgroundColor || "#5cb85c")
				.attr("class", "nvgtt-block-rect");	

			tElem.append([blockRect, blockText]);

			return function(scope, lElem, lAttr) {
				//Timeout to avoid bug in compilation
				$timeout(function(){
					//Get the text length and adjust the text position and rectangle size
					var blockText = lElem.find('.nvgtt-block-text');

					//Adjuste the text position and rectangle size according to the text size

					var textBox = blockText.get(0).getBBox();

					if(textBox.width < 40)
						textBox.width = 40; 

					var rectSideMargin = 30;
					var blockHeight = 50;
					var blockWidth = textBox.width + rectSideMargin * 2;

					blockText.attr("x", blockWidth / 2)
						.attr("y", (blockHeight - textBox.height) / 2 - textBox.y);

					lElem.find('.nvgtt-block-rect')
						.attr("width", blockWidth)
						.attr("height", blockHeight);

					//Function to translate the DOM in case X or Y values changes
					var translate = function() {
						lElem.attr("transform", "translate(" + 
							(lAttr.x || 0) + " " + 
							(lAttr.y || 0) + ")");		
					}

					//Keep track of the attribute values of x and y to trigger translate
					lAttr.$observe('x', translate);
					lAttr.$observe('y', translate);

					translate();
				},0);
			}
		}
	};
})

.directive('nvgttLink', function() {
	return {
		scope: false,
		restrict: 'C',
		compile: function(tElem, tAttrs) {

			var linkPath = $(makeSvgNode('path'))
				.attr("class", "nvgtt-link-path");

			tElem.append(linkPath);

			return function(scope, lElem, lAttrs) {

				//Function to draw the path of a diagonal line (x and y are inverted for right line projection)
				var drawLinkPath = d3.svg.diagonal()
					.source(function(link) { 
						return { x: link.y1, y: link.x1 }; 
					})            
					.target(function(link) { 
						return { x: link.y2, y: link.x2 }; 
					})
					.projection(function(d) { 
						return [d.y, d.x]; 
					});

				var refreshPath = function() {
					lElem.find('.nvgtt-link-path').attr("d", drawLinkPath({ 
						x1: lAttrs.x1 || 0, 
						y1: lAttrs.y1 || 0, 
						x2: lAttrs.x2 || 0, 
						y2: lAttrs.y2 || 0
					}));	
				}

				//Keep track of the attribute values of link coordinates to trigger refresh path
				lAttrs.$observe('x1', refreshPath);
				lAttrs.$observe('y1', refreshPath);
				lAttrs.$observe('x2', refreshPath);
				lAttrs.$observe('y2', refreshPath);

				refreshPath();
			}
		}
	}
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