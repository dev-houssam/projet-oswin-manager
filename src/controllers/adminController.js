const {
    getAllUsers,
    getAllApps,
    getAllLogs,
    getAllUserApps,
    getAllOpenWindows,
    getUserDataStructure,
    deleteUser,
  } = require('../models/adminModel');
  
  exports.viewUsers = async (req, res) => {
      try {
          const users = await getAllUsers();
          res.status(200).json(users);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  };
  
  exports.viewApps = async (req, res) => {
      try {
          const apps = await getAllApps();
          res.status(200).json(apps);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  };
  
  exports.viewLogs = async (req, res) => {
      try {
          const logs = await getAllLogs();
          res.status(200).json(logs);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  };
  
  exports.viewUserApps = async (req, res) => {
      try {
          const userApps = await getAllUserApps();
          res.status(200).json(userApps);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  };
  
  exports.viewOpenWindows = async (req, res) => {
      try {
          const openWindows = await getAllOpenWindows();
          res.status(200).json(openWindows);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  };
  
  exports.viewUserDataStructure = async (req, res) => {
      try {
          const structure = await getUserDataStructure();
          res.status(200).json(structure);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  };
  
  exports.removeUser = async (req, res) => {
      const { id } = req.body;
      console.log("ok");
      try {
        console.log("c'est : "+ id);
          const deletedUser = await deleteUser(id);
          res.status(200).json({ message: 'Utilisateur supprimé avec succès.', user: deletedUser });
      } catch (error) {
        console.error(error.message);
          res.status(500).json({ error: error.message });
      }
  };
  