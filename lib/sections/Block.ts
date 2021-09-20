import { Dictionary } from "../common";
import { Group } from "../GroupEnumerator";
import { Coordinate, ISectionBase } from "./Common";
import { DxfEntityType, EntityBase, EntitySection } from "./Entity";

export class Block {

    xrefPath: string;
    name: string;
    name2: string;
    handle: string;
    layer: string;
    position: Coordinate;
    paperSpace: boolean;
    type: number;
    ownerHandle: string;
    entities: Dictionary<DxfEntityType, Array<EntityBase>>;

    setValue(g: Group) {
        while (true) {
            let { code, value } = g;
            switch (code) {
                case 0:
                    if (g.isENDBLK())
                        break;

                    this.entities =  new EntitySection().parse(g);
                    g = g.parent.current();
                    break;
                case 1:
                    this.xrefPath = value;
                    break;
                case 2:
                    this.name = value;
                    break;
                case 3:
                    this.name2 = value;
                    break;
                case 5:
                    this.handle = value;
                    break;
                case 8:
                    this.layer = value;
                    break;
                case 10:
                    this.position = Coordinate.parse(g);
                    break;
                case 67:
                    this.paperSpace = value && value === 1;
                    break;
                case 70:
                    if (value !== 0) this.type = value;
                    break;
                case 100:

                    break;
                case 330:
                    this.ownerHandle = value;
                    break;
                default:
                    break;
            }

            if (g.isENDBLK() || g.isEOF())
                break;

            g = g.parent.moveNext();
        }
    }
}

export class BlockSection implements ISectionBase {
    parse(g: Group) {
        let values = new Array<Block>();

        while (!(g.isENDSEC() || g.isEOF())) {

            if (g.isBLOCK()) {
                g = g.parent.moveNext();
                let block = new Block();
                block.setValue(g);
                values.push(block);
            }

            g = g.parent.moveNext();
        }

        return values;
    }
}