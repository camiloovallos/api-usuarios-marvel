import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    UsuariosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres', // Cambia esto si tu contraseña de postgres es distinta
      database: 'marvel_db',
      autoLoadEntities: true,
      synchronize: false, // Manténlo en falso para que respete tu tabla existente
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}