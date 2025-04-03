
// module.exports = { addPet };
const Pet = require('../database/petSchema');

// Add new pet to the database
const addPet = async (req, res) => {
    try {
        let { pid, pname, pimage, ptype, gender, age, likes, shelter_loc, v_status, t_status } = req.body;

        // Trim and validate string fields
        pid = pid.trim();
        pname = pname.trim();
        pimage = pimage.trim();
        ptype = ptype.trim();
        gender = gender.trim();
        shelter_loc = shelter_loc.trim();
        v_status = v_status.trim();
        t_status = t_status.trim();

        // Validate required fields
        if (!pid || !pname || !pimage || !ptype || !gender || !age || !shelter_loc || !v_status || !t_status) {
            return res.status(400).json({ message: "All fields except 'likes' are required" });
        }

        // Validate age and likes
        age = Number(age);
        likes = Number(likes) || 0; // Default likes to 0 if not provided

        if (isNaN(age) || age < 0) return res.status(400).json({ message: "Age must be a positive number" });
        if (isNaN(likes) || likes < 0) return res.status(400).json({ message: "Likes must be a positive number" });

        // Check if a pet with the same pid already exists
        const existingPet = await Pet.findOne({ pid });
        if (existingPet) {
            return res.status(400).json({ message: "Pet with this ID already exists" });
        }

        // Create a new pet document
        const newPet = new Pet({
            pid,
            pname,
            pimage,
            ptype,
            gender,
            age,
            likes,
            shelter_loc,
            v_status,
            t_status
        });

        // Save the pet document to the database
        await newPet.save();

        res.status(201).json({
            message: "Pet added successfully",
            pet: newPet
        });
    } catch (err) {
        console.error("Error adding pet:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find({});
        res.status(200).json(pets);
    } catch (err) {
        console.error("Error fetching pets:", err);
        res.status(500).json({ 
            message: "Error fetching pets", 
            error: err.message 
        });
    }
};
// Add this new controller method
const getPetById = async (req, res) => {
    try {
        const pet = await Pet.findOne({ pid: req.params.id });
        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }
        res.status(200).json(pet);
    } catch (err) {
        console.error("Error fetching pet:", err);
        res.status(500).json({ 
            message: "Error fetching pet", 
            error: err.message 
        });
    }
};

module.exports = { 
    addPet,
    getAllPets,
    getPetById  // Add this to your exports
};