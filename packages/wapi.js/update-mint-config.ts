import fs from "fs/promises";
import path from "path";

// Path to your documentation directory
const docsDir = "../../apps/js.wapikit.com";
const mintJsonPath = "../../apps/js.wapikit.com/mint.json";

interface MintNavGroup {
  group: string;
  pages: (string | MintNavGroup)[];
}

interface MintJson {
  navigation: MintNavGroup[];
}

async function updateMintJson() {
  try {
    // Read the existing mint.json
    const mintData: MintJson = JSON.parse(
      await fs.readFile(mintJsonPath, "utf-8"),
    );

    // Assuming "API Documentation" and "Get Started" groups are already present
    const apiDocGroup = mintData.navigation.find(
      (item) => item.group === "API Documentation",
    );
    const getStartedGroup = mintData.navigation.find(
      (item) => item.group === "Guide",
    );

    if (!apiDocGroup || !getStartedGroup) {
      throw new Error(
        "API Documentation or Guide group not found in mint.json",
      );
    }

    // Handle "Get Started" group (add "development.mdx" if it exists)
    try {
      await fs.access(path.join(docsDir, "development.mdx")); // Check if the file exists
      getStartedGroup.pages.push("development.mdx");
    } catch (err) {
      // File doesn't exist, do nothing
    }

    // Process the "api-reference" directory for "API Documentation" group
    apiDocGroup.pages = await processDirectory(
      path.join(docsDir, "api-reference"),
    );

    // Process the "essentials" directory (if it exists)
    try {
      await fs.access(path.join(docsDir, "essentials"));
      mintData.navigation.push({
        group: "Essentials",
        pages: await processDirectory(path.join(docsDir, "essentials")),
      });
    } catch (err) {
      // File doesn't exist, do nothing
    }

    // Write the updated mint.json
    await fs.writeFile(mintJsonPath, JSON.stringify(mintData, null, 2));
    console.log("mint.json navigation updated successfully!");
  } catch (error) {
    console.error("Error updating mint.json:", error);
  }
}

async function processDirectory(
  dirPath: string,
): Promise<(string | MintNavGroup)[]> {
  const pages: (string | MintNavGroup)[] = [];
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(docsDir, fullPath);

    if (entry.isDirectory()) {
      pages.push({
        group: entry.name,
        pages: await processDirectory(fullPath),
      });
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      pages.push(relativePath);
    }
  }

  return pages;
}

updateMintJson();
