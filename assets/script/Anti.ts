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

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        cc.loader.loadRes('card_0', cc.SpriteFrame, (err, sf)=>{
            if (err){cc.log(err);return}
            let N = 18
            for(let i = 0; i < N; i++){
                let node = new cc.Node()
                node.parent = this.node
                let angle = 2 * Math.PI * i / N
                let radius = 200
                node.x = radius * Math.cos(angle)
                node.y = radius * Math.sin(angle)
                node.rotation = i * 360 / N
                //node.scale = 0.35
                let com = node.addComponent(cc.Sprite)
                com.spriteFrame = sf
            }
        })
    }

    // update (dt) {}
}
