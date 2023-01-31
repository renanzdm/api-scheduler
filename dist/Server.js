import { App } from './App.js';
const PORT = process.env.PORT || 8000;
var application = new App();
application.configure();
application.app.listen(PORT, () => console.log(`\u{1F525}  Server is running PORT ${PORT}`));
//# sourceMappingURL=Server.js.map