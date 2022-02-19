var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export var Paradocs;
(function (Paradocs) {
    class State {
        constructor() {
            this.data_source = null;
        }
        fetch_data(on_conplete) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.data_source != null) {
                    const result = yield (yield fetch(this.data_source, { method: "GET" })).json();
                    this.data = this.parse_record(result);
                    on_conplete();
                }
            });
        }
        parse_record(data) {
            const result = [];
            if (!(data instanceof Array)) {
                throw TypeError("not array");
            }
            for (const item of data) {
                const record = this.get_record(item);
                if (record === null) {
                    break;
                }
                result.push(record);
            }
            return result;
        }
        get_record(record) {
            if (record !== null &&
                typeof record === "object" &&
                typeof record.ID === "string" &&
                typeof record.Title === "string" &&
                record.Tag instanceof Array &&
                typeof record.Description === "string") {
                return record;
            }
            else {
                return null;
            }
        }
        set_data_source(data_source) {
            this.data_source = data_source;
        }
        *filter_records(word, full_mactch = true, match_title = true, match_tag = false) {
            if (match_title) {
                if (full_mactch) {
                    for (const item of this.data) {
                        if (item.Title.match("^" + word + "$")) {
                            yield item;
                        }
                    }
                }
                else {
                    for (const item of this.data) {
                        if (item.Title.indexOf(word) !== -1) {
                            yield item;
                        }
                    }
                }
            }
            if (match_tag) {
                if (full_mactch) {
                    for (const item of this.data) {
                        for (const tag of item.Tag) {
                            if (tag.match("^" + word + "$")) {
                                yield item;
                            }
                        }
                    }
                }
                else {
                    for (const item of this.data) {
                        for (const tag of item.Tag) {
                            if (tag.indexOf(word) !== -1) {
                                yield item;
                            }
                        }
                    }
                }
            }
        }
    }
    Paradocs.State = State;
})(Paradocs || (Paradocs = {}));
//# sourceMappingURL=paradocs.js.map