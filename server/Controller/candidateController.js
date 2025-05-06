import candidate from '../Model/candidate.js';
import Employee from '../Model/employes.js';
import cloudinary from "../helper/cloudinary.js";

import fs from 'fs/promises';
import path from 'path';

export const createCandidate = async (req, res, next) => {
  try {
    const { name, email, phone, experience, position } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Resume PDF is required' });
    }

    
    const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto", 
        folder: 'resumes',    
      });
    const newCandidate = await candidate.create({
      name,
      email,
      phone,
      experience,
      position,
      resume: result.secure_url, // ✅ Just the path string
    });

    res.status(201).json(newCandidate);
  } catch (err) {
    next(err);
  }
};



export const getCandidates = async (req, res, next) => {
  try {
    const { search } = req.query;
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    const candidates = await candidate.find(query);
    res.json(candidates);
  } catch (err) {
    next(err);
  }
};
export const getCandidateById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const singleCandidate = await candidate.findById(id);
  
      if (!singleCandidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }
  
      res.json(singleCandidate);
    } catch (err) {
      next(err);
    }
  };

export const updateCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, experience, position } = req.body;

    const candidatee = await candidate.findById(id);
    if (!candidatee) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const updatedCandidate = await candidate.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        experience,
        position
      },
      { new: true }
    );

    res.json(updatedCandidate);
  } catch (err) {
    next(err);
  }
};

export const deleteCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;

    const candidatee = await candidate.findById(id);
    if (!candidatee) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

   
    await candidate.findByIdAndDelete(id);
    res.json({ message: 'Candidate deleted successfully' });
  } catch (err) {
    next(err);
  }
};
export const promoteCandidate = async (req, res, next) => {
    try {
      const candidatee = await candidate.findById(req.params.id);
  
      if (!candidatee) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
  
      // ✅ Only promote if status === "Selected"
      if (req.body.status === 'Selected') {
        const { name, email, phone, position, experience, createdAt } = candidatee;
  
        const newEmployee = new Employee({
          name,
          email,
          phone,
          position: "Intern",
          department: position, // candidate.position becomes department
          experience,
          status: "Present",
          date_of_joining: new Date(createdAt),
        });
  
        await newEmployee.save();
        await candidate.findByIdAndDelete(req.params.id);// Delete the candidate after promoting
  
        return res.status(200).json({
          message: 'Candidate promoted to employee and removed from candidates list.',
          employee: newEmployee,
        });
      }
  
      // If status is not 'Selected', update the candidate's status to the new one
      candidatee.status = req.body.status; // Update status with the new one
      await candidatee.save(); // Save the updated candidate
  
      return res.status(200).json({
        message: `Candidate status updated to ${req.body.status}`,
        candidate: candidatee,
      });
  
    } catch (err) {
      console.error('Promotion error:', err);
      next(err);
    }
  };
  

