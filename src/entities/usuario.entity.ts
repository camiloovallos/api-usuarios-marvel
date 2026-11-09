import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { rolpersonal } from '../entities/rol-personal.entity'; // Ajusta la ruta si es necesario

@Entity({ name: 'users', schema: 'marvel_schema' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 150 })
  nombre: string;

  @Column({ length: 150, unique: true })
  correo: string;

  @Column({ name: 'contraseña', length: 255 })
  contrasena: string;

  @OneToMany(() => rolpersonal, (rol) => rol.usuario)
  roles: rolpersonal[];
}