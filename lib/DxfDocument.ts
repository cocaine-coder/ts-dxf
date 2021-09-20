import { Dictionary } from "./common";
import { GroupEnumerator } from "./GroupEnumerator";
import { Block, BlockSection, DxfEntityType, EntityBase, HeaderVariables, Layer, LineType, ViewPort ,HeaderSection,TableSection, EntitySection} from "./sections";

export default class DxfDocument {

    private entities = new Dictionary<DxfEntityType, Array<EntityBase>>();
    private headers = new HeaderVariables();
    private layers = new Array<Layer>();
    private lineTypes = new Array<LineType>();
    private viewPort = new Array<ViewPort>();
    private blocks = new Array<Block>();

    /**
     * dxf 字符文档转化为相应的内存数据
     *
     * @param {string} dxf
     * @memberof DxfDocument
     */
    parse(dxf: string) {
        var enumerator = new GroupEnumerator(dxf.split(/\r\n|\r|\n/g));
        let cg = enumerator.moveNext();

        while (!cg.isEOF()) {
            if (cg.isSECTION()) {

                cg = enumerator.moveNext();
                let next = enumerator.moveNext();

                if (cg.isHEADER())
                    this.headers.variables = new HeaderSection().parse(next);
                else if (cg.isBLOCKS())
                    this.blocks = new BlockSection().parse(next);
                else if (cg.isTABLES()) {
                    let values = new TableSection().parse(next);
                    this.layers = values.get('LAYER')?.values as Array<Layer>;
                    this.lineTypes = values.get('LTYPE')?.values as Array<LineType>;
                    this.viewPort = values.get('VPORT')?.values as Array<ViewPort>;
                }
                else if (cg.isENTITIES())
                    this.entities = new EntitySection().parse(next);
            }

            cg = enumerator.moveNext();
        }
    }
}