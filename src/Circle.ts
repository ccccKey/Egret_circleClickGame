class Circle extends egret.Sprite {

	public constructor(cx:number, cy:number, cr:number) {
		super();
		this.init(cx,cy,cr);
	}

	private shape:egret.Shape;
	private shapex:number;
	private shapey:number;
	private shaper:number;
	public color:number;
	public static Event_Click:string = "event_click";
	public circleName:string = "";
	// private colorList:number[] = [13408665, 16777113, 6710937, 16750848, 16776960, 39372, 13421721, 13382553, 10079232, 16737894, 16776960, 3381708, 13395456,
	// 10066329, 13421619, 16750899, 16777164, 39219, 39372, 13421772, 16737894, 16737792, 16777062, 39270, 13395507, 16764057, 13395456, 13369446, 39321, 16763955];
	private colorList:number[] = [13408665, 16777113, 6710937, 16750848, 16776960, 39372, 13421721, 13382553];

	private randomColor():number{
		return this.colorList[Math.round(Math.random() * this.colorList.length)];
	}

	private init(cx:number, cy:number, cr:number):void{
		this.color = this.randomColor();
		this.shape = new egret.Shape();
		this.shape.graphics.beginFill(this.color);
		this.shape.graphics.drawCircle(0, 0, cr);
		this.shape.graphics.endFill();
		this.shape.x = -cr;
		this.shape.y = -cr;

		this.shapex = cx;
		this.shapey = cy;
		this.shaper = cr;

		this.shape.touchEnabled = !0;
		this.shape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this, !1);

		this.addChild(this.shape);
		this.x = cx;
		this.y = cy;
	}

	private onTouch(e:egret.TouchEvent):void{
		var par = this.parent;
		par.dispatchEventWith(Circle.Event_Click, false, this);
	}

	//清除圆
	public clearCircle():void{
		this.touchEnabled = !1;
		var tween:egret.Tween = egret.Tween.get(this);
		tween.to({alpha:0.1}, 500, egret.Ease.sineOut);
		tween.call(function(){
			this.visible = !1;
			this.parent.removeChild(this);
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		}, this);
	}

}