import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async registrar(nombre: string, correo: string, contrasena: string) {
    const correoLimpio = correo ? correo.trim().toLowerCase() : '';
    
    const existe = await this.usuarioRepository.findOne({ where: { correo: correoLimpio } });
    if (existe) {
      throw new BadRequestException('El correo ya se encuentra registrado.');
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = this.usuarioRepository.create({
      nombre,
      correo: correoLimpio,
      contrasena: hashedPassword,
    });

    await this.usuarioRepository.save(nuevoUsuario);

    return {
      mensaje: '¡Usuario registrado con éxito! Ya puedes iniciar sesión.',
    };
  }

  async login(correo: string, contrasena: string) {
    const correoLimpio = correo ? correo.trim().toLowerCase() : '';

    const usuario = await this.usuarioRepository.findOne({ where: { correo: correoLimpio } });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas o usuario no registrado.');
    }

    const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esValida) {
      throw new UnauthorizedException('Contraseña incorrecta.');
    }

    return {
      mensaje: 'Login exitoso',
      nombre: usuario.nombre,
      correo: usuario.correo,
    };
  }
}