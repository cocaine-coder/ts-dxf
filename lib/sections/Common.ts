import { Group } from "../GroupEnumerator";

export interface ISectionBase {
    parse(g: Group): any;
}

export class Coordinate {
    x: number;
    y: number;
    z: number;

    static zero = new Coordinate(0, 0, 0);
    static unitX = new Coordinate(1, 0, 0);
    static unitY = new Coordinate(0, 1, 0);

    /**
     *
     */
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * 从group中解析coordinate
     * x , y , z 依次读取，且code的差为10递增
     * 有可能没有z的数据
     * 
     * @param {Group} group
     * @return {Coordinate} 
     * @memberof Coordinate
     */
    static parse(group: Group): Coordinate {
        let coordinate = new Coordinate();
        coordinate.x = group.value;
        let cc = group.code;
        let enumerator = group.parent;

        let cg = enumerator.moveNext();
        cc = cc + 10;
        if (cg.code != cc)
            enumerator.throwError("code not for point");

        coordinate.y = cg.value;

        cg = enumerator.moveNext();
        cc = cc + 10;

        if (cg.code !== cc)
            enumerator.moveBack();
        else
            coordinate.z = cg.value;

        return coordinate;
    }
}