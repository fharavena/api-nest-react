import { Controller, Post, Body, Get, Delete, Put, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {
    constructor(private mensajeService: MensajesService) { }

    @Post()
    create(@Body() createMessageDto: CreateMensajeDto, @Res() response) {
        this.mensajeService.createMensaje(createMessageDto).then(
            mensaje => {
                response.status(HttpStatus.CREATED).json(mensaje);
            }
        ).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'error en la creacion del mensaje' });
        }
        );
    }
    @Get()
    getAll(@Res() response) {
        this.mensajeService.getAll().then(
            mensajesList => {
                response.status(HttpStatus.OK).json(mensajesList);
            }
        ).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'error en la obtencion de los mensajes'});
        }
        );
    }

    @Put(':id')
    update(@Body() updateMessageDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje) {
        this.mensajeService.updateMensaje(idMensaje, updateMessageDto).then(
            mensaje => {
                response.status(HttpStatus.OK).json(mensaje);
            }
        ).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'error en la edicion del mensaje' });
        }
        );
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje) {
        this.mensajeService.deleteMensaje(idMensaje).then(
            mensaje => {
                response.status(HttpStatus.OK).json(mensaje);
            }
        ).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'error en la eliminación del mensaje' });
        }
        );
    }
}
