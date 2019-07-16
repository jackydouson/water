const {ccclass, property} = cc._decorator;

@ccclass
class DropDownCtrl extends cc.Component{
    private root:cc.Node = null
    private tip:cc.Label = null
    private conf:Array<any> = []
    private seqI:Array<number> = []
    private _curI:number = 0
    private _roll:number = 0
    private _spy:number = 0
    private _spt:number = 0
    
    @property(Boolean)
    private inertia: boolean = true
    @property(Boolean)
    private loop: boolean = true
    @property(Number)
    private line: number = 50
    @property(Number)
    private fontsize: number = 40
    @property(cc.Font)
    private ttfFont:cc.Font = null;
    @property([cc.String])
    private items: string[] = []

    onLoad(){
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this)
        this.root = new cc.Node('root')
        this.root.parent = this.node
        this.conf = [
            {scaleX:0.7, scaleY:0.5, opacity:64,  anchorY:0},
            {scaleX:0.85,scaleY:0.75,opacity:128, anchorY:0.25},
            {scaleX:1,   scaleY:1,   opacity:255, anchorY:0.5},
            {scaleX:0.85,scaleY:0.75,opacity:128, anchorY:0.75},
            {scaleX:0.7, scaleY:0.5, opacity:64,  anchorY:1},
        ]
        this.line = this.fontsize + 10
        let n = new cc.Node('tip')
        n.parent = cc.find('Canvas')
        n.position = cc.v2(0, 250)
        this.tip = n.addComponent(cc.Label)
        this.tip.string = ''
        n.active = false 
    }

    start(){
        this.seqI = [-2, -1, 0, 1, 2]
        for(let i = 0; i < this.seqI.length; ++i){
            let t = this.seqI[i]
            let node = new cc.Node(t.toString())
            node.setAnchorPoint(cc.v2(0.5, this.conf[i].anchorY))
            let lb = node.addComponent(cc.Label)
            lb.overflow = cc.Label.Overflow.NONE
            lb.fontSize = this.fontsize
            lb.font = this.ttfFont;
            node.y = -t * this.line
            this.root.addChild(node)
        }
        this.show(this.items)
    }

    show(item:string[]){
        if (!item) return
        if (item.length == 0) return
        this.items = item
        this.makeContent(0)
        this.makeEffect()
    }

    getLevel(){
        let n = this.root.y
        if(Math.abs(n) < this.line * 0.5) return 0
        else if(n > 0){
            n -= (this.line * 0.5)
            return 1 + (n - n % this.line) / this.line
        }
        else{
            n += (this.line * 0.5)
            return -1 + (n - n % this.line) / this.line
        }
    }

    getIndex(n:number){
        let t = n % this.items.length
        if (t < 0) t += this.items.length
        return t
    }

    getResult(){
        let index = this.getIndex(this._curI)
        return this.items[index]
    }

    makeLocation(n:number){
        if(n > this._curI){ 
            let index = this.seqI[0]
            let node = this.root.getChildByName(index.toString())
            node.y = (-2 - n) * this.line;
            this.seqI.push(this.seqI.shift())
        }
        else if (n < this._curI){
            let index = this.seqI[this.seqI.length - 1]
            let node = this.root.getChildByName(index.toString())
            node.y = (2 - n) * this.line
            this.seqI.unshift(this.seqI.splice(this.seqI.length - 1)[0])
        }
    }

    makeContent(n:number){
        for(let i = 0; i < this.seqI.length; ++i){
            let t = this.seqI[i]
            let index = n + i - 2
            let m = this.getIndex(index)
            let node = this.root.getChildByName(t.toString())
            let com = node.getComponent(cc.Label)
            com.string = this.items[m]
            if (!this.loop && (index < 0 || index > this.items.length - 1)) {
                com.string = ''
            }
        }
    }

    makeEffect(){
        for(let i = 0; i < this.seqI.length; ++i){
            let t = this.seqI[i]
            let cfg = this.conf[i]
            let node = this.root.getChildByName(t.toString())
            node.runAction(cc.spawn(cc.callFunc(()=>{node.setAnchorPoint(cc.v2(0.5, cfg.anchorY))}), cc.scaleTo(0.15, cfg.scaleX, cfg.scaleY), cc.fadeTo(0.15, cfg.opacity)))
        }
    }

    check(t:number){
        if (!this.loop && t < 0) return
        if (!this.loop && t > this.line * (this.items.length - 1)) return
        this.root.y = t
        let cur = this.getLevel()
        if(cur == this._curI) return
        this.makeLocation(cur)
        this.makeContent(cur)
        this.makeEffect()
        this._curI = cur
    }

    update(dt){
        if(this._roll < 0){
            this._roll += 1
            this.check(this.root.y - 15)
        }
        else if(this._roll > 0){
            this._roll -= 1
            this.check(this.root.y + 15)
        }
    }

    switch(y:number){
        let ept = new Date().getTime()
        let epd = y - this._spy
        let etd = (ept - this._spt) * 0.001
        let es = epd / etd
        let yy = this.line * this.getLevel()
        let mt = cc.moveTo(0.2, cc.v2(0, yy))
        let cb = cc.callFunc(()=>{this._roll = Math.floor(es * 0.005)})
        let func = (this.inertia && Math.abs(es) >= 1000) ? cb : mt
        this.root.runAction(func)
    }

    onTouchStart(event: any){
        this._spy = event.getLocation().y
        this._spt = new Date().getTime()
    }

    onTouchMove(event: any){
        let dy = event.getDeltaY()
        dy = Math.max(-20, Math.min(20, dy))
        this.check(this.root.y + dy)
    }

    onTouchEnd(event: any){
        let epy = event.getLocation().y
        this.switch(epy)
    }

    onTouchCancel(event: any){
        let epy = event.getLocation().y
        this.switch(epy)
    }
}