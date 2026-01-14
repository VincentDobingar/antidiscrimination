import bcrypt from 'bcryptjs';

const hash = '$2b$10$ufNMfYSvl1NDxS.UPmuQYOfx7pRW41xZ6Hvqht4ozZ4U/ZtTWil4q'; // mettre le hash exact
const plain = 'Vincent@2025';

bcrypt.compare(plain, hash).then(ok => console.log(ok));