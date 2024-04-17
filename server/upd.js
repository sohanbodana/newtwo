const Flight = require('./insert'); // Assuming Flight is your Mongoose model

// Define the update operation
const updateOperation = {
  $set: {
    DepartTime: { $toDate: "$DepartTime" },
    ArrivalTime: { $toDate: "$ArrivalTime" }
  }
};

// Update all documents in the Flight collection
Flight.updateMany({}, updateOperation)
  .then(result => {
    console.log(`${result.nModified} documents updated successfully.`);
  })
  .catch(error => {
    console.error("Error updating documents:", error);
  });
