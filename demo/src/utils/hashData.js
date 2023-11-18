import bcrypt from "bcrypt";

const hashData = async (data, saltRound) => {
  try {
    const hashedData = await bcrypt.hash(data, saltRound);
  } catch (error) {
    throw error;
  }
};

const verifyHashedData = async (unHashed, hashed) => {
  try {
    const match = await bcrypt.compare(unHashed, hashed);
    return match;
  } catch (error) {
    throw error;
  }
};

export { hashData, verifyHashedData}
