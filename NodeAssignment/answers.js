//1). Make a api for phone number login

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database_name'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// API for phone number login
app.post('/login', (req, res) => {
  const phoneNumber = req.body.phone_number;
  
  // Perform phone number validation and login logic here
  
  // Example response
  if (phoneNumber) {
    res.status(200).json({ success: true, message: 'Login successful' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid phone number' });
  }
});

// API for adding a customer
app.post('/customers', (req, res) => {
  const { name, email } = req.body;

  // Input parameter validation
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }

  // Check for duplicates
  connection.query('SELECT * FROM customers WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Error querying customers table:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (results.length > 0) {
      return res.status(409).json({ success: false, message: 'Customer with the same email already exists' });
    }

    // Insert customer into the database
    connection.query('INSERT INTO customers (name, email) VALUES (?, ?)', [name, email], (error) => {
      if (error) {
        console.error('Error inserting customer:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      // Logging
      console.log('New customer added:', name);

      return res.status(200).json({ success: true, message: 'Customer added successfully' });
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});



//2). Refer to the tables below, Write a sql query for finding the subjects for each student, the subjects should be order by alphabetically .


SELECT c.customerId, c.name AS customerName, GROUP_CONCAT(s.subjectName ORDER BY s.subjectName ASC SEPARATOR ',') AS subjects
FROM customers c
JOIN subject_student_mapping sm ON c.customerId = sm.customerId
JOIN subjects s ON sm.subjectId = s.subjectId
GROUP BY c.customerId, c.name
ORDER BY c.customerId ASC;


//3). Write a function in node that inserts the following data in mysql , the email should be unique and if the email already exists in the system then the name of the customer will be updated with the new name that is there in the array for that customer.


const mysql = require('mysql');

const customers = [
  {
    email: "anurag11@yopmail.com",
    name: "anurag"
  },
  {
    email: "sameer11@yopmail.com",
    name: "sameer"
  },
  {
    email: "ravi11@yopmail.com",
    name: "ravi"
  },
  {
    email: "akash11@yopmail.com",
    name: "akash"
  },
  {
    email: "anjali11@yopmail.com",
    name: "anjai"
  },
  {
    email: "santosh11@yopmail.com",
    name: "santosh"
  }
];

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database_name'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
    insertCustomers(customers);
  }
});

function insertCustomers(customers) {
  customers.forEach((customer) => {
    connection.query(
      'INSERT INTO customers (name, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)',
      [customer.name, customer.email],
      (error) => {
        if (error) {
          console.error('Error inserting customer:', error);
        } else {
          console.log(`Customer inserted/updated: ${customer.name} (${customer.email})`);
        }
      }
    );
  });
}


//4). Create a new object which have all the properties of object person and student

const person = {
  id: 2,
  gender: 'mail'
};

const student = {
  name: "ravi",
  email: "ravi11@yopmail.com"
};

const mergedObject = {
  ...person,
  ...student
};

console.log(mergedObject);


//5. Make a promisifed function for the function having callback below , after the function is promisified then call the function like you call a promise


const request = require('request');

function getGoogleHomePage() {
  return new Promise((resolve, reject) => {
    request('http://www.google.com', function (error, response, body) {
      if (error) {
        console.error('error:', error);
        reject(error);
      } else {
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        resolve(body);
      }
    });
  });
}

getGoogleHomePage()
  .then((result) => {
    console.log("RESULT==>", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });


  //6. Imagine you have array of integer from 1 to 100 , the numbers are randomly ordered , one number from 1 to 100 is missing , Please write the code for finding the missing number


const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69,70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]; // Array with one number missing, 

function findMissingNumber(numbers) {
  const sortedNumbers = numbers.sort((a, b) => a - b);
  for (let i = 0; i < sortedNumbers.length; i++) {
    if (sortedNumbers[i] !== i + 1) {
      return i + 1;
    }
  }
  return null;
}
const missingNumber = findMissingNumber(numbers);
console.log("Missing number:", missingNumber);

