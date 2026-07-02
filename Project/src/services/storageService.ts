
export class GenericStorage<T> {
    private readonly storageKey:string;
    private readonly parser: (raw: any) => T;
    constructor(storageKey: string, parser: (raw: any) => T) {
        this.storageKey = storageKey;
        this.parser = parser;
    }

    saveAll(items: T[]): void{
        localStorage.setItem(this.storageKey,JSON.stringify(items));
    }

    getAll(): T[]{
        const data = localStorage.getItem(this.storageKey);
        if(!data) return [];
        const rawItems = JSON.parse(data)   ;
        return rawItems.map((raw: any) => this.parser(raw));
    }

    saveNewItem(item: T): void{
        const items: T[] = this.getAll();
        items.push(item);
        this.saveAll(items);
    }

    exportToJSON(filename: string = 'incidents.json'): void{
        const data = JSON.stringify(this.getAll());
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }

    importJSON(jsonString: string): void{
        let parsedData;
        try{
            parsedData = JSON.parse(jsonString);
        }catch(e){
            console.error("Invalid JSON file");
            return;
        }
        if(!Array.isArray(parsedData)) return;
        const validItems = parsedData.map((raw: any) => this.parser(raw));
        this.saveAll(validItems);

    }

    deleteItem(id:string): void{
        const items = this.getAll();
        const keptItems = items.filter((item: any) => item.id !== id);
        this.saveAll(keptItems);
    }

    updateItem(id: string, updates: Partial<T>): void{
        const items = this.getAll();
        const index = items.findIndex((item: any) => item.id == id);
        if(index !== -1){
            items[index] = { ...items[index], ...updates };
            this.saveAll(items);
        }
    }
}