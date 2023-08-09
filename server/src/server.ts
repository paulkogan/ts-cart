import { app } from "./app"


const env = process.env.NODE_ENV || 'development';
if (env == "test") {
    const port = 3003
    app.listen(port, () => console.log(`TS-Cart TEST API Server listening on port ${port}!`))
} else {
    const port = 3001
    app.listen(port, () => console.log(`TS-Cart API Server listening on port ${port}!`))
}


