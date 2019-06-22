
const {ccclass, property} = cc._decorator;

@ccclass
class DropDownCtrl extends cc.Component{
    private _loop:boolean = false
    private _root:cc.Node = null
    private _tip:cc.Label = null
    private _posY:number = 0
    private _curI:number = 0
    private _line:number = 0
    private _config:Array<any> = []
    private _seqI:Array<number> = []
    @property([cc.String])
    private items: string[] = []

    onLoad(){
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this)
        this._root = new cc.Node('root')
        this.node.addChild(this._root)
        this._line = 50//this.node.height / 5
    }

    start(){
        this._config = [
            {scaleX:0.7, scaleY:0.5, opacity:64, anchorY:0},
            {scaleX:0.85,scaleY:0.75,opacity:128, anchorY:0},
            {scaleX:1,   scaleY:1,   opacity:255, anchorY:0.5},
            {scaleX:0.85,scaleY:0.75,opacity:128, anchorY:1},
            {scaleX:0.7, scaleY:0.5, opacity:64, anchorY:1},
        ]
        this._seqI = [-2, -1, 0, 1, 2]
        for(let i = 0; i < this._seqI.length; ++i){
            let t = this._seqI[i]
            let node = new cc.Node(t.toString())
            // node.setAnchorPoint(cc.v2(0.5, this._config[i].anchorY))
            node.addComponent(cc.Label)
            node.y = -t * this._line
            this._root.addChild(node)
        }
        this.makeContent(0)
        this.makeEffect()
    }

    getLevel(){
        let n = this._root.y
        if(Math.abs(n) < this._line * 0.5) return 0
        else if(n > 0){
            n -= (this._line * 0.5)
            return 1 + (n - n % this._line) / this._line
        }
        else{
            n += (this._line * 0.5)
            return -1 + (n - n % this._line) / this._line
        }
    }

    getIndex(n:number){
        while(n < 0){ n += this.items.length}
        while(n >= this.items.length){n -= this.items.length}
        return n
    }

    getResult(){
        let index = this.getIndex(this._curI)
        return this.items[index]
    }

    makeLocation(n:number){
        if(n > this._curI){ 
            let index = this._seqI[0]
            let node = this._root.getChildByName(index.toString())
            node.y = (-2 - n) * this._line;
            this._seqI.push(this._seqI.shift())
        }
        else{
            let index = this._seqI[this._seqI.length - 1]
            let node = this._root.getChildByName(index.toString())
            node.y = (2 - n) * this._line
            this._seqI.unshift(this._seqI.splice(this._seqI.length - 1)[0])
        }
    }

    makeContent(n:number){
        for(let i = 0; i < this._seqI.length; ++i){
            let t = this._seqI[i]
            let m = this.getIndex(n + i - 2)
            let node = this._root.getChildByName(t.toString())
            let com = node.getComponent(cc.Label)
            com.string = this.items[m]
        }
    }

    makeEffect(){
        for(let i = 0; i < this._seqI.length; ++i){
            let t = this._seqI[i]
            let cfg = this._config[i]
            let node = this._root.getChildByName(t.toString())
            node.runAction(cc.spawn(cc.scaleTo(0.15, cfg.scaleX, cfg.scaleY), cc.fadeTo(0.15, cfg.opacity)))
        }
    }

    onTouchStart(event: any){
        this._posY = event.getLocationY()
    }

    onTouchMove(event: any){
        let posY = event.getLocationY()
        this._root.y += (posY - this._posY)
        this._posY = posY
        let cur = this.getLevel()
        if(cur == this._curI) return
        this.makeLocation(cur)
        this.makeContent(cur)
        this.makeEffect()
        this._curI = cur
    }

    onTouchEnd(event: any){
        let y = this._line * this.getLevel()
        this._root.runAction(cc.moveTo(0.2, cc.v2(0, y)))
    }

    onTouchCancel(event: any){
        let y = this._line * this.getLevel()
        this._root.runAction(cc.moveTo(0.2, cc.v2(0, y)))
    }
}