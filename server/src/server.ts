import { app } from "./app"

const env = process.env.NODE_ENV || 'development';

const port = (env == "test") ? 3003 : 3001
    
app.listen(port, () => console.log(`TS-Cart API Server listening on port ${port}!`))


