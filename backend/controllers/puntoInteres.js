import PuntoInteres from '../modules/PuntoInteres.js';

import Coordenada from '../modules/Coordenada.js';


const crearUno = async (req, res) => {
    const {
        nombrePunto,
        horario = null, // Valor opcional
        imagenPath = null, // Valor opcional
        direccion,
        descripcion = null, // Valor opcional
        longitud,
        latitud,
        idTipoPunto,
        id_creador
    } = req.body;
        // Valida los campos obligatorios
    if (!nombrePunto || !direccion || !idTipoPunto || !latitud || !longitud || !id_creador) {
        return res.status(400).json({
            message: "Faltan campos obligatorios (nombrePunto, direccion, id_tipo, id_coordenada, id_creador).",
        });
    }
    try {
        
    
        const punto = new PuntoInteres(
            null, 
            id_creador,
            nombrePunto,
            imagenPath,
            horario,
            direccion,
            descripcion,
            idTipoPunto,
        );
        const puntoCreado = await punto.agregarPuntoInteresBD();
        const itemID = puntoCreado.getId();
        
        const coordenada = new Coordenada(null,1,latitud,longitud,null,itemID);
        
        const coordenadaSubida =coordenada.agregarCoordenadaPuntoBD()
        
        res.status(201).json({
            message: 'Punto interes creado exitosamente',
            itemID
        });
        // console.log(MENSAJE DE EXITO ENVIADO);
    } catch (error) { 
        console.error('Error al crear el punto de interes (controlador):', error.message); 
        res.status(500).json({
            message: 'Error al crear el punto de interes (controlador):',
            error: error.message
        });
    }
};


const obtenerTodos = async (req, res) => {
    try{ 
        const listaItemsBD = await PuntoInteres.obtenerPuntosInteresBD();

        if (!listaItemsBD) {
            return res.status(404).json({ 
                message: 'No se encontraron puntos interes en la base de datos.'
            });
        }
        res.status(200).json({
            message: 'Puntos interes cargados y agregados exitosamente.',
            items: listaItemsBD
        });

    }catch (error) { 
        console.error('Error al cargar puntos interes (controlador):', error.message);
        res.status(500).json({
            message: 'Error al cargar puntos interes (controlador):',
            error: error.message
        });
    }

};

    
const obtenerPorID = async (req, res) => {
    const { id } = req.params; 
    try {
        const item = await PuntoInteres.obtenerPuntosPorID(id);
        if (item) {
            return res.status(200).json({ 
                success: true, item });
        } else {
            return res.status(404).json({ 
                success: false, message: "Punto no encontrado (controlador)" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error al obtener el Punto (controlador).", error: error.message });
    }
};

const obtenerPorUsuario = async (req, res) => {
    const { id } = req.params; 
    try {
        const items = await PuntoInteres.obtenerPuntosPorUsuario(id);

        // Si no hay puntos registrados, devolver una respuesta vacía en lugar de un error
        if (!items || items.length === 0) {
            return res.status(200).json({ 
                success: true, 
                items: [], // Devolver un array vacío para evitar problemas en el frontend
                message: "No se encontraron puntos registrados para este usuario."
            });
        }
        return res.status(200).json({ 
            success: true, 
            items 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Error al obtener los puntos registrados (controlador).", 
            error: error.message 
        });
    }
};

const obtenerPorUsuarioCoordenada = async (req, res) => {
    const { id } = req.params; 
    try {
        const items = await PuntoInteres.obtenerPuntosPorUsuario(id);

        if (!items || items.length === 0) {
            return res.status(200).json({ success: true, items: [] });
        }

        // Añadir coordenadas desde la tabla 'coordenada'
        for (const item of items) {
            const coordenadas = await Coordenada.obtenerCoordenadasPorPuntoInteres(item.id);
            if (coordenadas.length > 0) {
                item.latitud = coordenadas[0].latitud;
                item.longitud = coordenadas[0].longitud;
            }
        }

        res.status(200).json({ success: true, items });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los puntos registrados.", error });
    }
};


const obtenerPorTipo = async (req, res) => {
    const { id_Usuario, id_tipo } = req.params; 
    try {
        const item = await PuntoInteres.obtenerPuntosPorTipo(id_Usuario, id_tipo);
        if (item) {
            return res.status(200).json({ 
                success: true, item });
        } else {
            return res.status(404).json({ 
                success: false, message: "Punto no encontrado (controlador)" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error al obtener el Punto (controlador).", error: error.message });
    }
};

const editar = async (req, res) => {
    const{id} = req.params; 
    const PuntoIntere= req.body;

    try {
        const resultado = await PuntoInteres.editarPuntoInteres(PuntoIntere);

        if (resultado) {
            return res.status(200).json({ 
                success: true, message: "Punto actualizado con éxito." });
        } else {
            return res.status(404).json({ 
                success: false, message: "Punto no encontrado. (controlador)" });
        }
    } catch (error) {
        return res.status(500).json({ 
            success: false, message: "Error al actualizar el Punto. (controlador)", error: error.message });
    }
};

const eliminarUno = async (req, res) => {
    const{id} = req.params; 

    try {
        const resultado = await PuntoInteres.eliminarPuntoInteres(id);

        if (resultado) {
            return res.status(200).json({ 
                success: true, message: "Punto eliminado con éxito." });
        } else {
            return res.status(404).json({ 
                success: false, message: "Punto no encontrado. (controlador)" });
        }
    } catch (error) {
        return res.status(500).json({ 
            success: false, message: "Error al eliminado el Punto. (controlador)", error: error.message });
    }
};


export { 
    crearUno,
    obtenerTodos,
    obtenerPorID,
    obtenerPorUsuario,
    obtenerPorTipo,
    editar,
    eliminarUno,
    obtenerPorUsuarioCoordenada
};

