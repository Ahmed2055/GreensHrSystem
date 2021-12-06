import jwt from 'jsonwebtoken';
import mg from 'mailgun-js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isAccountant: user.isAccountant,
      employeeName: user.employeeName,
      shorterName: user.shorterName,
      shortestName: user.shortestName,
      currentPharmacy: user.currentPharmacy,
      firstName: user.firstName,
      secondName: user.secondName,
      lastName: user.lastName,
      companyId: user.companyId,
      gender: user.gender,
      nationality: user.nationality,
      position: user.position,
      birthDate: user.birthDate,
      joiningDate: user.joiningDate,
      employmentType: user.employmentType,
      vaccinated: user.vaccinated,
      status: user.status,
      telNo: user.telNo,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '7d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};
export const isAccountant = (req, res, next) => {
  if (req.user && req.user.isAccountant) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Accountant Token' });
  }
};
export const isAccountantOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isAccountant || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin/isAccountant Token' });
  }
};

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });

