function getAttendanceStatus(checkIn, checkOut) {
  const lateLimit = "09:15";

  if (!checkOut) return "Incomplete";

  // Ensure we get HH:mm from the local time (WIB)
  const checkInTime = checkIn.toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5);
  if (checkInTime > lateLimit) {
    return "Late";
  }

  return "On Time";
}

module.exports = getAttendanceStatus;
