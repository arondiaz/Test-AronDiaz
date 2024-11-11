import axios from "axios";

export const getUsers = async () => {
  const url =
    "https://www.4sides.com.mx/api/prueba-tecnica/usuarios/index?results=50";
  const test = "http://localhost:4044/api/usuarios";
  try {
    const response = await axios.get(test);
    if (response.status !== 200) {
      return "Respuesta no válida";
    }
    const data = response.data.usuarios;
    return data;
  } catch (error) {
    return error;
  }
};

export default getUsers;
