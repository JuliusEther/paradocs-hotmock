export namespace Paradocs {
    export type Record = {
        ID: string
        Title: string
        Tag: Array<string>
        Description: string
    }

    export class State {

        private data: Array<Record>
        private data_source: string | null = null

        public async fetch_data(on_conplete: Function) {
            if (this.data_source != null) {
                const result = await (await fetch(this.data_source, { method: "GET" })).json()
                this.data = this.parse_record(result)
                on_conplete()
            }
        }

        private parse_record(data: any): Array<Record> {
            const result: Array<Record> = []

            if (!(data instanceof Array)) {
                throw TypeError("not array")
            }

            for (const item of data) {
                const record = this.get_record(item)
                if (record === null) {
                    break;
                }
                result.push(record)
            }

            return result;
        }

        private get_record(record: Record): Record | null {
            if (record !== null &&
                typeof record === "object" &&
                typeof record.ID === "string" &&
                typeof record.Title === "string" &&
                record.Tag instanceof Array &&
                typeof record.Description === "string"
            ) {
                return record
            } else {
                return null
            }

        }

        public set_data_source(data_source: string) {
            this.data_source = data_source
        }

        public * filter_records(word: string, full_mactch: boolean = true, match_title: boolean = true, match_tag: boolean = false) {
            if (match_title) {
                if (full_mactch) {
                    for (const item of this.data) {
                        if (item.Title.match("^" + word + "$")) {
                            yield item
                        }
                    }
                } else {
                    for (const item of this.data) {
                        if (item.Title.indexOf(word) !== -1) {
                            yield item
                        }
                    }
                }
            }

            if (match_tag) {
                if (full_mactch) {
                    for (const item of this.data) {
                        for (const tag of item.Tag) {
                            if (tag.match("^" + word + "$")) {
                                yield item
                            }
                        }
                    }
                } else {
                    for (const item of this.data) {
                        for (const tag of item.Tag) {
                            if (tag.indexOf(word) !== -1) {
                                yield item
                            }
                        }
                    }
                }
            }
        }

        public * get_all_records() {
            for (const item of this.data) {
                yield item
            }
        }
    }
}