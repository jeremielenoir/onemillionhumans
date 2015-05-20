var ScrollContainerType=ScrollContainerType||{};ScrollContainerType.SCROLL="scroll",ScrollContainerType.SLIDER="slider",define("ScrollContainer",["Gesture"],function(a){var b=function(b,c,d,e,f){function g(){w.interactive=!0,w.mousedown=w.touchstart=h,w.mouseup=w.touchend=i}function h(a){t=a,Q=!0,v=p.update(d),TweenLite.killTweensOf(this),w.dispatchEvent({type:"down"})}function i(){if(Q=!1,C==ScrollContainerType.SLIDER){var a=t.getLocalPosition(x),b=v.x-a.x,c=b>0?1:-1;s.x>10||Math.abs(b)>u.width*O&&0>c?this._prev(!0):s.x<-10||Math.abs(b)>u.width*O&&c>0?this._next(!0):this._goto(M,N,!0)}}var j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y=.4,z=.95,A=.7,B=.25,C=b,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=.5,O=1.5,P={},Q=!1;PIXI.DisplayObjectContainer.call(this),PIXI.EventTarget.call(this),x=c,m=d,u=e||new PIXI.Rectangle,w=this,j=f,k=d?d.width:0,l=d?d.height:0,D=0,o=new PIXI.Graphics,o.beginFill(16711680,0),o.drawRect(0,0,1,1),o.endFill(),w.addChild(o),C==ScrollContainerType.SLIDER&&(this._slides=function(a){K=a},this._next=function(a){L<K.length-2?L++:L=K.length-1,this._goto(L,N,a)},this._prev=function(a){L>0?L--:L=0,this._goto(L,N,a)},this._goto=function(a,b,c){(M!==a||c)&&(n=-K[a].x+(u.width>>1),M=L=a,TweenLite.to(this,b||N,{x:n,onCompleteParams:[M],onComplete:function(a){r&&r(a)}}),q&&q(M))},this._viewPort=function(a){u=a,this._goto(M,.25,!0)}),this._viewRect=function(a){o.scale.x=k=a.width,o.scale.y=l=a.height,C==ScrollContainerType.SLIDER&&this._goto(M,.25,!0)},this._update=function(a){return n=p.update(a),I+=(n.y-this._lastMouseDownPoint.y)*y,J+=(n.x-this._lastMouseDownPoint.x)*y,this._lastMouseDownPoint=n,I*=A,J*=A,C===ScrollContainerType.SLIDER&&(s=MathUtils.getMovement(P,t.getLocalPosition(x))),n},this._back=function(){E=this.position.y,F=this.position.x,G=0,H=0,m&&(E>D||l<=u.height?G=-E*B:E+l<u.height&&(G=(u.height-l-E)*B),F>D||k<=u.width?H=-F*B:F+k<u.width&&(H=(u.width-k-F)*B)),Math.abs(I)<=.2&&(I=0),Math.abs(J)<=.2&&(J=0),I*=z,J*=z,"y"!=j&&(this.position.y+=Math.round(I+G)),"x"!=j&&(this.position.x+=Math.round(J+H))},this._onChange=function(a){q=a},this._onAfterChange=function(a){r=a},this.isDown=function(){return Q},this.type=function(){return C},this._currentID=function(){return M},this._transitionTime=function(a){N=a},this._touchable=function(a){w.interactive=a,p.drag(x,this)},this._margeToSlide=function(a){O=a},this.progress=function(){var a=-(this.position.y/(l-u.height));a=0>=a?0:a>=1?1:a,this.progressCallBack&&this.progressCallBack(a)},p=new a(j),p.drag(x,this),this.position.x=0,this.position.y=0,g()};return b.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),b.prototype.onChange=function(a){this._onChange(a)},b.prototype.onAfterChange=function(a){this._onAfterChange(a)},b.prototype.next=function(){this._next()},b.prototype.prev=function(){this._prev()},b.prototype.goTo=function(a){this._goto(a)},b.prototype.setSlides=function(a){this._slides(a)},b.prototype.viewRect=function(a){this._viewRect(a)},b.prototype.viewPort=function(a){this._viewPort(a)},b.prototype.setTransitionTime=function(a){this._transitionTime(a)},b.prototype.touchable=function(a){this._touchable(a)},b.prototype.setMargeToSlide=function(a){this._margeToSlide(a)},b.prototype.upDate=function(a){return this._update(a)},b.prototype.back=function(){this._back()},b.prototype.scroll=function(a){this.isDown()?this.upDate(a):this.type()==ScrollContainerType.SCROLL&&this.back(),this.progressCallBack&&(_oldY!==this.position.y&&this.progress(),_oldY=this.position.y)},b.prototype.progress=function(){this.progress()},b.prototype.onProgress=function(a){this.progressCallBack=a},b.prototype.dispose=function(){this._dispose()},b}),define("Gesture",[],function(){function a(a,b){return{x:b.x-a.x>=0?b.x-a.x:b.x-a.x,y:b.y-a.y>=0?b.y-a.y:b.y-a.y}}var b=function(a){var b=this;b._constraintAxe=a,b._isDown=!1,b._target=null,b._domElement=null,b._inc={x:0,y:0},b._pos={x:0,y:0},_move={x:0,y:0},_mouse={x:0,y:0},b.onMove=function(a){_mouse=a.getLocalPosition(this),b._pos=_mouse},b.onDown=function(a){_mouse=a.getLocalPosition(this),b.initPosItem(),b._isDown=!0},b.onUp=function(a){_mouse=a.getLocalPosition(this),b._isDown=!1,this._target&&(b._target.oldx=b._target.position.x,b._target.oldy=b._target.position.y)},b.initPosItem=function(){this._target&&(b._pos=_mouse,b._target.oldPos.x=b._target.position.x,b._target.oldPos.y=b._target.position.y,b._target.startPoint.x=b._pos.x,b._target.startPoint.y=b._pos.y,b._target._lastMouseDownPoint=b._pos)}};return b.prototype.drag=function(a,b,c){a.mousedown=a.touchstart=this.onDown,a.mouseup=a.touchend=this.onUp,a.mousemove=a.touchmove=this.onMove,this._target=b,this._moveCallBack=c,this._target&&(this._target.oldPos={x:this._target.position.x,y:this._target.position.y},this._target.startPoint={x:0,y:0},this.initPosItem(),this._isDown=!0)},b.prototype.update=function(b){if(this._target){if(this._isDown){this._inc.x=this._pos.x,this._inc.y=this._pos.y,_move=a(this._target.startPoint,this._inc);var c=Math.round(_move.x+this._target.oldPos.x);"x"!=this._constraintAxe&&(b?0>=c?this._target.position.y=0:c>=b.width-this._target.width?this._target.position.x=b.width-this._target.width:this._target.position.x=c:this._target.position.x=c,this._moveCallBack&&this._moveCallBack(),this._oldx=this._target.position.x);var d=Math.round(_move.y+this._target.oldPos.y);"y"!=this._constraintAxe&&(b?0>=d?this._target.position.y=0:d>=b.height-this._target.height?this._target.position.y=b.height-this._target.height:this._target.position.y=d:this._target.position.y=d,this._moveCallBack&&this._moveCallBack(),this._oldy=this._target.position.y)}return this._pos}},b}),define("components/services",[],function(){var a=function(){this.getFaces=function(a,b,c,d){$.getJSON("http://localhost:3000/api/faces",{x:a,y:b,id:d}).done(function(e){c(e,d,a,b)}).fail(function(a,b,c){var d=b+", "+c;console.log("Request Failed: "+d)})}};return a}),define("bloc",["blocIthem"],function(a){var b=function(){function b(){for(var b=0,i=0,j=0;h>j;j++){for(var m=0;g>m;m++)d=new a,d.x=b,d.y=i,c.addChild(d),l[k]=d,k++,b+=e;b=0,i+=f}}PIXI.DisplayObjectContainer.call(this),PIXI.EventTarget.call(this);var c,d,e=256,f=256,g=4,h=3,i=g*e,j=h*f,k=0,l=[];c=this,c._width=i,c._height=j,b(),this.setValue=function(a){for(var b=0;b<a.length;b++)if(a[b].number){var c=a[b].number;console.log(main.martixRange[c]);var d=main.martixRange[c].picture+"?n="+1e6*Math.random();l[b].update("ID:"+c),l[b].updateImage(d)}},this.process=function(){},this.resize=function(a,b){}};return b.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),b.prototype.process=function(){this.process()},b.prototype.resize=function(a,b){this.resize(a,b)},b}),define("blocIthem",[],function(){var a=function(){function a(){var a=new PIXI.Graphics;a.beginFill(0,1),a.lineStyle(1,16777215),a.drawRect(2,2,f-4,g-4),a.endFill(),b.addChild(a),c=new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture)),d=new PIXI.Text("#",{font:"25px Proxima",fill:"#ffffff"}),b.addChild(c),b.addChild(d)}var b,c,d,e,f=256,g=256;PIXI.DisplayObjectContainer.call(this),b=this,a(),this.process=function(){},this.resize=function(a,b){},this.update=function(a){e=a,d.setText(e),c.texture.destroy(),c.texture=new PIXI.Texture(new PIXI.BaseTexture)},this.updateImage=function(a){c.texture.destroy(),c.texture=new PIXI.Texture(PIXI.Texture.fromImage(a))}};return a.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),a.prototype.process=function(){this.process()},a.prototype.resize=function(a,b){this.resize(a,b)},a});var main=main||{};define("main",["map"],function(a){var b=function(b){function c(){m=new PIXI.Stage(0),n={view:C,transparent:!1,resolution:window.devicePixelRatio||1},o=PIXI.autoDetectRecommendedRenderer(0,0,n),C||document.body.appendChild(o.view),d()}function d(){e(),Tools.loadFont(["Proxima"],h)}function e(){k=new PIXI.DisplayObjectContainer,m.addChild(k)}function f(){main.stage=m,main.view=o.view,main.resolution=window.devicePixelRatio||1,main.textResolution=2,main.fonts={Proxima:"Proxima"},main.martixRange=[],p=new a,k.addChild(p)}function g(){window.addEventListener("resize",main.onResize),main.onResize(null)}function h(){console.log("<< start >>"),f(),g(),requestAnimFrame(i),w&&j()}function i(){requestAnimFrame(i),o.render(m),p&&p.process&&p.process(),w&&l.update()}function j(){l=new Stats,l.domElement.style.position="absolute",l.domElement.style.top="0px",l.domElement.style.left="0px",document.body.appendChild(l.domElement)}console.log("<< Lenoir::main >>");var k,l,m,n,o,p,q,r,s,t,u,v,w=!0,x=!1,y=1280,z=800,A=2048,B=1536,C=b[0];main.onResize=function(){s=window.innerHeight,t=window.innerWidth,x&&"desktop"==Tools.getDevice()&&(t>=y&&(t=y),s>=z&&(s=z),u=window.innerWidth-t>>1,v=window.innerHeight-s>>1),q=t/A,r=s/B,p&&p.resize&&p.resize(t,s,q,r,u,v),o.resize(t,s),o.view.style.width=t+"px",o.view.style.height=s+"px",window.scrollTo(0,0)},c()};return b}),define("map",["ScrollContainer","bloc","components/services"],function(a,b,c){var d=function(){function d(){var c,d;for(c=0;w>c;c++)for(d=0;x>d;d++){for(var f=[],i=0;y>i;i++)f.push({number:A,picture:"img/"+(0===A?"logo.jpg":parseInt(MathUtils.randomMinMax(0,15))+".jpg")}),main.martixRange[A]={number:A,picture:"img/noimage.jpg"},A++;z[d+","+c]=f}l=new a(ScrollContainerType.SCROLL,main.stage),l.addEventListener("down",e),j.addChild(l);var m=0,n=0;for(c=0;q>c;c++){for(d=0;p>d;d++)k=new b,o[r]=k,k.idX=k.initidX=d,k.idY=k.initidY=c,k.lock0=k.lock1=!0,h(r,d,c),k.x=m,k.y=n,l.addChild(k),m+=k._width,m>=s&&(s=m),r++;m=0,n+=o[r-1]._height,n>t&&(t=n)}u=k._width,v=k._height,g()}function e(a){g()}function f(){for(var a,b,c=0;c<o.length;c++)a=l.y+o[c].y,a>n?(o[c].y-=t,o[c].idY>=q?o[c].idY-=q:o[c].idY=w+o[c].initidY-q,h(c,o[c].idX,o[c].idY)):-v>a&&l.y+(o[c].y+t)<=n&&(o[c].y+=t,o[c].idY<=w-1-q?o[c].idY+=q:o[c].idY=o[c].initidY,h(c,o[c].idX,o[c].idY)),b=l.x+o[c].x,b>m?(o[c].x-=s,o[c].idX>=p?o[c].idX-=p:o[c].idX=x+o[c].initidX-p,h(c,o[c].idX,o[c].idY)):-u>b&&l.x+(o[c].x+s)<=m&&(o[c].x+=s,o[c].idX<=x-1-p?o[c].idX+=p:o[c].idX=o[c].initidX,h(c,o[c].idX,o[c].idY))}function g(){for(var a=0;a<o.length;a++)o[a].oldPos={x:o[a].position.x,y:o[a].position.y}}function h(a,b,c){o[a].setValue(z[b+","+c]),B.getFaces(b,c,i,a)}function i(a,b){for(var c=0;c<a.length;c++)a[c].number&&(main.martixRange[a[c].number]=a[c]);o[b].setValue(a)}var j,k,l,m,n,o=[],p="desktop"==Tools.getDevice()?3:2,q="desktop"==Tools.getDevice()?3:2,r=0,s=0,t=0,u=0,v=0,w=333,x=250,y=12,z=[],A=0,B=new c;PIXI.DisplayObjectContainer.call(this),j=this,d(),this.process=function(){l&&(l.scroll(),f())},this.resize=function(a,b){m=a,n=b}};return d.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),d.prototype.process=function(){this.process()},d.prototype.resize=function(a,b){this.resize(a,b)},d});
//# sourceMappingURL=scripts.js.map