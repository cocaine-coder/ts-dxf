import { IEnumerator } from "./common";
import { dxfConvertType } from './DxfDefine'

export class Group {

    /**
     * group的第一个值
     * 指示该group的作用以及value的数据类型
     *
     * @type {number}
     * @memberof Group
     */
    readonly code: number;


    /**
     * group的第二个值
     *
     * @type {*}
     * @memberof Group
     */
    readonly value: any;

    /**
     * group的父级对象
     *
     * @type {GroupEnumerator}
     * @memberof Group
     */
    readonly parent: GroupEnumerator;

    /**
     * 创建Group
     */
    constructor(code: string, value: string, parent: GroupEnumerator) {
        this.code = Number.parseInt(code);
        this.value = dxfConvertType(this.code, value);
        this.parent = parent;
    }

    /**
     * 是否为文档结尾
     *
     * @return {boolean} 
     * @memberof Group
     */
    isEOF():boolean { return this.equals(0, 'EOF'); }

    /**
     * 是否为数据段 -- 开始
     *
     * @return {boolean} 
     * @memberof Group
     */
    isSECTION():boolean { return this.equals(0, 'SECTION'); }
    /**
     * 是否为数据段 -- 结尾
     *
     * @return {boolean} 
     * @memberof Group
     */
    isENDSEC():boolean { return this.equals(0, 'ENDSEC'); }

    /**
     * 是否为 header数据段
     *
     * @return {boolean} 
     * @memberof Group
     */
    isHEADER():boolean { return this.equals(2, 'HEADER'); }
    /**
     * 是否为 table 数据段
     *
     * @return {boolean} 
     * @memberof Group
     */
    isTABLES():boolean { return this.equals(2, 'TABLES'); }
    /**
     * 是否为 block 数据段
     *
     * @return {boolean} 
     * @memberof Group
     */
    isBLOCKS():boolean { return this.equals(2, 'BLOCKS'); }
    /**
     * 是否为 entities 数据段
     *
     * @return {boolean} 
     * @memberof Group
     */
    isENTITIES():boolean { return this.equals(2, 'ENTITIES'); }
    /**
     * 是否为 classses 数据段
     *
     * @return {boolean} 
     * @memberof Group
     */
    isCLASSES():boolean { return this.equals(2, 'CLASSES'); }
    /**
     * 是否为 objects 数据段
     *
     * @return {boolean} 
     * @memberof Group
     */
    isOBJECTS():boolean { return this.equals(2, 'OBJECTS'); }

    /**
     * 单个  table 数据的开始
     *
     * @return {boolean} 
     * @memberof Group
     */
    isTABLE():boolean { return this.equals(0, 'TABLE'); }
    /**
     * 单个 table 数据的结束
     *
     * @return {boolean} 
     * @memberof Group
     */
    isENDTAB():boolean { return this.equals(0, 'ENDTAB'); }

    /**
     * 当个 block 数据的开始
     *
     * @return {boolean 
     * @memberof Group
     */
    isBLOCK():boolean { return this.equals(0, 'BLOCK'); }
    /**
     * 单个 block 数据的结束
     *
     * @return {boolean} 
     * @memberof Group
     */
    isENDBLK():boolean { return this.equals(0, 'ENDBLK'); }

    /**
    * 判断group是否与值相等
    *
    * @param {number} code
    * @param {any} value
    * @return {boolean} 
    * @memberof Group
    */
    private equals(code: number, value: any): boolean {
        return code === this.code && this.value === value;
    }
}

/**
 * dxf文档读取器
 * 读取规则：每次读取两行，返回Group
 *
 * @export
 * @class GroupEnumerator
 * @implements {IEnumerator<Group>}
 */
export class GroupEnumerator implements IEnumerator<Group>{
    private datas: Array<string>;
    private pointer: number;
    isEnd = false;

    constructor(dxfDatas: Array<string>) {
        this.datas = dxfDatas;
        this.pointer = -2;
    }

    /**
     * 读取下一位
     *
     * @return {*}  {Group}
     * @memberof GroupEnumerator
     */
    moveNext(): Group {
        let current = this.current();
        if (current?.isEOF()) {
            this.isEnd = true;

            //文本未读取到底
            if (this.pointer <= this.datas.length - 4)
                this.throwError(`EOF sign readed before end of dxf file`);
            else
                return current;
        }

        this.pointer += 2;
        return this.current();
    }

    /**
     * 后移一位
     *
     * @param {number} [count]
     * @return {*}  {Group}
     * @memberof GroupEnumerator
     */
    moveBack(count?: number): Group {
        count = count || 1;
        this.pointer -= count * 2;

        if (this.pointer < 0)
            this.reset();

        this.isEnd = false;
        return this.current();
    }

    /**
     * 重置
     *
     * @memberof GroupEnumerator
     */
    reset() {
        this.pointer = -2;
        this.isEnd = false;
    }

    /**
     * 获取当前的Group
     * 如果初始化或者最后时返回undefined
     *
     * @return {*}  {Group}
     * @memberof GroupEnumerator
     */
    current(): Group {
        if (this.pointer >= this.datas.length || this.pointer < 0)
            return undefined;

        return new Group(this.datas[this.pointer], this.datas[this.pointer + 1], this);
    }

    /**
    * 抛出异常。记录出现问题行数
    *
    * @param {string} message
    * @memberof GroupEnumerator
    */
    throwError(message: string) {
        throw new Error(`${message}. line : ${this.pointer + 1} , with code : ${this.datas[this.pointer]}`);
    }

}