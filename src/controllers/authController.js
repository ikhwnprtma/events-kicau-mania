import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient } from "../database/dbConfig.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email dan password dibutuhkan" });

    const user = await prismaClient.users.findUnique({ where: { email } });
    if (!user)
      return res.status(401).json({ error: "Email atau password salah" });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch)
      return res.status(401).json({ error: "Email atau password salah" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      status: true,
      message: "berhasil",
      data: {
        token,
        user: { id: user.id, nama: user.nama, email: user.email, role: user.role },
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { login };