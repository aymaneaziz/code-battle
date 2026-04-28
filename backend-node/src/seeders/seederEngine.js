/** machi dyl tkhtach
 * Fonction 3amma bach dir seed li ay Mongoose model
 * @param {Object} Model - class dyal model f Mongoose
 * @param {Array} data - list dyal data li ghadi tdkhel
 * @param {String} uniqueKey - l key li kanst3mlo bach nchoufo wach kayn deja (bhal Id)
 */
export const seedData = async (Model, data, uniqueKey) => {
  try {
    // .map() katrj3 lina array dyal operations
    const operations = data.map((item) =>
      // findOneAndUpdate m3a 'upsert' katmna3 duplication ila t3awed trun l code
      Model.findOneAndUpdate(
        { [uniqueKey]: item[uniqueKey] }, // kan9elbo 3la element b had l ID
        item, // data li ghadi tdkhel wla t update
        { upsert: true, returnDocument: "after" }, // ila makanch kaytcrea, ila kan kaytupdate
      ),
    );

    await Promise.all(operations);

    console.log(
      `✅ ${Model.modelName} seeded successfully (${data.length} items).`,
    );
  } catch (error) {
    console.error(`❌ Error seeding ${Model.modelName}:`, error.message);
    throw error;
  }
};
