angular.module('nvgttApp')

.controller('NvgttAppController', function($scope) {

        /*$scope.blocks = [];

        $scope.getBlocks = function() {

            $http.get("../navigatte/rest/user_data.php?nodes&links&user=lucas")
                .then(function(resp){
                    $scope.blocks = resp.data.nodes;      

                });
        }

        $scope.getBlocks();

        $scope.blockClick = function(index, ev) {
            ev.cancelBubble = true;

            var block = $scope.blocks[index];
            if(block == null)
                return;

            lastBlock = $scope.blocks[index];

            //opacity all blocks, only the clicked no
            for(var i = 0; i < $scope.blocks.length; i++) {
                if(i == index) continue;
                $scope.blocks[i].opacity = 0;
            }

            //Get offsets
            var xOffset = ev.target.offsetLeft;
            var yOffset = ev.target.offsetTop;

            console.log(xOffset + " " + yOffset);

            block.x = (window.innerWidth - 100)/2 - xOffset;
        }

        var lastBlock = null;

        $scope.spaceClick = function() {
            for(var i = 0; i < $scope.blocks.length; i++) {
                $scope.blocks[i].opacity = 1;
            }

            if(lastBlock) {
                lastBlock.x = 0;
                lastBlock.y = 0;
                lastBlock = null;
            }
        }*/



});