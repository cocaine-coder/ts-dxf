import { Dictionary } from "./common";

export const dxfColors = [
    "#000000",
    "#ff0000",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#0000ff",
    "#ff00ff",
    "#ffffff",
    "#808080",
    "#c0c0c0",
    "#ff0000",
    "#ff7f7f",
    "#cc0000",
    "#cc6666",
    "#990000",
    "#994c4c",
    "#7f0000",
    "#7f3f3f",
    "#4c0000",
    "#4c2626",
    "#ff3f00",
    "#ff9f7f",
    "#cc3300",
    "#cc7f66",
    "#992600",
    "#995f4c",
    "#7f1f00",
    "#7f4f3f",
    "#4c1300",
    "#4c2f26",
    "#ff7f00",
    "#ffbf7f",
    "#cc6600",
    "#cc9966",
    "#994c00",
    "#99724c",
    "#7f3f00",
    "#7f5f3f",
    "#4c2600",
    "#4c3926",
    "#ffbf00",
    "#ffdf7f",
    "#cc9900",
    "#ccb266",
    "#997200",
    "#99854c",
    "#7f5f00",
    "#7f6f3f",
    "#4c3900",
    "#4c4226",
    "#ffff00",
    "#ffff7f",
    "#cccc00",
    "#cccc66",
    "#999900",
    "#99994c",
    "#7f7f00",
    "#7f7f3f",
    "#4c4c00",
    "#4c4c26",
    "#bfff00",
    "#dfff7f",
    "#99cc00",
    "#b2cc66",
    "#729900",
    "#85994c",
    "#5f7f00",
    "#6f7f3f",
    "#394c00",
    "#424c26",
    "#7fff00",
    "#bfff7f",
    "#66cc00",
    "#99cc66",
    "#4c9900",
    "#72994c",
    "#3f7f00",
    "#5f7f3f",
    "#264c00",
    "#394c26",
    "#3fff00",
    "#9fff7f",
    "#33cc00",
    "#7fcc66",
    "#269900",
    "#5f994c",
    "#1f7f00",
    "#4f7f3f",
    "#134c00",
    "#2f4c26",
    "#00ff00",
    "#7fff7f",
    "#00cc00",
    "#66cc66",
    "#009900",
    "#4c994c",
    "#007f00",
    "#3f7f3f",
    "#004c00",
    "#264c26",
    "#00ff3f",
    "#7fff81",
    "#00cc33",
    "#66cc7f",
    "#009926",
    "#4c995f",
    "#007f1f",
    "#3f7f4f",
    "#004c13",
    "#264c2f",
    "#00ff7f",
    "#7fffbf",
    "#00cc66",
    "#66cc99",
    "#00994c",
    "#4c9972",
    "#007f3f",
    "#3f7f5f",
    "#004c26",
    "#264c39",
    "#00ffbf",
    "#7fffdf",
    "#00cc99",
    "#66ccb2",
    "#009972",
    "#4c9985",
    "#007f5f",
    "#3f7f6f",
    "#004c39",
    "#264c42",
    "#00ffff",
    "#7fffff",
    "#00cccc",
    "#66cccc",
    "#009999",
    "#4c9999",
    "#007f7f",
    "#3f7f7f",
    "#004c4c",
    "#264c4c",
    "#00bfff",
    "#7fdfff",
    "#0099cc",
    "#66b2cc",
    "#007299",
    "#4c8599",
    "#005f7f",
    "#3f6f7f",
    "#00394c",
    "#26424c",
    "#007fff",
    "#7fbfff",
    "#0066cc",
    "#6699cc",
    "#004c99",
    "#4c7299",
    "#003f7f",
    "#3f5f7f",
    "#00264c",
    "#26394c",
    "#003fff",
    "#7f9fff",
    "#0033cc",
    "#667fcc",
    "#002699",
    "#4c5f99",
    "#001f7f",
    "#3f4f7f",
    "#00134c",
    "#262f4c",
    "#0000ff",
    "#7f7fff",
    "#0000cc",
    "#6666cc",
    "#000099",
    "#4c4c99",
    "#00007f",
    "#3f3f7f",
    "#00004c",
    "#26264c",
    "#3f00ff",
    "#9f7fff",
    "#3300cc",
    "#7f66cc",
    "#260099",
    "#5f4c99",
    "#1f007f",
    "#4f3f7f",
    "#13004c",
    "#2f264c",
    "#7f00ff",
    "#bf7fff",
    "#6600cc",
    "#9966cc",
    "#4c0099",
    "#724c99",
    "#3f007f",
    "#5f3f7f",
    "#26004c",
    "#39264c",
    "#bf00ff",
    "#df7fff",
    "#9900cc",
    "#b266cc",
    "#720099",
    "#854c99",
    "#5f007f",
    "#6f3f7f",
    "#39004c",
    "#42264c",
    "#ff00ff",
    "#ff7fff",
    "#cc00cc",
    "#cc66cc",
    "#990099",
    "#994c99",
    "#7f007f",
    "#7f3f7f",
    "#4c004c",
    "#4c264c",
    "#ff00bf",
    "#ff7fdf",
    "#cc0099",
    "#cc66b2",
    "#990072",
    "#994c85",
    "#7f005f",
    "#7f3f6f",
    "#4c0039",
    "#4c2642",
    "#ff007f",
    "#ff7fbf",
    "#cc0066",
    "#cc6699",
    "#99004c",
    "#994c72",
    "#7f003f",
    "#7f3f5f",
    "#4c0026",
    "#4c2639",
    "#ff003f",
    "#ff7f9f",
    "#cc0033",
    "#cc667f",
    "#990026",
    "#994c5f",
    "#7f001f",
    "#7f3f4f",
    "#4c0013",
    "#4c262f",
    "#333333",
    "#5b5b5b",
    "#848484",
    "#adadad",
    "#d6d6d6",
    "#ffffff"
]

export const dxfConvertType = (code: number, value: string) => {

    //字符串（随着从 AutoCAD 2000 起引入了扩展符号名称，字数限制已由 255 个字符扩大到 2049 个单字节字符，不包括行末的换行符）
    if (code <= 9) return value;

    //10-39 双精度三维点值  40-59 双精度浮点值
    if (code >= 10 && code <= 59) return parseFloat(value);

    //60-79 16 位整数值  90-99 32 位整数值
    if ((code >= 60 && code <= 79) || (code >= 90 && code <= 99)) return parseInt(value);

    //100,102 字符串（最多 255 个字符；对于 Unicode 字符串，字符数要少一些）
    //105 表示 16 进制 (hex) 句柄值的字符串
    if (code >= 100 && code <= 109) return value;

    //110-139 双精度浮点值   140-149 双精度标量浮点值
    if (code >= 110 && code <= 149) return parseFloat(value);

    //160-179 16 位整数值
    if (code >= 160 && code <= 179) return parseInt(value);

    //210-239 双精度浮点值
    if (code >= 210 && code <= 239) return parseFloat(value);

    //270-289  16 位整数值
    if (code >= 270 && code <= 289) return parseInt(value);

    //290-299  布尔标志值
    if (code >= 290 && code <= 299) return value === '1';

    //300-309  任意字符串
    //310-319  表示二进制数据块的十六进制值的字符串
    //320-329  表示 16 进制句柄值的字符串
    //330-369  表示十六进制对象 ID 的字符串
    if (code >= 300 && code <= 369) return value;

    //370-389  16 位整数值
    if (code >= 370 && code <= 389) return parseInt(value);

    //390-399 表示 16 进制句柄值的字符串
    if (code >= 390 && code <= 399) return value;

    //400-409 16 位整数值
    if (code >= 400 && code <= 409) return parseInt(value);

    //410-419 字符串
    if (code >= 410 && code <= 419) return value;

    //420-429  32 位整数值
    if (code >= 420 && code <= 429) return parseInt(value);

    //430-439  字符串
    if (code >= 430 && code <= 439) return value;

    //440-449  32 位整数值  450-459  长整数
    if (code >= 440 && code <= 459) return parseInt(value);

    //460-469  双精度浮点值
    if (code >= 460 && code <= 469) return parseFloat(value);

    //470-479  字符串
    if (code >= 470 && code <= 481) return value;

    //999   注释（字符串）
    if (code === 999) return value;

    //1000-1009  字符串（与 0-9 代码范围的限制相同）
    if (code >= 1000 && code <= 1009) return value;

    //1010-1059  双精度浮点值
    if (code >= 1010 && code <= 1059) return parseFloat(value);

    //1060-1070  16 位整数值   1071  32 位整数值
    if (code >= 1060 && code <= 1071) return parseInt(value);

    console.warn("value doesn't have a define type to convert", { code, value });
    return value;
}

export type DxfVersion = 
    "Unknown" |
    "AutoCad10" |
    "AutoCad12" |
    "AutoCad13" |
    "AutoCad14" |
    "AutoCad2000" |
    "AutoCad2004" |
    "AutoCad2007" |
    "AutoCad2010" |
    "AutoCad2013" |
    "AutoCad2018";

export const ACADVERS = new Dictionary<string, DxfVersion>([
    { key: "MC0.0", val: "Unknown" },
    { key: "AC1.2", val: "Unknown" },
    { key: "AC1.4", val: "Unknown" },
    { key: "AC1.50", val: "Unknown" },
    { key: "AC2.10", val: "Unknown" },
    { key: "AC1002", val: "Unknown" },
    { key: "AC1003", val: "Unknown" },
    { key: "AC1004", val: "Unknown" },
    { key: "AC1006", val: "AutoCad10" },
    { key: "AC1009", val: "AutoCad12" },
    { key: "AC1012", val: "AutoCad13" },
    { key: "AC1014", val: "AutoCad14" },
    { key: "AC1015", val: "AutoCad2000" },
    { key: "AC1018", val: "AutoCad2004" },
    { key: "AC1021", val: "AutoCad2007" },
    { key: "AC1024", val: "AutoCad2010" },
    { key: "AC1027", val: "AutoCad2013" },
    { key: "AC1032", val: "AutoCad2018" }
]);