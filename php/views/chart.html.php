<svg class="svg-container" width="100%" ng-attr-height="{{ contentActiveFlag ? '0' : '100%' }}" ng-controller="ChartController">
    <defs>
        <!--<filter id="f3" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
                <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>-->
        <linearGradient id="linGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#666;stop-opacity:.0" />
            <stop offset="100%" style="stop-color:#bbb;stop-opacity:.5" />
        </linearGradient>

        <radialGradient id="radGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:0" />
            <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
        </radialGradient>

        <!-- Material Design Shadows -->

        <filter id="md-shadow1" height="150%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1"/> <!-- stdDeviation is how much to blur -->
            <feOffset dx="0" dy="1" result="offsetblur"/> <!-- how much to offset -->
            <feComponentTransfer>   
                <feFuncA type="linear" slope=".4"/>
            </feComponentTransfer>
            <feMerge> 
                <feMergeNode/> <!-- this contains the offset blurred image -->
                <feMergeNode in="SourceGraphic"/> <!-- this contains the element that the filter is applied to -->
            </feMerge>
        </filter>

        <filter id="md-shadow2" height="150%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/> <!-- stdDeviation is how much to blur -->
            <feOffset dx="0" dy="2" result="offsetblur"/> <!-- how much to offset -->
            <feComponentTransfer>   
                <feFuncA type="linear" slope=".4"/>
            </feComponentTransfer>
            <feMerge> 
                <feMergeNode/> <!-- this contains the offset blurred image -->
                <feMergeNode in="SourceGraphic"/> <!-- this contains the element that the filter is applied to -->
            </feMerge>
        </filter>

        <filter id="md-shadow3" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/> <!-- stdDeviation is how much to blur -->
            <feOffset dx="0" dy="4" result="offsetblur"/> <!-- how much to offset -->
            <feComponentTransfer>   
                <feFuncA type="linear" slope=".4"/>
            </feComponentTransfer>
            <feMerge> 
                <feMergeNode/> <!-- this contains the offset blurred image -->
                <feMergeNode in="SourceGraphic"/> <!-- this contains the element that the filter is applied to -->
            </feMerge>
        </filter>



    </defs>

    <rect id="node-container-mouse-area" width="100%" height="100%"></rect>
    <g id="block-container" nvgtt-block-container>
        <g class="nvgtt-link" ng-click="testClick();" x1="0" x2="200" y1="0" y2="200"></g>
        <g class="nvgtt-block" 
            ng-repeat="block in blocks" 
            ng-click="testClick();"
            name="{{block.name}}"
            background-color="{{block.bgcolor}}"  
            text-color="{{block.fgcolor}}"  
            x="{{block.x}}" 
            y="{{block.y}}">
        </g>

        <!--<nvgtt-link x1="0" x2="{{ teste.x2 }}" y1="0" y2="200"></nvgtt-link>-->
<!--

        <g class=""


        <rect class="nvgtt-block" x="400" y="100" height="50" width="100"></rect>

        <g class="navi-nodes" ng-repeat="node in nodes track by node.globalId" 
        transform="translate({{node.x || 100}} {{node.y || 100}})">
            <g class="node-inner-rect-group">
                <rect class="node-inner-rect" rx="5" ry="5" height="50" width="100" fill="{{node.bgcolor}}"></rect>
                <text class="node-inner-rect-text" x="30">{{node.name}}</text>
            </g>
        </g>-->
        <!--<g>
            <path d="M0,0 h200 v50 h-200z" fill="#1de9b6" filter="url(#md-shadow1)"></path>
            <path d="M200,25 h200 v200 h200" stroke-dasharray="10,10" fill="none" stroke="#1de9b6" stroke-width="3px" 
            stroke-linejoin="round" filter="url(#md-shadow1)"></path>
            <path d="M600,225 l-20,-5 v10z" fill="#1de9b6" filter="url(#md-shadow1)"></path>
        </g>-->


    </g>
</svg>