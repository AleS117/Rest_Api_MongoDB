import { enviarCorreo } from "./email.js";

export const correoRegistro = async ({ nombre, correo, token }) => {
  const url = `http://localhost:3000/comprador/confirmar/${token}`;

  const html = `
    <p>Hola <b>${nombre}</b>,</p>
    <p>Gracias por registrarte en la Lonja.</p>
    <p>Para activar tu cuenta haz clic en el siguiente enlace:</p>
    <p>
      <a href="${url}" target="_blank">Confirmar cuenta</a>
    </p>
    <p>Si tú no solicitaste esta cuenta, ignora este mensaje.</p>
  `;

  await enviarCorreo({
    correo,
    nombre,
    asunto: "Confirma tu cuenta en la Lonja",
    html
  });
};
