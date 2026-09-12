import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/version", async (req, res) => {
    try {
        const [githubResponse, packageResponse] = await Promise.all([
            fetch(
                "https://api.github.com/repos/B3POio/bitcoin-wallet-generator/commits/main"
            ),
            fetch(
                "https://raw.githubusercontent.com/B3POio/bitcoin-wallet-generator/main/package.json"
            )
        ]);

        if (!githubResponse.ok || !packageResponse.ok) {
            throw new Error("GitHub request failed");
        }

        const commitData = await githubResponse.json();
        const packageData = await packageResponse.json();

        res.json({
            version: packageData.version,
            commit: commitData.sha.substring(0, 7)
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Unable to retrieve version information"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
