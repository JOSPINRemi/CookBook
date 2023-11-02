import { readFileSync, writeFileSync } from "fs";

export class Data {
    static file;
    static data;

    static read() {
        const raw = readFileSync(Data.file, {encoding: "utf-8"});
        const db = JSON.parse(raw);
        for(let key in db) {
            if (key in this.data) Data.data[key] = db[key];
        }
    }

    static write() {
        writeFileSync(Data.file, JSON.stringify(this.data));
    }

    static reset() {
        writeFileSync(Data.file, "")
    }
}