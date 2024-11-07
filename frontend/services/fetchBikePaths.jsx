// src/services/fetchBikePaths.js

import axios from 'axios';

export const fetchBikePaths = async () => {
  try {
    const response = await axios.get(
      'https://sit.icl.gob.pe/arcgis/rest/services/AGOL_Servicios/CICLOVIA_17_11_2022_V3/MapServer/1/query',
      {
        params: {
          where: '1=1',
          outFields: '*',
          f: 'geojson',
        },
        timeout: 10000,
      }
    );

    if (response.data && response.data.features) {
      // Formatear las ciclovías en un array de coordenadas
      const bikePaths = response.data.features.map((feature) => {
        return feature.geometry.coordinates.map(([lng, lat]) => ({
          latitude: lat,
          longitude: lng,
        }));
      });

      return bikePaths;
    } else {
      console.warn('No se encontraron ciclovías en la respuesta.');
      return [];
    }
  } catch (error) {
    console.error('Error al obtener las ciclovías:', error.message);
    throw error;
  }
};
