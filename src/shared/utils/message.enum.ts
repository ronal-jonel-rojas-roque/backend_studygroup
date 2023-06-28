export enum CRUDMessages {
  Get = 'Listado',
  GetDescription = 'Datos obtenidos',
  GetSuccess = 'Datos obtenidos correctamente.',
  GetError = 'Ocurrio un error al intentar obtener los datos.',
  GetNotfound = 'No se encontrarón registros',

  Create = 'Crear',
  CreateDescription = 'Agregar Datos',
  CreateSuccess = 'Registro guardado correctamente.',
  CreateError = 'Ocurrio un error al intentar guardar el registro.',
  CreateNotfound = 'Los identificadores ya fueron registrados.',

  Delete = 'Borrar',
  DeleteDescription = 'Eliminar Datos',
  DeleteSuccess = 'Registro eliminado correctamente.',
  DeleteError = 'Ocurrio un error al intentar eliminar el registro.',
  DeleteNotfound = 'El registro no existe.',

  Update = 'Actualizar',
  UpdateDescription = 'Actualizar obtenidos',
  UpdateSuccess = 'Registro actualizado correctamente.',
  UpdateNotfound = 'El registro no existe.',
  UpdateError = 'Ocurrio un error al intentar actualizar el registro.',

  GenericException = 'Ocurrio un error.',
  //msg dto
  titleStatus = 'Estatus de la endpoint.',
  titleCount = 'Contador del registro.',
  titleMsg = 'Mensaje de  la respuesta',
  titleData = 'Datos del registro.',
}
