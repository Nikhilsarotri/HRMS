import Attendance from "../Model/attendence.js";
import Employee from "../Model/employes.js";

export const markAttendance = async (req, res, next) => {
  try {
    const { employeeId, date, status, task } = req.body;
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const newAttendance = await Attendance.create({ 
      employeeId, 
      date, 
      status,
      task: task || 'Working on Frontend'
    });
    res.status(201).json(newAttendance);
  } catch (err) {
    next(err);
  }
};

export const getAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.find()
      .select('employeeId date status task createdAt updatedAt')
      .populate('employeeId', 'name email phone position department experience');
    res.json(attendance);
  } catch (err) {
    next(err);
  }
};

export const getAttendanceById = async (req, res, next) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .select('employeeId date status task createdAt updatedAt')
      .populate('employeeId', 'name email phone position department experience');
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.json(attendance);
  } catch (err) {
    next(err);
  }
};

export const updateAttendance = async (req, res, next) => {
  try {
    const { status, task } = req.body;
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id, 
      { 
        status,
        task: task || 'Working on HR_Dashboard'
      },
      { new: true }
    ).populate('employeeId');

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.json(attendance);
  } catch (err) {
    next(err);
  }
};

export const deleteAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.json({ message: 'Attendance record deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const getAttendanceByEmployee = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const attendance = await Attendance.find({ employeeId })
      .select('employeeId date status task createdAt updatedAt')
      .populate('employeeId', 'name email phone position department experience');
    res.json(attendance);
  } catch (err) {
    next(err);
  }
};
