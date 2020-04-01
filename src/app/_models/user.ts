export class User {
    id: number;
    _id: string;
    usuario: string;
    nombreCompleto: string;
    documento: string;
    passwordHash: string;
    passwordSalt: string;
    correo: string;
    nivelEducativo: string;
    telefono: string;
    direccion: string;
    rol: string;
    activo?: boolean;
    persona: string;
    token: string;
}
