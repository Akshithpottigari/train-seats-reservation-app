const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors(
  {
    origin : "http://localhost:4200"
  }
))
// Connect to MongoDB
mongoose
  .connect('mongodb://0.0.0.0:27017/seat_reservation', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Define the seat schema and model
const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
});

const Seat = mongoose.model('Seat', seatSchema);

// Define the train schema and model
const trainSchema = new mongoose.Schema({
  trainName: { type: String, required: true },
  seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }],
});

const Train = mongoose.model('Train', trainSchema);

// Function to initialize seats for a given train
const initializeSeats = async (train) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = 7;

  for (let row of rows) {
    for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
      const seatNumber = row + seatNum.toString();
      const seat = new Seat({ seatNumber });
      await seat.save();
      train.seats.push(seat._id);
    }
  }
};

// Helper function to format the response
const formatResponse = (success, data, error = null) => {
  if (success) {
    return { success: true, data };
  } else {
    return { success: false, error };
  }
};

app.get("/trains", async (req, res) => {
  try {
    res.status(200).json(formatResponse(true, await Train.find(), null));
  } catch (error) {
    res.status(500).json(formatResponse(false, null, 'Internal server error'))
  }
})

// API endpoint to create a new train
app.post('/trains', async (req, res) => {
  const { trainName } = req.body;

  try {
    const train = new Train({ trainName });
    await initializeSeats(train);
    await train.save();

    res.json(formatResponse(true, { train }, null));
  } catch (error) {
    res.status(500).json(formatResponse(false, null, 'Internal server error'));
  }
});

// API endpoint to retrieve seat availability for a specific train
app.get('/trains/:trainId/seats', async (req, res) => {
  const { trainId } = req.params;

  try {
    const train = await Train.findById(trainId).populate('seats');

    if (!train) {
      return res.status(404).json(formatResponse(false, null, 'Train not found'));
    }

    res.json(formatResponse(true, train, null));
  } catch (error) {
    res.status(500).json(formatResponse(false, null, 'Internal server error'));
  }
});

// API endpoint to reserve seats for a specific train
app.post('/trains/:trainId/seats/reserve', async (req, res) => {
  const { trainId } = req.params;
  const { numSeats } = req.body;

  if (numSeats > 7) {
    return res.status(400).json(formatResponse(false, null, 'Cannot book more than 7 seats at a time'));
  }

  try {
    const train = await Train.findById(trainId).populate('seats');

    if (!train) {
      return res.status(404).json(formatResponse(false, null, 'Train not found'));
    }

    // Find available seats
    const availableSeats = train.seats.filter((seat) => seat.isAvailable).slice(0, numSeats);

    if (availableSeats.length < numSeats) {
      return res.status(400).json(formatResponse(false, null, 'Insufficient available seats'));
    }

    // Update seat availability status
    const seatIds = availableSeats.map((seat) => seat._id);
    await Seat.updateMany({ _id: { $in: seatIds } }, { isAvailable: false });

    res.json(formatResponse(true, { seats: availableSeats }, null));
  } catch (error) {
    res.status(500).json(formatResponse(false, null, 'Internal server error'));
  }
});


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
