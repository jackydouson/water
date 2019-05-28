

export class utils{

    public add0(m){
        return m < 10 ? '0' + m : m;
    }

    public getTime():string
    {
        let date = new Date()
        let Y = date.getFullYear() + '-';
        let M = this.add0(date.getMonth()+1) + '-';
        let D = this.add0(date.getDate()) + ' ';
        let h = this.add0(date.getHours()) + ':';
        let m = this.add0(date.getMinutes()) + ':';
        let s = this.add0(date.getSeconds()) + ' ' + date.getMilliseconds()
        return Y+M+D+h+m+s;
    }

    public getTimeEx(): string{
        let PrefixInteger = function(num, n) {return (Array(n).join('0') + num).slice(-n)}
        let date = new Date()
        let Y = date.getFullYear()
        let M = PrefixInteger(date.getMonth() + 1, 2)
        let D = PrefixInteger(date.getDate(), 2)
        let h = PrefixInteger(date.getHours(), 2)
        let m = PrefixInteger(date.getMinutes(), 2)
        let s = PrefixInteger(date.getSeconds(), 2)
        let ms = PrefixInteger(date.getMilliseconds(), 3)
        var str = `${Y}-${M}-${D} ${h}:${m}:${s} ${ms}`
        return str
    }
}