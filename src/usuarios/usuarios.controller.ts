import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('register')
  async register(@Body() body: { nombre: string; correo: string; contrasena: string }) {
    return await this.usuariosService.registrar(body.nombre, body.correo, body.contrasena);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { correo: string; contrasena: string }) {
    return await this.usuariosService.login(body.correo, body.contrasena);
  }
}