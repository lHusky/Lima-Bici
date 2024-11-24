
import TipoPuntoInteres from '../modules/TipoPuntoInteres.js';

// tipoPuntoInteresRouter.delete('/tipoPuntoInteres/:id',  borrar);

const crearUno = async (req, res) => {
    const {titulo} = req.body;

    try {
        const item = new TipoPuntoInteres(titulo);
        const item_enviado = await item.agregarTipoPuntoInteresBD(titulo);
        const itemID = item_enviado.getId();
        res.status(201).json({
            message: 'Tipo de punto interes creado exitosamente',
            itemID
        });
        console.log(`MENSAJE DE EXITO ENVIADO`);
    } catch (error) { 
        console.error('Error al crear el tipo de punto de interes (controlador):', error.message); // Añadido para debug
        res.status(500).json({
            message: 'Error al crear el tipo de punto de interes (controlador):',
            error: error.message
        });
    }
};


const obtenerTodos = async (req, res) => {
    try{ 
        const listaItemsBD = await TipoPuntoInteres.obtenerTiposPuntoInteresBD();

        if (!listaItemsBD) {
            return res.status(404).json({ 
                message: 'No se encontraron tipos de punto interes en la base de datos.'
            });
        }
        res.status(200).json({
            message: 'Tipos de punto interes cargados y agregados exitosamente.',
            items: listaItemsBD
        });

    }catch (error) { 
        console.error('Error al cargar Tipos de punto interes (controlador):', error.message);
        res.status(500).json({
            message: 'Error al cargar Tipos de punto interes (controlador):',
            error: error.message
        });
    }

};


const obtenerPorID = async (req, res) => {
    const { id } = req.params; 
    try {
        const item = await TipoPuntoInteres.obtenerTipoPuntosPorID(id);
        if (item) {
            return res.status(200).json({ 
                success: true, item });
        } else {
            return res.status(404).json({ 
                success: false, message: "Tipo de Punto no encontrado (controlador)" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error al obtener el Tipo de Punto (controlador).", error: error.message });
    }
};


const editar = async (req, res) => {
    const{id} = req.params; 
    const datos_actualizados = req.body; 

    try {
        const resultado = await TipoPuntoInteres.editarTipoPuntoInteres(id,datos_actualizados);

        if (resultado) {
            return res.status(200).json({ 
                success: true, message: "Tipo de Punto actualizado con éxito." });
        } else {
            return res.status(404).json({ 
                success: false, message: "Tipo de Punto no encontrado. (controlador)" });
        }
    } catch (error) {
        return res.status(500).json({ 
            success: false, message: "Error al actualizar el Tipo de Punto. (controlador)", error: error.message });
    }
};

const eliminarUno = async (req, res) => {
    const{id} = req.params; 

    try {
        const resultado = await TipoPuntoInteres.eliminarTipoPuntoInteres(id);

        if (resultado) {
            return res.status(200).json({ 
                success: true, message: "Tipo de Punto eliminado con éxito." });
        } else {
            return res.status(404).json({ 
                success: false, message: "Tipo de Punto no encontrado. (controlador)" });
        }
    } catch (error) {
        return res.status(500).json({ 
            success: false, message: "Error al eliminado el Tipo de Punto. (controlador)", error: error.message });
    }
};


export { 
    crearUno,
    obtenerTodos,
    obtenerPorID,
    editar,
    eliminarUno
};

