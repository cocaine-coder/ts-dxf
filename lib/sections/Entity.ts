import { Dictionary } from '../common';
import { dxfColors } from '../DxfDefine';
import { Group } from '../GroupEnumerator';
import { Coordinate, ISectionBase } from "./Common";

export type DxfEntityType = 'ARC' | 'CIRCLE' | 'POINT' | 'ELLIPSE' | 'LINE' | 'LWPOLYLINE' | 'POLYLINE' | 'VERTEX' | 'TEXT';

export abstract class EntityBase {
    type = "";
    handle = "";
    ownerHandle = "";
    lineType = "";
    layer = "";
    lineTypeScale = "";
    visible = true;
    colorIndex = 1;
    colorHtml = "";
    inPaperSpace = true;
    materialObjectHandle = "";
    lineweight: 1;
    extendedData: any;

    /**
     * 解析数据
     *
     * @abstract
     * @param {Group} g
     * @memberof EntityBase
     */
    abstract parse(g: Group): void;

    /**
     * 获取实体，如果不支持该实体返回undefined
     *
     * @static
     * @param {DxfEntityType} type
     * @return {*}  {EntityBase}
     * @memberof EntityBase
     */
    static getInstance(type: DxfEntityType): EntityBase {

        switch (type) {
            case 'ARC': return new Arc();
            case 'CIRCLE': return new Circle();
            case 'POINT': return new Point();
            case 'ELLIPSE': return new Ellipse();
            case 'LINE': return new Line();
            case 'LWPOLYLINE': return new LwPolyline();
            case 'POLYLINE': return new Polyline();
            case 'VERTEX': return new Vertex();
            case 'TEXT' : return new Text();
            default:
                //console.debug(`not support the entity of dxf : ${type}`);
                return undefined;
        }
    }

    /**
     * 解析公共的数据
     *
     * @protected
     * @param {Group} g
     * @memberof EntityBase
     */
    protected parseCommon(g: Group) {
        const { code, value } = g;

        switch (code) {
            case 0:
                this.type = value;
                break;
            case 5:
                this.handle = value;
                break;
            case 6:
                this.lineType = value;
                break;
            case 8: // Layer name
                this.layer = value;
                break;
            case 48:
                this.lineTypeScale = value;
                break;
            case 60:
                this.visible = value === 0;
                break;
            case 62: // Acad Index Color. 0 inherits ByBlock. 256 inherits ByLayer. Default is bylayer
                this.colorIndex = value;
                this.colorHtml = dxfColors[value];
                break;
            case 67:
                this.inPaperSpace = value !== 0;
                break;
            case 100:
                //ignore
                break;
            case 330:
                this.ownerHandle = value;
                break;
            case 347:
                this.materialObjectHandle = value;
                break;
            case 370:
                this.lineweight = value;
                break;
            case 420: // TrueColor Color
                this.colorHtml = value;
                break;
            case 1000:
                this.extendedData = this.extendedData || {};
                this.extendedData.customStrings = this.extendedData.customStrings || [];
                this.extendedData.customStrings.push(value);
                break;
            case 1001:
                this.extendedData = this.extendedData || {};
                this.extendedData.applicationName = value;
                break;
            default:
                break;
        }
    }
}

export class Arc extends EntityBase {

    center: Coordinate;
    radius = 0;
    startAngle = 0;
    endAngle = 0;

    parse(g: Group): void {
        while (g?.code != 0) {
            let { code, value } = g;
            switch (code) {
                case 10:
                    this.center = Coordinate.parse(g);
                    break;
                case 40:
                    this.radius = value;
                case 50:
                    this.startAngle = Math.PI / 180.0 * value;
                case 51:
                    this.endAngle = Math.PI / 180.0 * value;
                default:
                    this.parseCommon(g);
            }

            g = g.parent.moveNext();
        }
    }
}

export class Circle extends EntityBase {
    center: Coordinate;
    radius: number;

    parse(g: Group): void {
        while (g?.code != 0) {
            let { code, value } = g;
            switch (code) {
                case 10:
                    this.center = Coordinate.parse(g);
                    break;
                case 40:
                    this.radius = value;
                    break;
                default:
                    this.parseCommon(g);
            }

            g = g.parent.moveNext();
        }
    }
}

export class Ellipse extends EntityBase {

    center: Coordinate;
    majorAxisEndPoint: Coordinate;
    axisRatio: number;
    startAngle: number;
    endAngle: number;
    name: string;

    parse(g: Group): void {
        while (g?.code !== 0) {
            let { code, value } = g;

            switch (code) {
                case 10:
                    this.center = Coordinate.parse(g);
                    break;
                case 11:
                    this.majorAxisEndPoint = Coordinate.parse(g);
                    break;
                case 40:
                    this.axisRatio = value;
                    break;
                case 41:
                    this.startAngle = value * Math.PI / 180.0;
                    break;
                case 42:
                    this.endAngle = value * Math.PI / 180.0;
                    break;
                case 2:
                    this.name = value;
                    break;
                default:
                    this.parseCommon(g);
            }

            g = g.parent.moveNext();
        }
    }
}

export class Point extends EntityBase {
    position: Coordinate;
    thickness: number;
    extrusionDirection: Coordinate;

    parse(g: Group): void {
        while (g?.code !== 0) {
            let { code, value } = g;

            switch (code) {
                case 10:
                    this.position = Coordinate.parse(g);
                    break;
                case 39:
                    this.thickness = value;
                    break;
                case 210:
                    this.extrusionDirection = Coordinate.parse(g);
                    break;
                case 100:
                    break;
                default:
                    this.parseCommon(g);
                    break;
            }

            g = g.parent.moveNext();
        }
    }
}

export class Line extends EntityBase {

    vertices = new Array<Coordinate>();
    extrusionDirection: Coordinate;

    parse(g: Group): void {
        while (g?.code != 0) {

            switch (g.code) {
                case 10:
                    this.vertices.unshift(Coordinate.parse(g));
                    break;
                case 11:
                    this.vertices.push(Coordinate.parse(g));
                    break;
                case 210:
                    this.extrusionDirection = Coordinate.parse(g);
                    break;
                case 100:
                    break;
                default:
                    this.parseCommon(g);
            }

            g = g.parent.moveNext();
        }
    }
}

export class LwPolyline extends EntityBase {
    private numOfPoints = 0;

    elevation: number;
    depth: number;
    closed: boolean;
    hasContinuousLinetypePattern: boolean;
    width: number;
    extrusionDirectionX: number;
    extrusionDirectionY: number;
    extrusionDirectionZ: number;

    points = new Array<Coordinate>();

    parse(g: Group): void {
        while (g?.code !== 0) {
            let { code, value } = g;
            switch (code) {
                case 38:
                    this.elevation = value;
                    break;
                case 39:
                    this.depth = value;
                    break;
                case 70:
                    this.closed = value === 1;
                    break;
                case 90:
                    this.numOfPoints = value;
                    break;
                case 10: // 读取点数据
                    if (this.numOfPoints <= 0) g.parent.throwError("count of points in lwpolyline must larger than zero");
                    for (let i = 0; i < this.numOfPoints; i++) {
                        while (g.code !== 10)
                            g = g.parent.moveNext();
                        let point = Coordinate.parse(g);
                        this.points.push(point);
                        g = g.parent.moveNext();
                    }
                    break;
                case 43:
                    this.width = value;
                    break;
                case 210:
                    this.extrusionDirectionX = value;
                    break;
                case 220:
                    this.extrusionDirectionY = value;;
                    break;
                case 230:
                    this.extrusionDirectionZ = value;
                    break;
                default:
                    this.parseCommon(g);
            }

            if (g.code !== 0)
                g = g.parent.moveNext();
        }
    }
}

export class Polyline extends EntityBase {

    thickness: number;
    closed: boolean;
    includesCurveFitVertices: boolean;
    includesSplineFitVertices: boolean;
    is3dPolyline: boolean;
    is3dPolygonMesh: boolean;
    is3dPolygonMeshClosed: boolean;
    isPolyfaceMesh: boolean;
    hasContinuousLinetypePattern: boolean;
    extrusionDirection: Coordinate;

    vertices = new Array<Vertex>();

    parse(g: Group): void {
        while (g?.code !== 0) {
            let { code, value } = g;

            switch (code) {
                case 10:
                case 20:
                case 30:
                    break;
                case 39:
                    this.thickness = value;
                    break;
                case 40:
                case 41:
                    break;
                case 70:
                    this.closed = value === 1;
                    this.includesCurveFitVertices = (value & 2) !== 0;
                    this.includesSplineFitVertices = (value & 4) !== 0;
                    this.is3dPolyline = (value & 8) !== 0;
                    this.is3dPolygonMesh = (value & 16) !== 0;
                    this.is3dPolygonMeshClosed = (value & 32) !== 0; // 32 = The polygon mesh is closed in the N direction
                    this.isPolyfaceMesh = (value & 64) !== 0;
                    this.hasContinuousLinetypePattern = (value & 128) !== 0;
                    break;
                case 71:
                case 72:
                case 73:
                case 74:
                case 75:
                    break;
                case 210:
                    this.extrusionDirection = Coordinate.parse(g);
                    break;
                default:
                    this.parseCommon(g);
            }

            g = g.parent.moveNext();
        }

        while (!g.isEOF()) {
            let { code, value } = g;
            if (code !== 0) break;

            if (value === 'VERTEX') {
                g = g.parent.moveNext();
                let vertex = new Vertex();
                vertex.parse(g);
                this.vertices.push(vertex);
                g = g.parent.current();
            }
            else if (value === 'SEQEND') {
                g = g.parent.moveNext();
                while (g.code !== 0)
                    g = g.parent.moveNext();
            }
            else
                break;
        }
    }
}

export class Vertex extends EntityBase {

    x: number;
    y: number;
    z: number;
    bulge: number;
    curveFittingVertex: boolean;
    curveFitTangent: boolean;
    splineVertex: boolean;
    splineControlPoint: boolean;
    threeDPolylineVertex: boolean;
    threeDPolylineMesh: boolean;
    polyfaceMeshVertex: boolean;
    faceA: number;
    faceB: number;
    faceC: number;
    faceD: number;

    parse(g: Group): void {
        while (g?.code !== 0) {
            let { code, value } = g;

            switch (code) {
                case 10:
                    this.x = value;
                    break;
                case 20:
                    this.y = value;
                    break;
                case 30:
                    this.z = value;
                    break;
                case 40:
                case 41:
                    break;
                case 42:
                    this.bulge = value;
                    break;
                case 51:
                    break;
                case 70:
                    this.curveFittingVertex = (value & 1) !== 0;
                    this.curveFitTangent = (value & 2) !== 0;
                    this.splineVertex = (value & 8) !== 0;
                    this.splineControlPoint = (value & 16) !== 0;
                    this.threeDPolylineVertex = (value & 32) !== 0;
                    this.threeDPolylineMesh = (value & 64) !== 0;
                    this.polyfaceMeshVertex = (value & 128) !== 0;
                    break;
                case 71: // polyface mesh vertex index
                    this.faceA = value;
                    break;
                case 72: // polyface mesh vertex index
                    this.faceB = value;
                    break;
                case 73: // polyface mesh vertex index
                    this.faceC = value;
                    break;
                case 74: // polyface mesh vertex index
                    this.faceD = value;
                    break;
                default:
                    this.parseCommon(g);
                    break;
            }

            g = g.parent.moveNext();
        }
    }
}

export class Text extends EntityBase {
    text: string = '';
    position: Coordinate;
    height: number;
    width: number;
    rotation: number;
    attachmentPoint: number;
    drawingDirection: number;

    parse(g: Group): void {
        while (g?.code !== 0) {
            let { code, value } = g;
            switch (code) {
                case 1:
                case 3:
                    this.text += value;
                    break;
                case 10:
                    this.position = Coordinate.parse(g);
                    break;
                case 40:
                    //Note: this is the text height
                    this.height = value;
                    break;
                case 41:
                    this.width = value;
                    break;
                case 50:
                    this.rotation = value;
                    break;
                case 71:
                    this.attachmentPoint = value;
                    break;
                case 72:
                    this.drawingDirection = value;
                    break;
                default:
                    this.parseCommon(g);
                    break;
            }

            g = g.parent.moveNext();
        }
    }
}

export class EntitySection implements ISectionBase {

    parse(g: Group) {
        let entities = new Dictionary<DxfEntityType, Array<EntityBase>>();
        let currentEntityType: DxfEntityType;
        let currentEntity: EntityBase;

        while (!(g.isENDSEC() || g.isENDBLK() || g.isEOF())) {
            let { code, value } = g;

            if (code == 0) // type of entity
            {
                currentEntityType = value;
                currentEntity = EntityBase.getInstance(value);
                g = g.parent.moveNext();
            }
            else// set value to entity
            {
                if (!currentEntity) {
                    g = g.parent.moveNext();
                    continue;
                }

                currentEntity.parse(g);

                //从字典中获取该类型的数组存储
                let typeValues = entities.get(currentEntityType);

                //如果该类型不存在，则创建一个
                if (!typeValues) {
                    typeValues = new Array<EntityBase>();
                    entities.add(currentEntityType, typeValues);
                }

                typeValues.push(currentEntity);
                g = g.parent.current();
            }
        }

        return entities;
    }
}