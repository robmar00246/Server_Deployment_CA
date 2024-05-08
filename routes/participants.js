var express = require('express');
const { save } = require("../save_json");
const authenticateAdmin  = require('../middleware/authenticateAdmin');
const participantsData = require('../participants.json');

var router = express.Router();

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidDateFormat = (date) => {

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return false;
  }

  const [year, month, day] = date.split('-').map(Number);
  if (month < 1 || month > 12) {
    return false;
  }
  if (day < 1 || day > 31) {
    return false;
  }

  return true;
};

router.get('/', authenticateAdmin, function(req, res, next) {
  res.json(participantsData)
});

router.get('/details', authenticateAdmin, function(req, res, next) {
  const details = participantsData.participants.map(participant => ({
    firstname: participant.Participant.firstname,
    lastname: participant.Participant.lastname,
    email: participant.Participant.email
  }));

  res.json(details);
});

router.get('/details/:email', authenticateAdmin, function(req, res, next) {
  const email = req.params.email;

  const participant = participantsData.participants.find(participant => participant.Participant.email === email);

  if (participant) {
    const details = {
      firstname: participant.Participant.firstname,
      lastname: participant.Participant.lastname,
      email: participant.Participant.email
    };
    res.json(details);
  } else {
    res.status(404).json({ error: 'Participant not found' });
  }
});

router.get('/work/:email', authenticateAdmin, function(req, res, next) {
  const email = req.params.email;

  const participant = participantsData.participants.find(participant => participant.Participant.email === email);

  if (participant) {
    const workDetails = {
      companyName: participant.Work.companyname,
      salary: participant.Work.salary,
      currency: participant.Work.currency
    };
    res.json(workDetails);
  } else {
    res.status(404).json({ error: 'Participant not found' });
  }
});

router.get('/home/:email', authenticateAdmin, function(req, res, next) {
  const email = req.params.email;

  const participant = participantsData.participants.find(participant => participant.Participant.email === email);

  if (participant) {
    const homeDetails = {
      country: participant.Home.country,
      city: participant.Home.city
    };
    res.json(homeDetails);
  } else {
    res.status(404).json({ error: 'Participant not found' });
  }
});

router.post('/add', authenticateAdmin, function(req, res, next) {

  const { email, firstname, lastname, dob, companyname, salary, currency, country, city } = req.body;

  if (!email || !firstname || !lastname || !dob || !companyname || !salary || !currency || !country || !city) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!isValidDateFormat(dob)) {
    return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
  }

  const newParticipant = {
    Participant: {
      email,
      firstname,
      lastname,
      dob
    },
    Work: {
      companyname,
      salary,
      currency
    },
    Home: {
      country,
      city
    }
  };

  participantsData.participants.push(newParticipant);

  save(participantsData);

  res.status(201).json({ message: 'Participant added successfully', participant: newParticipant });
});

router.put('/:email', authenticateAdmin, function(req, res, next) {
  const email = req.params.email;

  const { firstname, lastname, dob, companyname, salary, currency, country, city } = req.body;

  const participantIndex = participantsData.participants.findIndex(participant => participant.Participant.email === email);

  if (participantIndex === -1) {
    return res.status(404).json({ error: 'Participant not found' });
  }

  if (req.body.email && !isValidEmail(req.body.email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (req.body.dob && !isValidDateFormat(req.body.dob)) {
    return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
  }

  if (firstname) {
    participantsData.participants[participantIndex].Participant.firstname = firstname;
  }
  if (lastname) {
    participantsData.participants[participantIndex].Participant.lastname = lastname;
  }
  if (dob) {
    participantsData.participants[participantIndex].Participant.dob = dob;
  }
  if (companyname) {
    participantsData.participants[participantIndex].Work.companyname = companyname;
  }
  if (salary) {
    participantsData.participants[participantIndex].Work.salary = salary;
  }
  if (currency) {
    participantsData.participants[participantIndex].Work.currency = currency;
  }
  if (country) {
    participantsData.participants[participantIndex].Home.country = country;
  }
  if (city) {
    participantsData.participants[participantIndex].Home.city = city;
  }

  save(participantsData);

  res.json({ message: 'Participant updated successfully' });
});

router.delete('/:email', authenticateAdmin, function(req, res, next) {
  const email = req.params.email;

  const participantIndex = participantsData.participants.findIndex(participant => participant.Participant.email === email);

  if (participantIndex === -1) {
    return res.status(404).json({ error: 'Participant not found' });
  }

  participantsData.participants.splice(participantIndex, 1);

  save(participantsData);

  res.json({ message: 'Participant deleted successfully' });
});


module.exports = router;