import { Dictionary } from "../common";
import { dxfColors } from "../DxfDefine";
import { Group } from "../GroupEnumerator";
import { Coordinate, ISectionBase } from "./Common";

export type TableType = 'VPORT' | 'LTYPE' | 'LAYER';

export class Layer {
    name: string;
    visible: boolean;
    colorIndex: number;
    colorHtml: string;
    frozen: boolean;
}

export class LineType {
    name: string;
    description: string;
    pattern: number[];
    patternLength: number;
}

export class ViewPort {
    name: string;
    ownerHandle: string;
    lowerLeftCorner: Coordinate;
    upperRightCorner: Coordinate;
    center: Coordinate;
    snapBasePoint: Coordinate;
    snapSpacing: Coordinate;
    gridSpacing: Coordinate;
    viewDirectionFromTarget: Coordinate;
    viewTarget: Coordinate;
    lensLength: number;
    frontClippingPlane: number;
    backClippingPlane: number;
    snapRotationAngle: number;
    viewTwistAngle: number;
    renderMode: number;
    ucsOrigin: Coordinate;
    ucsXAxis: Coordinate;
    ucsYAxis: Coordinate;
    orthographicType: number;
    defaultLightingOn: boolean;
    ambientColor: number;
    viewHeight: number;
}

export class TableArray {

    handle: string = '';

    ownerHandle: string = '';

    values: Array<Layer | LineType | ViewPort> = [];

    parse(g:Group){
        while (!g.isENDTAB()) {
            switch (g.code) {
                case 5:
                    this.handle = g.value;
                    break;
                case 330:
                    this.ownerHandle = g.value;
                    break;
                case 100:
                    break;
                case 70:
                    break;
                case 0:
                    this.parseTable(g);
                    g = g.parent.moveBack();
                    break;
                default:
                    break;
            }

            g = g.parent.moveNext();
        }
    }

    private parseTable(g: Group) {
        let type = g.value;
        g = g.parent.moveNext();

        switch (type) {
            case 'LAYER':
                return this.parseLayer(g);
            case 'LTYPE':
                return this.parseLineType(g);
            case 'VPORT':
                return this.parseViewPort(g);
            default:
                while (!g.isENDTAB()) { g = g.parent.moveNext(); }
        }
    }

    private parseLayer(g: Group) {
        let layer = new Layer();

        while (!g.isENDTAB()) {
            let { code, value } = g;

            switch (code) {
                case 2:
                    layer.name = value;
                    break;
                case 62:
                    layer.visible = value > 0;
                    layer.colorIndex = Math.abs(value);
                    layer.colorHtml = dxfColors[layer.colorIndex];
                    break;
                case 70:
                    layer.frozen = (value & 1) != 0 || (value & 2) != 0;
                    break;
                case 0:
                    this.values.push(layer);
                    layer = new Layer();
                    break;
                default:
                    break;
            }

            g = g.parent.moveNext();
        }

        this.values.push(layer);
    }

    private parseLineType(g: Group) {
        let lineType = new LineType();

        while (!g.isENDTAB()) {
            let { code, value } = g;

            switch (code) {
                case 2:
                    lineType.name = value;
                    break;
                case 3:
                    lineType.description = value;
                    break;
                case 73:
                    if (value > 0) lineType.pattern = [];
                    break;
                case 40:
                    lineType.patternLength = value;
                    break;
                case 49:
                    lineType.pattern.push(value);
                    break;
                case 0:
                    this.values.push(lineType);
                    lineType = new LineType();
                    break;
                default:
                    break;
            }

            g = g.parent.moveNext();
        }

        this.values.push(lineType);
    }

    private parseViewPort(g: Group) {
        let viewPort = new ViewPort();

        while (!g.isENDTAB()) {
            let { code, value } = g;

            switch (code) {
                case 2:
                    viewPort.name = value;
                    break;
                case 10:
                    viewPort.lowerLeftCorner = Coordinate.parse(g);
                    break;
                case 11:
                    viewPort.upperRightCorner = Coordinate.parse(g);
                    break;
                case 12:
                    viewPort.center = Coordinate.parse(g);
                    break;
                case 13:
                    viewPort.snapBasePoint = Coordinate.parse(g);
                    break;
                case 14:
                    viewPort.snapSpacing = Coordinate.parse(g);
                    break;
                case 15:
                    viewPort.gridSpacing = Coordinate.parse(g);
                    break;
                case 16:
                    viewPort.viewDirectionFromTarget = Coordinate.parse(g);
                    break;
                case 17:
                    viewPort.viewTarget = Coordinate.parse(g);
                    break;
                case 42:
                    viewPort.lensLength = value;
                    break;
                case 43:
                    viewPort.frontClippingPlane = value;
                    break;
                case 44:
                    viewPort.backClippingPlane = value;
                    break;
                case 45:
                    viewPort.viewHeight = value;
                    break;
                case 50:
                    viewPort.snapRotationAngle = value;
                    break;
                case 51:
                    viewPort.viewTwistAngle = value;
                    break;
                case 79:
                    viewPort.orthographicType = value;
                    break;
                case 110:
                    viewPort.ucsOrigin = Coordinate.parse(g);
                    break;
                case 111:
                    viewPort.ucsXAxis = Coordinate.parse(g);
                    break;
                case 112:
                    viewPort.ucsYAxis = Coordinate.parse(g);
                    break;
                case 281:
                    viewPort.renderMode = value;
                    break;
                case 292:
                    viewPort.defaultLightingOn = value;
                    break;
                case 330:
                    viewPort.ownerHandle = value;
                    break;
                case 63:
                case 421:
                case 431:
                    viewPort.ambientColor = value;
                    break;
                case 0:
                    this.values.push(viewPort);
                    viewPort = new ViewPort();
                    break;
                default:
                    break;
            }

            g = g.parent.moveNext();
        }

        this.values.push(viewPort);
    }
}

export class TableSection implements ISectionBase {
    parse(g: Group) {

        let values = new Dictionary<TableType, TableArray>();
        while (!(g.isEOF() || g.isENDSEC())) {
            if (g.isTABLE()) {
                g = g.parent.moveNext();

                let tbArray = values.get(g.value);
                if (!tbArray) {
                    tbArray = new TableArray();
                    tbArray.parse(g);
                    values.add(g.value,tbArray);
                }
            } else {
                g = g.parent.moveNext();
            }
        }

        return values;
    }
}