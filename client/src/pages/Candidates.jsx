// ✅ Final Candidates.jsx – Figma Matching Design
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Candidate.css"
import { Base_Url } from '../../../server/constants';
import Searchbar from '../Components/Searchbar';
import { toast } from "react-toastify";



const Candidates = () => {
  const [showModal, setShowModal] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    status: 'New',
  });
  const [resume, setResume] = useState(null);

  const [agree, setAgree] = useState(false);
  const [menuIndex, setMenuIndex] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState("");
  const [token, setToken] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
   
    fetchCandidates()
  }, [])



  const fetchCandidates = async () => {
    try {
      const response = await axios.get(` ${Base_Url}/candidates/`, {  withCredentials: true
       
      });
      setCandidates(response.data);
      console.log("Fetched Candidates:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching candidates:", error.response?.data?.message || error.message);
    }
  };


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setResume(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!agree) return;

    if (!resume) {
      setError("Resume file is required!");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("position", formData.position);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("dateOfJoining", formData.dateOfJoining);
    formDataToSend.append("resume", resume);

    try {
      const response = await axios.post(
       `${Base_Url}/candidates/`,
        formDataToSend,
        {  withCredentials: true,
          headers: {
            
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.status == 201) {
        toast.success("Candidate added successfully!");
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          resume: null,
          status: 'New',
        });
        setAgree(false);
        setShowModal(false);
        fetchCandidates();
      }

    } catch (err) {
      setError(err?.message || "Candidate failed");
    }

  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(` ${Base_Url}/candidates/${id}`, {  withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Candidate deleted successfully!");
        fetchCandidates()
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
      toast.error("Failed to delete candidate.");
    }
  };

  const fetchCandidateById = async (id) => {
    try {
      const response = await axios.get(`${Base_Url}/candidates/${id}`, { withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      setFormData({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        position: response.data.position,
        experience: response.data.experience,
        status: response.data.status,
      });
  
      setSelectedCandidate(id); // Mark as edit
      setShowModal(true);       // Now open modal as edit
      setMenuIndex(null);       // Close the menu
    } catch (error) {
      console.error("Error fetching candidate by ID:", error);
    }
  };
  

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(` ${Base_Url}/candidates/${selectedCandidate}`, formData, {  withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Candidate updated successfully!");
        setShowModal(false);
        setSelectedCandidate(null);
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          status: 'New',
        });
        fetchCandidates();
      }
    } catch (error) {
      console.error("Error updating candidate:", error);
      toast.error("Failed to update candidate.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const payload = {
      status: newStatus
    }
    try {
      const response = await axios.post(` ${Base_Url}/candidates/promote/${id}`, payload, {  withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          
        },
      });

      if (response.status === 200) {
        setCandidates(prevCandidates => 
          prevCandidates.map(candidate => 
            candidate._id === id ? { ...candidate, status: newStatus } : candidate
          )
        );
        toast.success(response.data.message || "Status updated successfully");
        fetchCandidates();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
      fetchCandidates();
    }
  };

  const handlePositionChange = async (id, newPosition) => {
    const payload = {
      position: newPosition
    }
    try {
      const response = await axios.put(`${Base_Url}candidates/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setCandidates(prevCandidates => 
          prevCandidates.map(candidate => 
            candidate._id === id ? { ...candidate, position: newPosition } : candidate
          )
        );
        toast.success(response.data.message || "Position updated successfully");
      }
    } catch (error) {
      console.error("Error updating position:", error);
      toast.error("Failed to update position.");
      fetchCandidates();
    }
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchesStatus = filterStatus ? c?.status === filterStatus : true;
    const matchesPosition = filterPosition ? c.position === filterPosition : true;
    const matchesSearch = search
      ? c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesStatus && matchesPosition && matchesSearch;
  });

  console.log(filteredCandidates)


  return (
    <div className="candidates-page">
      <div className="candidates-top-bar">
        <div className="filters">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">Status</option>
            <option value="New">New</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)}>
            <option value="">Position</option>
            {[...new Set(candidates.map((c) => c.position))].map((pos, idx) => (
              <option key={idx} value={pos}>{pos}</option>
            ))}
          </select>
          
        </div>
        <div className='search_add'>
        <div className='filters'> <input
    
    type="text"
    placeholder="Search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  /></div>
       
        <button onClick={() => setShowModal(true)} className="add-btn">Add Candidate</button>
      </div>
      </div>
      <div className="table-wrapper">
        <div className="table-scroll">
          <table className="candidates-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Candidates Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Position</th>
                <th>Status</th>
                <th>Experience</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates?.map((c, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.position}</td>
                  <td>
                    <select
                      value={c?.status}
                      onChange={(e) => handleStatusChange(c._id, e.target.value)}
                      className={`status-dropdown status-${c?.status?.toLowerCase()}`}
                    >
                      <option>New</option>
                      <option>Shortlisted</option>
                      <option>Interviewing</option>
                      <option>Selected</option>
                      <option>Rejected</option>
                    </select>
                  </td>
                  <td>{c.experience}</td>
                  <td className="action-cell">
                    <div
                      className="dots"
                      onClick={() => setMenuIndex(menuIndex === c._id ? null : c._id)}
                    >
                      ⋮
                    </div>
{console.log(c.resume,"here is url")}
                    {menuIndex === c._id && (
                      <div className="dropdown-menu">
                        <div className="dropdown-item">
                          <a
                            href={c?.resume}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download Resume
                          </a>
                        </div>
                        <div className="dropdown-item" onClick={() => fetchCandidateById(c._id)}>Edit</div>
                        <div className="dropdown-item" onClick={() => handleDelete(c._id)}>Delete Candidate</div>
                      </div>
                    )}
                  </td>


                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{selectedCandidate ? 'Edit Candidate' : 'Add New Candidate'}</h2>
              <span className="close-btn" onClick={() => {
                setShowModal(false);
                setSelectedCandidate(null);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  position: '',
                  experience: '',
                  status: 'New',
                });
              }}>&times;</span>
            </div>
            <form onSubmit={selectedCandidate ? handleEdit : handleSubmit} className="modal-form">
              <div className="modal-row">
                <div className="form-group candidate-form">
                  <label>Full Name <span>*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group candidate-form">
                  <label>Email Address <span>*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="modal-row">
                <div className="form-group candidate-form">
                  <label>Phone Number <span>*</span></label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group candidate-form">
                  <label>Position <span>*</span></label>
                  <input type="text" name="position" value={formData.position} onChange={handleChange} required />
                </div>
              </div>
              <div className="modal-row">
                <div className="form-group candidate-form">
                  <label>Experience <span>*</span></label>
                  <input type="text" name="experience" value={formData.experience} onChange={handleChange} required />
                </div>
                {!selectedCandidate && (
                  <div className="form-group candidate-form">
                    <label>Resume <span>*</span></label>
                    <input
                      type="file"
                      name="resume"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      className="custom-file"
                      onChange={handleChange}
                      required={!selectedCandidate}
                    />
                  </div>
                )}
              </div>
              {!selectedCandidate && (
                <label className="checkbox">
                  <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} />
                  I hereby declare that the above information is true to the best of my knowledge and belief
                </label>
              )}
              {error && <div className="error-message">{error}</div>}

              <div className="form-footer">
                <button 
                  type="submit" 
                  className="submit-btn" 
                  disabled={!selectedCandidate && !agree}
                >
                  {selectedCandidate ? 'Update Candidate' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
