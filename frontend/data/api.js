import axios from "axios";

export const getUsers = async () => {
  const url =
    "https://www.4sides.com.mx/api/prueba-tecnica/usuarios/index?results=50";
  const test = "http://localhost:4040/api/usuarios";

  const response = await axios.get(test);

  const data = response.data.usuarios;
  return data;
};

export default getUsers;
