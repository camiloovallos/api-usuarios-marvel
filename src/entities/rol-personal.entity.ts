import * as typeorm from 'typeorm';
import { Usuario } from './usuario.entity.js';

@typeorm.Entity('Roles_Personal')
export class rolpersonal {
  @typeorm.PrimaryGeneratedColumn()
  id_personal: number;

  @typeorm.Column({ length: 50 })
  rol: string;

  @typeorm.ManyToOne(() => Usuario, (usuario) => usuario.roles)
  @typeorm.JoinColumn({ name: 'id_usuario' })
  usuario: typeorm.Relation<Usuario>;
}