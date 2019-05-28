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
export default class Main extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // onLoad () {}

    start () {
        let u = new utils()
        console.time('1')
        for(let i = 0; i < 100000; i++){
            let time1 = u.getTime()
            //cc.log(time1)
        }
        console.timeEnd('1')
        console.time('2')
        for(let i = 0; i < 100000; i++){
            let time2 = u.getTimeEx()
            //cc.log(time2)
        }
        console.timeEnd('2')
        cc.log(new Date().toString())
        cc.log(new Date().toDateString())
        cc.log(new Date().toTimeString())
        cc.log(Date.parse(new Date().toString())) 
        let t = Array<number>(5, 0)

        for(let i = 0; i < 5; i++){
            cc.log('..', t[i], '..')
        }
        //cc.log(t)  

        // let temp = (Array(5).join('0') + 12)//.slice(-5)
        // cc.log(temp)
    }

    // update (dt) {}
}
