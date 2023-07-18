"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const gethistoricalweather_1 = __importDefault(require("./routes/gethistoricalweather"));
const getweather_1 = __importDefault(require("./routes/getweather"));
const saveweather_1 = __importDefault(require("./routes/saveweather"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)({ origin: true }));
app.use(express_1.default.json());
app.use('/', getweather_1.default);
app.use('/', gethistoricalweather_1.default);
app.use('/', saveweather_1.default);
mongoose_1.default.connect(process.env.MONGO_URL).then(() => {
    console.log('MongoDB is connected.');
    app.listen(PORT, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(`Server is listening on port ${PORT}`);
        }
    });
});
//# sourceMappingURL=index.js.map