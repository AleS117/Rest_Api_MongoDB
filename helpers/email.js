import nodemailer from "nodemailer";

export const enviarCorreo = async ({ correo, nombre, asunto, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alexortega0054@gmail.com", 
        pass: "sacx aemf aitp hnkp", // contraseña de aplicación
      },
    });

    await transporter.sendMail({
      from: '"Sistema Lonja" <no-reply@lonja.com>',
      to: correo,
      subject: asunto,
      html: html,
    });

  } catch (error) {
    console.log("Error enviando correo:", error);
  }
};
