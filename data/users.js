const users = [
  {
    firstName: "Monika",
    lastName: "Shah",
    email: "monikashah@gmail.com",
    password: "Monika@123Shah",
    address: [
      {
        _id: uuid(),
        name: "Monika Shah",
        street: "5, IndiraNagar",
        city: "Pune",
        state: "Maharashtra",
        zipcode: "411005",
        country: "India",
        mobile: "3524652340",
      },
    ],
  },
];

module.exports = users;
