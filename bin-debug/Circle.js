var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(cx, cy, cr) {
        var _this = _super.call(this) || this;
        _this.circleName = "";
        // private colorList:number[] = [13408665, 16777113, 6710937, 16750848, 16776960, 39372, 13421721, 13382553, 10079232, 16737894, 16776960, 3381708, 13395456,
        // 10066329, 13421619, 16750899, 16777164, 39219, 39372, 13421772, 16737894, 16737792, 16777062, 39270, 13395507, 16764057, 13395456, 13369446, 39321, 16763955];
        _this.colorList = [13408665, 16777113, 6710937, 16750848, 16776960, 39372, 13421721, 13382553];
        _this.init(cx, cy, cr);
        return _this;
    }
    Circle.prototype.randomColor = function () {
        return this.colorList[Math.round(Math.random() * this.colorList.length)];
    };
    Circle.prototype.init = function (cx, cy, cr) {
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
    };
    Circle.prototype.onTouch = function (e) {
        var par = this.parent;
        par.dispatchEventWith(Circle.Event_Click, false, this);
    };
    //清除圆
    Circle.prototype.clearCircle = function () {
        this.touchEnabled = !1;
        var tween = egret.Tween.get(this);
        tween.to({ alpha: 0.1 }, 500, egret.Ease.sineOut);
        tween.call(function () {
            this.visible = !1;
            this.parent.removeChild(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }, this);
    };
    Circle.Event_Click = "event_click";
    return Circle;
}(egret.Sprite));
__reflect(Circle.prototype, "Circle");
//# sourceMappingURL=Circle.js.map