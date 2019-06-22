// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import {utils} from '../script/base/utils'

@ccclass
export default class Cursor extends cc.Component {

    onLoad () {
        
    }

    start () {
        let effect = this.node.getComponent(cc.Graphics)
        if(!effect){
            effect = this.node.addComponent(cc.Graphics)
        }
        this.node.active = true
        this.node.parent = this.node

        effect.lineWidth = 1
        let color = new cc.Color(222,172,50,255)
        effect.strokeColor = color 
        effect.fillColor = color
        effect.rect(0,-20,3,40)
        effect.stroke()
        effect.fill()
        //this.node.runAction(cc.repeatForever(cc.blink(1,1)))
    }

    textBegan(event){
        cc.log('textBegan')
        this.node.active = true
    }

    textChanged(event, val){
        let tip = cc.find('Canvas').getChildByName('tip')
        tip.getComponent(cc.Label).string = val.string
        this.node.x = tip.width
    }

    textEnd(event){
        cc.log('textEnd')
        //this.node.active = false
    }

    textReturn(event){
        cc.log('textReturn')
        //this.node.active = false
    }

    update (dt) {
        
    }
}
