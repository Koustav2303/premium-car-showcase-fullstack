const Booking = require('../models/Booking');
const User = require('../models/User');

// @desc    Create new test drive booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { modelName, dealership, bookingDate } = req.body;

    // 1. Create the booking entry in the Bookings collection 
    const booking = await Booking.create({
      userId: req.user._id, // Set by authMiddleware [cite: 146]
      modelName: modelName || 'AeroGT',
      dealership,
      bookingDate
    });

    // 2. Link the booking to the User profile using a direct update
    // We use findByIdAndUpdate with { runValidators: false } to bypass 
    // the 'name is required' validation error during this specific sub-update.
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { bookings: booking._id } },
      { runValidators: false }
    );

    res.status(201).json({
      message: 'Test drive scheduled successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    // Fetch all bookings associated with the logged-in user [cite: 146]
    const bookings = await Booking.find({ userId: req.user._id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  createBooking, 
  getMyBookings 
};