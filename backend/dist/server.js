"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const dotenv_1 = __importDefault(require("dotenv"));
const testModel_1 = __importDefault(require("./models/testModel"));
dotenv_1.default.config();
const PORT = process.env['PORT'] || 5000;
database_1.default.sync({ force: true })
    .then(async () => {
    console.log('Database synced successfully');
    await testModel_1.default.create({ name: 'Test Entry' });
    console.log('Test record created');
})
    .catch((error) => {
    console.error('Unable to sync database:', error);
});
app_1.default.listen(PORT, async () => {
    try {
        await database_1.default.authenticate();
        console.log(`Server running on port ${PORT}`);
        console.log('Database connection established successfully.');
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
});
//# sourceMappingURL=server.js.map