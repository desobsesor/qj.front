export class SportsField {
    id: number;
    _id: string;
    nombre: string;
    propietario: string;
    descripcion: string;
    horarioDeAtencion: string;
    direccion: {
        departamento: string;
        municipio: string;
        barrio: string;
        calle: string;
        manzana: string;
        numero: string;
    };
    fotoPrincipal: string;
    fotoBanner: string;
    administrador: number;
    personaRegistro: string;
    fechaRegistro: string;
    personaCambio: string;
    fechaCambio: string;
    clase: string;
    icono: string;
    token: string;
}
