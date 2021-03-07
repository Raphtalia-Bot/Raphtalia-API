export type Snowflake = string;

export class SnowflakeGenerator {
    private seq: number;
    private offset: number;
    private mid: number;
    private lastTime: number;
    constructor(options: { mid?: number; offset?: number; }) {
        options = options || {};
        this.seq = 0;
        this.mid = (options.mid || 1) % 1023;
        this.offset = options.offset || 0;
        this.lastTime = 0;
    }

    generate() {
        const time = Date.now(),
            bTime = (time - this.offset).toString(2);

        if (this.lastTime == time) {
            this.seq++;

            if (this.seq > 4095) {
                this.seq = 0;

                while (Date.now() <= time) {}
            }
        } else {
            this.seq = 0;
        }
        this.lastTime = time;
        let bSeq = this.seq.toString(2),
            bMid = this.mid.toString(2);
        while (bSeq.length < 12) bSeq = "0" + bSeq;
        while (bMid.length < 10) bMid = "0" + bMid;
        const bid = bTime + bMid + bSeq;
        let id = "";

        for (let i = bid.length; i > 0; i -= 4) {
            id = parseInt(bid.substring(i - 4, i), 2).toString(16) + id;
        }

        return hexToDec(id);
    }
}

function add(x: string | any[], y: string | any[] | null, base: number) {
    let z = [];
    // @ts-ignore
    let n = Math.max(x.length, y.length);
    let carry = 0;
    let i = 0;
    while (i < n || carry) {
        let xi = i < x.length ? x[i] : 0;
        // @ts-ignore
        let yi = i < y.length ? y[i] : 0;
        let zi = carry + xi + yi;
        z.push(zi % base);
        carry = Math.floor(zi / base);
        i++;
    }
    return z;
}

function multiplyByNumber(num: number, x: number[], base: number) {
    if (num < 0) return null;
    if (num == 0) return [];

    let result: number[] = [];
    let power = x;
    while (true) {
        if (num & 1) {
            result = add(result, power, base);
        }
        num = num >> 1;
        if (num === 0) break;
        power = add(power, power, base);
    }

    return result;
}

function parseToDigitsArray(str: string, base: number | undefined) {
    let digits = str.split("");
    let ary = [];
    for (let i = digits.length - 1; i >= 0; i--) {
        let n = parseInt(digits[i], base);
        if (isNaN(n)) return null;
        ary.push(n);
    }
    return ary;
}

function convertBase(str: string, fromBase: number, toBase: number) {
    let digits = parseToDigitsArray(str, fromBase);
    if (digits === null) return null;

    let outArray: string | any[] = [];
    let power = [1];
    for (let i = 0; i < digits.length; i++) {
        // invariant: at this point, fromBase^i = power
        if (digits[i]) {
            outArray = add(
                outArray,
                multiplyByNumber(digits[i], power, toBase),
                toBase
            );
        }
        // @ts-ignore
        power = multiplyByNumber(fromBase, power, toBase);
    }

    let out = "";
    for (let i = outArray.length - 1; i >= 0; i--) {
        out += outArray[i].toString(toBase);
    }
    return out;
}

function hexToDec(hexStr: string) {
    if (hexStr.substring(0, 2) === "0x") hexStr = hexStr.substring(2);
    hexStr = hexStr.toLowerCase();
    return convertBase(hexStr, 16, 10);
}
