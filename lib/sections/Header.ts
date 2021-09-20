import { Dictionary } from "../common";
import { Group } from "../GroupEnumerator";
import { Coordinate, ISectionBase } from "./Common";

export class HeaderVariable {
    code: number;
    value: any;

    constructor(code: number, value: any) {
        this.code = code;
        this.value = value;
    }
}

export class HeaderVariables{

    variables = new Dictionary<string, HeaderVariable>();

    constructor() {
        this.variables.set("$ACADVER", new HeaderVariable(1, "AutoCad2018"));
        this.variables.set("$DWGCODEPAGE", new HeaderVariable(3, "ANSI_1252"));
        this.variables.set("$LASTSAVEDBY", new HeaderVariable(1, ""));
        this.variables.set("$HANDSEED", new HeaderVariable(5, "1"));
        this.variables.set("$ANGBASE", new HeaderVariable(50, 0.0));
        this.variables.set("$ANGDIR", new HeaderVariable(70, 0));
        this.variables.set("$ATTMODE", new HeaderVariable(70, 1));
        this.variables.set("$AUNITS", new HeaderVariable(70, 0));
        this.variables.set("$AUPREC", new HeaderVariable(70, 0));
        this.variables.set("$CECOLOR", new HeaderVariable(62, 256));
        this.variables.set("$CELTSCALE", new HeaderVariable(40, 1.0));
        this.variables.set("$CELTYPE", new HeaderVariable(6, "ByLayer"));
        this.variables.set("$CELWEIGHT", new HeaderVariable(370, -1));
        this.variables.set("$CLAYER", new HeaderVariable(8, "0"));
        this.variables.set("$CMLJUST", new HeaderVariable(70, 0));
        this.variables.set("$CMLSCALE", new HeaderVariable(40, 20.0));
        this.variables.set("$CMLSTYLE", new HeaderVariable(2, "Standard"));
        this.variables.set("$DIMSTYLE", new HeaderVariable(2, "Standard"));
        this.variables.set("$TEXTSIZE", new HeaderVariable(40, 2.5));
        this.variables.set("$TEXTSTYLE", new HeaderVariable(7, "Standard"));
        this.variables.set("$LUNITS", new HeaderVariable(70, 2));
        this.variables.set("$LUPREC", new HeaderVariable(70, 4));
        this.variables.set("$MIRRTEXT", new HeaderVariable(70, 0));
        this.variables.set("$EXTNAMES", new HeaderVariable(290, 1));
        this.variables.set("$INSBASE", new HeaderVariable(10, Coordinate.zero));
        this.variables.set("$INSUNITS", new HeaderVariable(70, 0));
        this.variables.set("$LTSCALE", new HeaderVariable(40, 1.0));
        this.variables.set("$LWDISPLAY", new HeaderVariable( 290, 0));
        this.variables.set("$PDMODE", new HeaderVariable(70, 0));
        this.variables.set("$PDSIZE", new HeaderVariable(40, 0.0));
        this.variables.set("$PLINEGEN", new HeaderVariable(70, 0));
        this.variables.set("$PSLTSCALE", new HeaderVariable(70, 1));
        this.variables.set("$TDCREATE", new HeaderVariable( 40, new Date().getTime()));
        this.variables.set("$TDUCREATE", new HeaderVariable(40, new Date().getTime()));
        this.variables.set("$TDUPDATE", new HeaderVariable(40, new Date().getTime()));
        this.variables.set("$TDUUPDATE", new HeaderVariable(40, new Date().getTime()));
        this.variables.set("$UCSORG", new HeaderVariable(10, Coordinate.zero));
        this.variables.set("$UCSXDIR", new HeaderVariable(10, Coordinate.unitX));
        this.variables.set("$UCSYDIR", new HeaderVariable(10, Coordinate.unitY));
    }
}

export class HeaderSection implements ISectionBase {
    
    parse(g: Group) {

        let values = new Dictionary<string, HeaderVariable>();
        let currentName: string | undefined = undefined;
        let currentValue: any | undefined = undefined;

        while (true) {
            let { code, value } = g;

            if (g.isENDSEC()) {
                if (currentName) values.set(currentName, new HeaderVariable(code, currentValue));
                break;
            }
            else if (code === 9) {
                if (currentName) values.set(currentName, new HeaderVariable(code, currentValue));
                currentName = value;
            }
            else {
                if (code === 10)
                    currentValue = Coordinate.parse(g)
                else
                    currentValue = value;
            }
            g = g.parent.moveNext();
        }

        return values;
    }
}