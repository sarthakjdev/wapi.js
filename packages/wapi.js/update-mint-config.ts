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
    const guideGroup = mintData.navigation.find(
      (item) => item.group === "Guide",
    );

    if (!apiDocGroup || !guideGroup) {
      throw new Error(
        "API Documentation or Guide group not found in mint.json",
      );
    }

    guideGroup.pages = await processDirectory(path.join(docsDir, "guide"));

    apiDocGroup.pages = await processDirectory(
      path.join(docsDir, "api-reference"),
    );

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
        group: entry.name.split("-").join(" "),
        pages: await processDirectory(fullPath),
      });
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      if (entry.name.toLowerCase() === "api-reference/readme.mdx") {
        continue;
      }
      pages.push(relativePath.replace(/\.mdx$/, ""));
    }
  }

  return pages.sort((a, b) => {
    if (typeof a === "string" && typeof b === "object") {
      return -1; // String before group
    } else if (typeof a === "object" && typeof b === "string") {
      return 1; // Group after string
    } else {
      return 0; // No change if both are the same type (shouldn't happen in this scenario)
    }
  });
}

updateMintJson();
