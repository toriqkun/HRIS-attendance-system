function getAttendanceStatus(checkIn, checkOut) {
  const lateLimit = "09:15";

  if (!checkOut) return "Incomplete";

  // checkIn is a Date object, let's extract time HH:mm
  const checkInTime = checkIn.toTimeString().slice(0, 5);

  if (checkInTime > lateLimit) {
    return "Late";
  }

  return "On Time";
}

module.exports = getAttendanceStatus;
