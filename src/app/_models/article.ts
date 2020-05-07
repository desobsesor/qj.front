export class Article {

    constructor(
        public id: number,
        public _id: string,
        public titulo: string,
        public descripcion: string,
        public activo?: boolean,
        public token?: string
    ) {  }
}
