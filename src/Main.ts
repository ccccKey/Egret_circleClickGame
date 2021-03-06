//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(Circle.Event_Click, this.onClickCircle, this);
    }

    private textCount: egret.TextField;
    private textTimer: egret.TextField;
    private textDes: egret.TextField;
    private timer: egret.Timer;
    private color: number;
    private clickCircle: Circle;
    private widthNum:number = 6;
    private heightNum:number = 6;

    private onAddToStage(event: egret.Event) {
        var stageW: number = this.stage.stageWidth;
        var stageH: number = this.stage.stageHeight;

        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawRect(0, 0, stageW, stageH);
        bg.graphics.endFill();
        this.addChild(bg);

        this.textCount = new egret.TextField;
        this.textCount.textColor = 0xffffff;
        this.textCount.y = 630;
        this.textCount.text = " 分数 :0";

        this.textTimer = new egret.TextField;
        this.textTimer.textColor = 0xffffff;
        this.textTimer.y = 720;
        this.textTimer.text = " 倒计时 ";

        this.textDes = new egret.TextField;
        this.textDes.y = 800;
        this.textDes.text = " 点击第一个颜色开始 ";

        this.textCount.textAlign = this.textTimer.textAlign = this.textDes.textAlign = egret.HorizontalAlign.CENTER;
        this.textCount.width = this.textTimer.width = this.textDes.width = stageW;
        this.textCount.textColor = this.textTimer.textColor = this.textDes.textColor = 0x000000;

        this.addChild(this.textCount);
        this.addChild(this.textTimer);
        this.addChild(this.textDes);

        this.timer = new egret.Timer(1000, 30);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);

        var radius: number = 50;
        var circleNum: number = 0;
        for (var i: number = 0; i < this.widthNum; i++) {
            for (var j: number = 0; j < this.heightNum; j++) {
                circleNum++;
                var tempx: number = 110 + radius * 2 * j;
                var tempy: number = 100 + radius * 2 * i;
                var circle: Circle = new Circle(tempx, tempy, radius);
                circle.circleName = "circle" + circleNum;
                this.addChild(circle);
            }
        }
    }

    private count: number = 0;
    private score: number = 0;
    private touchNum: number = 0;
    private onClickCircle(e: any): void {
        if (this.clickCircle) {
            if (this.clickCircle.circleName == e.data.circleName) {
                return;
            }
        }

        if (this.count == 0) {
            this.textCount.text = " 分数 :0";
            this.timer.start();
        } else {
            if (this.clickCircle) {
                if (this.clickCircle.color == e.data.color) {
                    this.score++;
                    this.textCount.text = " 分数 :" + this.score;
                }
            }
        }

        ++this.touchNum;
        if (this.touchNum == 1) {
            this.clickCircle = e.data;
        } else if (this.touchNum == 2) {
            this.clickCircle.clearCircle();
            e.data.clearCircle();

            this.clickCircle = null;
            this.touchNum = 0;
        }

        ++this.count;
        if (this.count >= this.widthNum * this.heightNum){
            this.timer.stop();
            this.gameOver();
        }
    }

    private onTimer(e: egret.TimerEvent): void {
        this.textTimer.text = " 倒计时 :" + (this.timer.repeatCount - this.timer.currentCount);
    }

    private onTimerComplete(e: egret.TimerEvent): void {
        this.gameOver();
    }

    private gameOver(): void {
        this.textDes.text = " 这不是极限,刷新再来一次! ";
        this.removeEventListener(Circle.Event_Click, this.onClickCircle, this);

        this.count = 0;
        this.score = 0;
    }

}